import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/catalogue";
import { Product } from "@/types";

export function generateUniqueSku(slug: string, id: string, size: string): string {
  const clean = (slug || "perf").replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase();
  const idPart = (id || "0000").replace(/[^a-zA-Z0-9]/g, "").slice(-4).toUpperCase();
  const sizeClean = (size || "50").replace(/[^a-zA-Z0-9]/g, "");
  return `LEV-${clean}-${idPart}-${sizeClean}`;
}

function productToRow(p: Product) {
  const extra = {
    frenchName: p.frenchName || p.name,
    collection: p.collection,
    collectionSlug: p.collectionSlug,
    topNotes: p.topNotes || [],
    heartNotes: p.heartNotes || [],
    baseNotes: p.baseNotes || [],
    occasions: p.occasions || [],
    gender: p.gender || "Unisexe",
    waveExpression: p.waveExpression || "signature",
    wavePalette: p.wavePalette || "gold",
    sensoryText: p.sensoryProfile || "",
    packagingImage: p.images?.packaging || p.images?.main,
    galleryImages: p.images?.gallery || [],
    lifestyleImage: p.images?.lifestyle,
    bottleOnlyImage: p.images?.bottleOnly,
    atmosphere: p.atmosphere || "LUXE",
    videoUrl: p.videoUrl || p.videoConfig?.videoUrl || "",
    videoConfig: p.videoConfig || {
      videoUrl: p.videoUrl || "",
      useCategoryDefault: !p.videoUrl,
      overlayDarkness: 0.55,
      opacity: 1,
      displayMode: "cover",
      positioning: "center",
    },
    formats: p.formats || [],
  };

  return {
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle || "",
    fragrance_family: p.fragranceFamily || "Amber",
    intensity: p.intensity || "Intense",
    description: p.description || "",
    sensory_profile: JSON.stringify(extra),
    main_image: p.images?.main || "/brand/bottle-and-cylinder.jpg",
    packaging_image: p.images?.packaging || extra.packagingImage || null,
    is_featured: !!p.isFeatured,
    is_bestseller: !!p.isBestseller,
    bestseller_rank: p.bestsellerRank || null,
    qr_eligible: p.qrEligible !== false,
    rating: p.rating || 5.0,
    review_count: p.reviewCount || 0,
  };
}

export function rowToProduct(row: any, variants: any[] = []): Product {
  let extra: any = {};
  try {
    if (row.sensory_profile && row.sensory_profile.startsWith("{")) {
      extra = JSON.parse(row.sensory_profile);
    }
  } catch {
    // ignore
  }

  // 1. Prioritize variants table, always sorted 50ml then 100ml
  let formats: any[] | null = null;
  if (variants && variants.length > 0) {
    formats = [...variants]
      .sort((a, b) => (a.size === "50ml" ? -1 : b.size === "50ml" ? 1 : 0))
      .map((v) => ({
        size: v.size as "50ml" | "100ml",
        priceTND: v.price_millimes / 1000,
        priceMillimes: v.price_millimes,
        stock: v.stock_quantity,
        sku: v.sku,
      }));
  }

  // 2. Fallback to extra.formats from sensory_profile
  if ((!formats || formats.length === 0) && extra.formats && Array.isArray(extra.formats) && extra.formats.length > 0) {
    formats = extra.formats;
  }

  // 3. Fallback to default
  if (!formats || formats.length === 0) {
    formats = [
      {
        size: "50ml" as const,
        priceTND: 195,
        priceMillimes: 195000,
        stock: 40,
        sku: generateUniqueSku(row.slug, row.id, "50"),
      },
      {
        size: "100ml" as const,
        priceTND: 295,
        priceMillimes: 295000,
        stock: 25,
        sku: generateUniqueSku(row.slug, row.id, "100"),
      },
    ];
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    subtitle: row.subtitle || "",
    frenchName: extra.frenchName || row.name,
    collection: extra.collection || "La Collection Signature",
    collectionSlug: extra.collectionSlug || "signature",
    fragranceFamily: row.fragrance_family,
    intensity: row.intensity,
    topNotes: extra.topNotes || [],
    heartNotes: extra.heartNotes || [],
    baseNotes: extra.baseNotes || [],
    occasions: extra.occasions || [],
    description: row.description || "",
    sensoryProfile: extra.sensoryText || row.sensory_profile || "",
    images: {
      main: row.main_image || "/brand/bottle-and-cylinder.jpg",
      packaging: row.packaging_image || extra.packagingImage || "/brand/cylinders-dual.jpg",
      lifestyle: extra.lifestyleImage || row.main_image,
      bottleOnly: extra.bottleOnlyImage || row.main_image,
      gallery: Array.isArray(extra.galleryImages) ? extra.galleryImages : [],
    },
    formats,
    atmosphere:
      extra.atmosphere ||
      (row.fragrance_family === "Woody" || row.fragrance_family === "Spicy"
        ? "SAUVAGE"
        : row.fragrance_family === "Floral"
        ? "FÉMININE & SEXY"
        : row.fragrance_family === "Citrus" || row.fragrance_family === "Fresh"
        ? "CLASS"
        : "LUXE"),
    videoUrl: extra.videoUrl || row.video_url || "",
    videoConfig: extra.videoConfig || {
      videoUrl: extra.videoUrl || row.video_url || "",
      useCategoryDefault: !extra.videoUrl,
      overlayDarkness: 0.55,
      opacity: 1,
      displayMode: "cover",
      positioning: "center",
    },
    gender: extra.gender || "Unisexe",
    waveExpression: extra.waveExpression || "signature",
    wavePalette: extra.wavePalette || "gold",
    isFeatured: !!row.is_featured,
    isBestseller: !!row.is_bestseller,
    bestsellerRank: row.bestseller_rank || undefined,
    rating: Number(row.rating) || 5.0,
    reviewCount: row.review_count || 0,
    qrEligible: row.qr_eligible !== false,
    createdAt: row.created_at,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (isSupabaseConfigured()) {
      // 1. Fetch from Supabase
      if (slug) {
        const { data: row, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) {
          console.error("Supabase single product error:", error);
        }

        if (row) {
          const { data: variants } = await supabase
            .from("product_variants")
            .select("*")
            .eq("product_id", row.id);

          const res = NextResponse.json({
            product: rowToProduct(row, variants || []),
          });
          res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
          return res;
        }

        return NextResponse.json({ product: null }, { status: 404 });
      }

      // List all products
      const { data: rows, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase products fetch error:", error);
      } else if (rows) {
        const { data: allVariants } = await supabase
          .from("product_variants")
          .select("*");

        const products = rows.map((r) => {
          const vars = (allVariants || []).filter((v) => v.product_id === r.id);
          return rowToProduct(r, vars);
        });

        const res = NextResponse.json({ products, source: "database" });
        res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        return res;
      }
    }

    // Fallback: in-memory / static
    if (slug) {
      const found = PRODUCTS.find((p) => p.slug === slug);
      if (found) return NextResponse.json({ product: found });
      return NextResponse.json({ product: null }, { status: 404 });
    }

    return NextResponse.json({ products: PRODUCTS, source: "static" });
  } catch (err: any) {
    console.error("GET /api/products error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isReset = searchParams.get("reset") === "true";
    const isSync = searchParams.get("sync") === "true";
    const body = await req.json().catch(() => ({}));

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        warning: "Supabase not configured, local storage will be used",
        received: body,
      });
    }

    // RESET: delete all and insert original 10 PRODUCTS
    if (isReset) {
      await supabase.from("product_variants").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");

      for (const p of PRODUCTS) {
        const row = productToRow(p);
        const { data: inserted } = await supabase
          .from("products")
          .insert([row])
          .select()
          .single();

        if (inserted && p.formats) {
          const varRows = p.formats.map((f) => ({
            product_id: inserted.id,
            size: f.size,
            price_millimes: f.priceMillimes,
            stock_quantity: f.stock,
            sku: f.sku || `LEV-${inserted.slug.slice(0, 4).toUpperCase()}-${f.size}`,
          }));
          await supabase.from("product_variants").insert(varRows);
        }
      }

      return NextResponse.json({ success: true, count: PRODUCTS.length });
    }

    // SYNC: replace entire catalogue with provided products array
    if (isSync && Array.isArray(body.products)) {
      await supabase.from("product_variants").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");

      for (const p of body.products) {
        const row = productToRow(p);
        const { data: inserted } = await supabase
          .from("products")
          .insert([row])
          .select()
          .single();

        if (inserted && p.formats) {
          const varRows = p.formats.map((f: any) => ({
            product_id: inserted.id,
            size: f.size,
            price_millimes: f.priceMillimes || f.priceTND * 1000,
            stock_quantity: f.stock,
            sku: f.sku || `LEV-${inserted.slug.slice(0, 4).toUpperCase()}-${f.size}`,
          }));
          await supabase.from("product_variants").insert(varRows);
        }
      }

      return NextResponse.json({ success: true, count: body.products.length });
    }

    // SINGLE PRODUCT UPSERT
    const product: Product = body.product || body;
    if (!product || !product.slug || !product.name) {
      return NextResponse.json(
        { error: "Product payload missing slug or name" },
        { status: 400 }
      );
    }

    const row = productToRow(product);

    // Look for existing product by ID first (if valid UUID), then by slug
    let existing: { id: string; slug?: string } | null = null;
    if (product.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(product.id)) {
      const { data: byId } = await supabase
        .from("products")
        .select("id, slug")
        .eq("id", product.id)
        .maybeSingle();
      if (byId) existing = byId;
    }
    if (!existing && product.slug) {
      const { data: bySlug } = await supabase
        .from("products")
        .select("id, slug")
        .eq("slug", product.slug)
        .maybeSingle();
      if (bySlug) existing = bySlug;
    }

    let productId = existing?.id;

    if (existing) {
      const { data: updatedRow, error: updErr } = await supabase
        .from("products")
        .update(row)
        .eq("id", existing.id)
        .select()
        .single();

      if (updErr) {
        console.error("Supabase update error:", updErr);
        throw updErr;
      }
      productId = updatedRow?.id || existing.id;

      // Clean variants and reinsert
      await supabase.from("product_variants").delete().eq("product_id", existing.id);
    } else {
      const { data: inserted, error: insErr } = await supabase
        .from("products")
        .insert([row])
        .select()
        .single();

      if (insErr) {
        console.error("Insert product error:", insErr);
        throw insErr;
      }
      productId = inserted.id;
    }

    if (productId && product.formats) {
      const varRows = product.formats.map((f: any) => ({
        product_id: productId,
        size: f.size,
        price_millimes: f.priceMillimes || Math.round((Number(f.priceTND) || 195) * 1000),
        stock_quantity: f.stock ?? 0,
        sku: generateUniqueSku(product.slug, productId, f.size),
      }));
      const { error: insVarErr } = await supabase.from("product_variants").insert(varRows);
      if (insVarErr) {
        console.error("Variants insert error:", insVarErr);
      }
    }

    const returnedProduct: Product = {
      ...product,
      id: productId || product.id || `lev-${Date.now()}`,
    };

    return NextResponse.json({
      success: true,
      productId,
      slug: product.slug,
      product: returnedProduct,
    });
  } catch (err: any) {
    console.error("POST /api/products error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");
    const all = searchParams.get("all") === "true";

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ success: true, note: "Supabase not configured" });
    }

    if (all) {
      await supabase.from("product_variants").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      await supabase.from("products").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      return NextResponse.json({ success: true, cleared: true });
    }

    const isUuid = (val: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

    let targetRowId: string | null = null;
    let targetSlug: string | null = slug || null;

    if (id && isUuid(id)) {
      targetRowId = id;
    } else if (id && !isUuid(id)) {
      // id might be a slug or custom string like 'lev-123'
      const { data: row } = await supabase
        .from("products")
        .select("id, slug")
        .eq("slug", id)
        .maybeSingle();
      if (row) {
        targetRowId = row.id;
        targetSlug = row.slug;
      }
    }

    if (!targetRowId && slug) {
      const { data: row } = await supabase
        .from("products")
        .select("id, slug")
        .eq("slug", slug)
        .maybeSingle();
      if (row) {
        targetRowId = row.id;
        targetSlug = row.slug;
      }
    }

    if (targetRowId) {
      await supabase.from("product_variants").delete().eq("product_id", targetRowId);
      await supabase.from("products").delete().eq("id", targetRowId);
      return NextResponse.json({ success: true, deletedId: targetRowId, slug: targetSlug });
    }

    // If no row found by id/slug, return success false or not found
    return NextResponse.json({ success: true, message: "No matching record to delete" });
  } catch (err: any) {
    console.error("DELETE /api/products error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

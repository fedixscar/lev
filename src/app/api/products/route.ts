import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/catalogue";
import { Product } from "@/types";

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
    packaging_image: p.images?.packaging || null,
    is_featured: !!p.isFeatured,
    is_bestseller: !!p.isBestseller,
    bestseller_rank: p.bestsellerRank || null,
    qr_eligible: p.qrEligible !== false,
    rating: p.rating || 5.0,
    review_count: p.reviewCount || 0,
  };
}

function rowToProduct(row: any, variants: any[] = []): Product {
  let extra: any = {};
  try {
    if (row.sensory_profile && row.sensory_profile.startsWith("{")) {
      extra = JSON.parse(row.sensory_profile);
    }
  } catch {
    // ignore
  }

  const formats =
    variants && variants.length > 0
      ? variants.map((v) => ({
          size: v.size as "50ml" | "100ml",
          priceTND: v.price_millimes / 1000,
          priceMillimes: v.price_millimes,
          stock: v.stock_quantity,
          sku: v.sku,
        }))
      : [
          {
            size: "50ml" as const,
            priceTND: 195,
            priceMillimes: 195000,
            stock: 40,
            sku: `LEV-${row.slug}-50`,
          },
          {
            size: "100ml" as const,
            priceTND: 295,
            priceMillimes: 295000,
            stock: 25,
            sku: `LEV-${row.slug}-100`,
          },
        ];

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
      main: row.main_image,
      packaging: row.packaging_image || extra.packagingImage || row.main_image,
      lifestyle: row.main_image,
      bottleOnly: row.main_image,
    },
    formats,
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

          return NextResponse.json({
            product: rowToProduct(row, variants || []),
          });
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

        return NextResponse.json({ products, source: "database" });
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

    // Check if exists by slug
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", product.slug)
      .maybeSingle();

    let productId = existing?.id;

    if (existing) {
      await supabase.from("products").update(row).eq("id", existing.id);
      // Clean variants
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
      const varRows = product.formats.map((f) => ({
        product_id: productId,
        size: f.size,
        price_millimes: f.priceMillimes || f.priceTND * 1000,
        stock_quantity: f.stock,
        sku: f.sku || `LEV-${product.slug.slice(0, 4).toUpperCase()}-${f.size}`,
      }));
      await supabase.from("product_variants").insert(varRows);
    }

    return NextResponse.json({ success: true, productId, slug: product.slug });
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

    if (id) {
      await supabase.from("product_variants").delete().eq("product_id", id);
      await supabase.from("products").delete().eq("id", id);
      return NextResponse.json({ success: true, deletedId: id });
    }

    if (slug) {
      const { data: row } = await supabase
        .from("products")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (row) {
        await supabase.from("product_variants").delete().eq("product_id", row.id);
        await supabase.from("products").delete().eq("id", row.id);
      }
      return NextResponse.json({ success: true, deletedSlug: slug });
    }

    return NextResponse.json({ error: "Missing id or slug" }, { status: 400 });
  } catch (err: any) {
    console.error("DELETE /api/products error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

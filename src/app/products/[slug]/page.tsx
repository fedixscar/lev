import { PRODUCTS } from "@/lib/catalogue";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const targetSlug = resolvedParams.slug;
  const fallbackProduct = PRODUCTS.find((p) => p.slug === targetSlug);

  return <ProductDetailClient initialProduct={fallbackProduct} slug={targetSlug} />;
}

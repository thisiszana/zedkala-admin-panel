import ProductsPage from "@/components/pages/products/ProductsPage";

export const dynamic = "force-dynamic";

export default function Products({ searchParams }) {
  return <ProductsPage searchParams={searchParams} />;
}

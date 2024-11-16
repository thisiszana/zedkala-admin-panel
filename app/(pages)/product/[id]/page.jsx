import ProductDetailsPage from "@/components/pages/product/ProductDetailsPage";

export default function ProductDetails({ params }) {
  return <ProductDetailsPage id={params.id} />;
}

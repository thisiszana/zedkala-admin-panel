import { getProduct } from "@/actions/product.action";
import { notFound } from "next/navigation";
import Product from "./ui/Product";

export default async function ProductDetailsPage({ id }) {
  const data = await getProduct(id);

  if (!data.product) return notFound();
  return <Product product={data.product} />;
}

import AddProductPage from "@/components/pages/add-product/AddProductPage";
import { ZedkalaProducts } from "@/models/zedkalaProducts";
import connectDB from "@/utils/connectDB";

export default async function EditProduct({ params: { id } }) {
  const product = await ZedkalaProducts.findById(id);
  if (!product) return <h3>Product not found</h3>;

  return <AddProductPage data={JSON.parse(JSON.stringify(product))} />;
}

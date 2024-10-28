import ProductsPagination from "./ProductsPagination";
import { getProducts } from "@/actions/product.action";
import ProductsList from "./ProductsList";

export default async function ProductsOverview({searchParams}) {
  const products = await getProducts(searchParams);
console.log(products.products)
  // if (products.code !== 200) {
  //   return <p>Error!</p>;
  // }
  return (
    <>
      <ProductsList products={JSON.parse(JSON.stringify(products))} />
      <ProductsPagination />
    </>
  );
}

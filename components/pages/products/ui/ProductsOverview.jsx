import ProductsPagination from "./ProductsPagination";
import { getProducts } from "@/actions/product.action";
import ProductsList from "./ProductsList";

export default async function ProductsOverview({ searchParams }) {
  const products = await getProducts(searchParams);

  return (
    <>
      <ProductsList products={JSON.parse(JSON.stringify(products))} />
      <ProductsPagination
        totalProducts={products.totalProducts}
        totalProductsWithoutFilter={products.totalProductsWithoutFilter}
        totalPages={products.totalPages}
        searchParams={searchParams}
      />
    </>
  );
}

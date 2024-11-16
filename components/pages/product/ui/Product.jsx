import ActiveTab from "./ActiveTab";
import ProductAction from "./ProductAction";
import ProductInformation from "./ProductInformation";

export default function Product({ product }) {
  return (
    <div className="flex flex-col gap-box">
      <ProductAction id={product?.id} />
      <ProductInformation info={product} />
      <ActiveTab />
    </div>
  );
}

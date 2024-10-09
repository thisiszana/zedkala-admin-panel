import CategoryInformation from "./CategoryInformation";
import CategoryAction from "./CategoryAction";

export default function Category({ category }) {
  return (
    <div className="flex flex-col gap-box">
      <CategoryAction id={category?._id} />
      <CategoryInformation info={category} />
    </div>
  );
}

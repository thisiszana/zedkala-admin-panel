import CategoryDetailsPage from "@/components/pages/category/CategoryDetailsPage";
import { getCategory } from "@/actions/category.action";

export default async function CategoryDetails({ params: { id } }) {
  const { category } = await getCategory(id);

  return (
    <CategoryDetailsPage category={JSON.parse(JSON.stringify(category))} />
  );
}

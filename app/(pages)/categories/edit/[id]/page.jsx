import { getCategory } from "@/actions/category.action";
import AddCategoryPage from "@/components/pages/add-category/AddCategoryPage";

export default async function EditCategory({ params: { id } }) {
  const { category } = await getCategory(id);

  if (!category) return <h3>دسته‌بندی یافت نشد!</h3>;
  return <AddCategoryPage category={JSON.parse(JSON.stringify(category))} />;
}

import { getCategories } from "@/actions/category.action";
import { Category } from "@/components/icons/Icons";
import Loaderbar from "@/components/shared/Loaderbar";
import PageHeading from "@/components/shared/PageHeading";
import Link from "next/link";
import { Suspense } from "react";
import CategoriesList from "./ui/CategoriesList";

export default async function CategoriesPage() {
  const data = await getCategories();
  return (
    <>
      <div className="flex justify-between gap-1 mx-2">
        <PageHeading title="دسته‌بندی" />
        <Link
          href="/add-category"
          className="h-fit flex items-center gap-3 p-btn rounded-btn bg-dark1 dark:bg-white text-white dark:text-dark1"
        >
          <Category />
          New
        </Link>
      </div>
      <Suspense fallback={<Loaderbar />}>
        <CategoriesList cateogories={JSON.parse(JSON.stringify(data))} />
      </Suspense>
    </>
  );
}

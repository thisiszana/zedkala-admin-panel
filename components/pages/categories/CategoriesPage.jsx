import Link from "next/link";

import { Suspense } from "react";

import PageHeading from "@/components/shared/PageHeading";
import { getCategories } from "@/actions/category.action";
import Loaderbar from "@/components/shared/Loaderbar";
import { Category } from "@/components/icons/Icons";
import CategoriesList from "./ui/CategoriesList";

export default async function CategoriesPage() {
  const data = await getCategories();
  return (
    <>
      <div className="flex justify-between gap-1 ml-3">
        <PageHeading title="دسته‌بندی" />
        <Link
          href="/add-category"
          className="h-fit flex items-center gap-3 p-btn rounded-btn bg-dark1 dark:bg-white text-white dark:text-dark1"
        >
          <Category />
          جدید
        </Link>
      </div>
      <div className="cardShadow3 rounded-2xl border overflow-hidden mt-8 sm:ml-3">
        <Suspense key={data} fallback={<Loaderbar />}>
          <CategoriesList
            cateogories={JSON.parse(JSON.stringify(data.category))}
          />
        </Suspense>
      </div>
    </>
  );
}

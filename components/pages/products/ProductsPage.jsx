import { LayerPlus } from "@/components/icons/Icons";
import PageHeading from "@/components/shared/PageHeading";
import Link from "next/link";
import React, { Suspense } from "react";
import ProductsFilter from "./ui/ProductsFilter";
import ProductsOverview from "./ui/ProductsOverview";
import Loaderbar from "@/components/shared/Loaderbar";

export default function ProductsPage({ searchParams }) {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const category = searchParams?.category || "";
  const stock = searchParams?.stock || "";
  const discount = searchParams?.discount || "";
  const sort = searchParams?.sort || "";
  const published = searchParams?.published || "";

  return (
    <>
      <div className="flex justify-between gap-1 mx-2">
        <PageHeading title="محصولات" />
        <Link
          href="/add-product"
          className="h-fit flex items-center gap-3 p-btn rounded-btn bg-dark1 dark:bg-white text-white dark:text-dark1"
        >
          <LayerPlus />
          جدید
        </Link>
      </div>
      <div className="cardShadow3 rounded-2xl border overflow-hidden mt-8">
        <ProductsFilter />
        <Suspense
          key={search + page + category + stock + discount + sort + published}
          fallback={<Loaderbar />}
        >
          <ProductsOverview searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

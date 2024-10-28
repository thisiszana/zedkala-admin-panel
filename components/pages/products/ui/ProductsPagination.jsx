"use client";

import { LeftAngle, RightAngle } from "@/components/icons/Icons";
import useSetSearchQuery from "@/hooks/useSetSearchQuery";
import CustomBtn from "@/components/shared/CustomBtn";
import { e2p } from "@/utils/fun";

export default function ProductsPagination({
  totalPages,
  totalProducts,
  searchParams,
}) {
  const { setSearchParams } = useSetSearchQuery();
  const currentPage = Number(searchParams?.page) || 1;

  const nextPage = () => {
    const newPage = currentPage + 1;
    setSearchParams("page", String(newPage));
  };

  const perPage = () => {
    const newPage = currentPage - 1;
    setSearchParams("page", String(newPage));
  };
  return (
    <div className="flex items-center justify-end gap-2 p-4 dark:bg-white">
      <p className="whitespace-nowrap text-p2 bg-dark1 text-white rounded-btn py-1 px-3">
        {e2p(totalProducts)} محصول
      </p>
      <div className="flex items-center gap-2 w-full justify-end">
        <p className="rounded-xl text-sm">
          {e2p(searchParams?.page ?? 1)} / {e2p(totalPages ?? 1)}
        </p>
        <CustomBtn
          type="button"
          icon={<RightAngle size={15} />}
          onClick={() => perPage()}
          disabled={
            searchParams?.page == "1" || searchParams?.page === undefined
          }
          classNames={`${
            searchParams?.page == "1" || searchParams?.page === undefined
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          } rounded-full hover:bg-lightGray p-3 Transition`}
        />
        <CustomBtn
          type="button"
          icon={<LeftAngle size={15} />}
          onClick={() => nextPage()}
          disabled={
            searchParams?.page == String(totalPages) ||
            totalPages === 1 ||
            totalPages === 0
          }
          classNames={`${
            searchParams?.page == String(totalPages) ||
            totalPages === 1 ||
            totalPages === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-black"
          } rounded-full hover:bg-lightGray p-3 Transition`}
        />
      </div>
    </div>
  );
}

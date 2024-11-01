"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCategories } from "@/actions/category.action";
import { CircleClose, Trash } from "@/components/icons/Icons";
import CustomInp from "@/components/shared/form/CustomInp";
import useSetSearchQuery from "@/hooks/useSetSearchQuery";
import { Select, SelectItem } from "@nextui-org/react";

import { useDebouncedCallback } from "use-debounce";
import CustomBtn from "@/components/shared/CustomBtn";

export default function ProductsFilter() {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  console.log("filters", filters);
  const router = useRouter();
  const { searchParams, setSearchParams, params } = useSetSearchQuery();

  const handleSearchQuery = useDebouncedCallback((query) => {
    setSearchParams("page", "1");
    setSearchParams("search", encodeURIComponent(query));
  }, 300);

  useEffect(() => {
    let paramsArray;

    paramsArray = !!!params?.toString()
      ? []
      : params
          .toString()
          .split("&")
          .map((param) => param.split("="));

    setFilters(
      paramsArray.length === 0
        ? []
        : paramsArray.filter((param) => param[0] !== "page")
    );
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      if (categoriesData || categoriesData.category) {
        setCategories(categoriesData.category);
      }
    };

    fetchCategories();
  }, []);

  const clearFilters = () => {
    router.replace("/products");
    router.refresh("/products");
  };

  const deleteFilter = (queryName) => {
    setSearchParams(queryName, "");
  };

  const selectFilters = [
    {
      label: "دسته‌بندی",
      items: categories.map((c) => ({
        key: c.categoryName.toLowerCase(),
        label: c.categoryName,
      })),
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("category", e.target.value.toLowerCase());
      },
    },
    {
      label: "موجودی",
      items: [
        { key: "in-stock", label: "موجود" },
        { key: "out-of-stock", label: "ناموجود" },
      ],
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("stock", e.target.value.toLowerCase());
      },
    },
    {
      label: "منتشر‌شده",
      items: [
        { key: "true", label: "منتشر‌شده" },
        { key: "false", label: "پیش‌نویس" },
      ],
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("published", e.target.value.toLowerCase());
      },
    },
    {
      label: "تخفیف",
      items: [
        { key: "has-discount", label: "با‌تخفیف" },
        { key: "no-discount", label: "بدون‌تخفیف" },
      ],
      onChange: (e) => {
        setSearchParams("page", "1");
        setSearchParams("discount", e.target.value.toLowerCase());
      },
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap gap-4 w-full">
        <CustomInp
          type="text"
          label="جستجو"
          defaultValue={
            !!searchParams.get("search")?.toString()
              ? searchParams.get("search")?.toString()
              : ""
          }
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
        {selectFilters?.map((select, index) => (
          <Select
            items={select.items}
            label={select.label}
            className="min-w-[200px] flex flex-1"
            onChange={select.onChange}
            key={index}
          >
            {(s) => <SelectItem>{s.label}</SelectItem>}
          </Select>
        ))}
      </div>
      {filters?.length !== 0 && (
        <PageFilters
          filters={filters}
          clearFilters={clearFilters}
          deleteFilter={deleteFilter}
        />
      )}
    </div>
  );
}

const PageFilters = ({ filters, clearFilters, deleteFilter }) => {
  return (
    <div className="flex gap-2 items-center flex-wrap mt-3">
      {filters.map((filter) => {
        return (
          <div
            key={filter[0]}
            className="flex items-center gap-2 p-2 rounded-btn border"
          >
            <span className="capitalize text-p2">{filter[0]}:</span>
            <CustomBtn
              type="button"
              classNames="rounded-btn flex items-center gap-btn bg-dark1 hover:bg-dark2 Transition py-[2.5px] px-1.5 group"
              title={
                <>
                  <span className="text-lightGray text-p2 capitalize">
                    {filter[1]}
                  </span>
                  <CircleClose
                    size={18}
                    className="text-darkGray group-hover:text-lightGray Transition"
                  />
                </>
              }
              onClick={() => deleteFilter(filter[0])}
            />
          </div>
        );
      })}
      <CustomBtn
        type="button"
        classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
        title={<p className="text-p1 font-bold">پاک‌کردن</p>}
        icon={<Trash />}
        onClick={clearFilters}
      />
    </div>
  );
};

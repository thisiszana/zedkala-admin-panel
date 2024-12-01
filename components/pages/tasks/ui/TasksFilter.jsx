"use client";

import { Trash } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import useSetSearchQuery from "@/hooks/useSetSearchQuery";
import { Select } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TasksFilter() {
  const router = useRouter();
  const { searchParams, setSearchParams, params } = useSetSearchQuery();
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    let paramsArray;

    paramsArray = !!!params.toString()
      ? []
      : params
          .toString()
          .split("&")
          .map((param) => param.split("="));
  }, [searchParams]);

  const clearFilters = () => {
    router.replace("/tasks");
    router.refresh("/tasks");
  };

  const selectFilters = [
    {
      label: "نمایش",
      options: [
        { value: "personal", label: "تسک‌های خودم" },
        { value: "public", label: "عمومی" },
      ],
      onChange: (value) => {
        setSearchParams("viewType", value.toLowerCase());
      },
    },
  ];

  return (
    <div className="flex gap-4 my-3 w-fit flex-col sm:flex-row">
      {selectFilters.map((select, index) => (
        <Select
          options={select.options}
          placeholder={select.label}
          className="min-w-[200px] flex flex-1"
          onChange={select.onChange}
          key={index}
        />
      ))}
      <CustomBtn
        type="button"
        classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
        title={<p className="text-p1 font-bold">پاک کردن</p>}
        icon={<Trash />}
        onClick={clearFilters}
      />
    </div>
  );
}

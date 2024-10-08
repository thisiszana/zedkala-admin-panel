"use client";

import { categoryColumn } from "@/constants/tabelColumns";
import { categoriesDataSourse } from "@/constants/tabelDataSourse";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Table } from "antd";

export default function CategoriesList({ cateogories }) {
  const { isDarkMode } = useDarkMode();
  console.log(cateogories);
  return (
    <div>
      <Table
        scroll={{ x: false }}
        pagination={false}
        columns={categoryColumn}
        dataSource={categoriesDataSourse(cateogories)}
        locale={{
          emptyText: "دیتایی وجود ندارد",
        }}
      />
    </div>
  );
}

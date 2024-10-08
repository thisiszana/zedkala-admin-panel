"use client";

import { categoryColumn } from "@/constants/tabelColumns";
import { categoriesDataSourse } from "@/constants/tabelDataSourse";
import { Table } from "antd";

export default function CategoriesList({ cateogories }) {
    console.log(cateogories)
  return (
    <div>
      <Table
        scroll={{ x: false }}
        pagination={false}
        columns={categoryColumn}
        dataSource={categoriesDataSourse(cateogories)}
      />
    </div>
  );
}

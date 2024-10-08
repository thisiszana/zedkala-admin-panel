"use client";

import { categoryColumn } from "@/constants/tabelColumns";
import { Table } from "antd";

export default function CategoriesList({ cateogories }) {
  return (
    <div>
      <Table
        scroll={{ x: false }}
        pagination={false}
        columns={categoryColumn}
      />
    </div>
  );
}

"use client";

import { categoryColumn } from "@/constants/tabelColumns";
import { categoriesDataSourse } from "@/constants/tabelDataSourse";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Empty, Table } from "antd";

export default function CategoriesList({ cateogories }) {
  return (
    <div>
      <Table
        scroll={{ x: false }}
        pagination={false}
        columns={categoryColumn}
        dataSource={categoriesDataSourse(cateogories)}
        locale={{
          emptyText: (
            <Empty
              description="بدون داده"
              image={Empty.PRESENTED_IMAGE_DEFAULT}
            />
          ),
        }}
      />
    </div>
  );
}

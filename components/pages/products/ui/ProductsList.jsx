"use client";

import { productsColumn } from "@/constants/tabelColumns";
import { productsDataSourse } from "@/constants/tabelDataSourse";
import { Empty, Table } from "antd";

export default function ProductsList({ products }) {
  return (
    <div className="dark:bg-dark1 bg-white rounded-lg p-4">
      <Table
        scroll={{ x: true }}
        pagination={false}
        columns={productsColumn}
        dataSource={productsDataSourse(products?.products)}
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

"use client";

import { productsColumn } from "@/constants/tabelColumns";
import { productsDataSourse } from "@/constants/tabelDataSourse";
import { Empty, Table } from "antd";

export default function ProductsList({ products }) {

  return (
    <div>
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

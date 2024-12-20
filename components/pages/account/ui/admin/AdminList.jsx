"use client";

import { Table } from "antd";

import { adminsDataSourse } from "@/constants/tabelDataSourse";
import { adminsColumns } from "@/constants/tabelColumns";

export default function AdminList({ admins, session }) {
  return (
    <div className="tableContainer ml-3">
      <Table
        columns={adminsColumns}
        dataSource={adminsDataSourse(admins, session.userId, session.roll)}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
}

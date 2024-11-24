import { Table } from "antd";

import { adminsDataSourse } from "@/constants/tabelDataSourse";
import { adminsColumns } from "@/constants/tabelColumns";
import { getServerSession } from "@/utils/session";

export default function AdminList({ admins }) {
  const session = getServerSession();
  return (
    <div className="tableContainer">
      <Table
        columns={adminsColumns}
        dataSource={adminsDataSourse(admins, session.userId, session.roll)}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
}

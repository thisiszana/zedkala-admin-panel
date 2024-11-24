import { getAdmins } from "@/actions/admin.action";
import AdminList from "./AdminList";

export default async function AdminTab() {
  const { admins } = await getAdmins();

  return <AdminList admins={JSON.parse(JSON.stringify(admins))} />;
}

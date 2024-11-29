import { getAdmins } from "@/actions/admin.action";
import AdminList from "./AdminList";
import { getServerSession } from "@/utils/session";

export default async function AdminTab() {
  const { admins } = await getAdmins();
  const session = getServerSession();

  return (
    <AdminList admins={JSON.parse(JSON.stringify(admins))} session={session} />
  );
}

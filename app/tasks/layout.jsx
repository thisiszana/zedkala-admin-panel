import { redirect } from "next/navigation";

import Sidebar from "@/components/shared/layout/Sidebar";
import { getServerSession } from "@/utils/session";


export default function TasksLayout({children}) {
    const session = getServerSession();

  if (!session) redirect("/login");
  return (
    <div>
      <Sidebar />
      <div className="pages_spaces">
        <div className="space-y-[20px]">
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

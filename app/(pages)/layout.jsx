import { redirect } from "next/navigation";

import { getServerSession } from "@/utils/session";
import Navbar from "@/components/shared/layout/Navbar";
import Sidebar from "@/components/shared/layout/Sidebar";

export default function PagesLayout({ children }) {
  const session = getServerSession();

  if (!session) redirect("/register");
  return (
    <div>
      <Sidebar />
      <div className="pages_spaces">
        <div className="space-y-[20px]">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

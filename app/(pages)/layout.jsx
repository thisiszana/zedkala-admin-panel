import { redirect } from "next/navigation";

import { getServerSession } from "@/utils/session";
import Navbar from "@/components/shared/layout/Navbar";

export default function PagesLayout({ children }) {
  const session = getServerSession();

  if (!session) redirect("/register");
  return (
    <div>
      <Navbar />
      <div className="space-y-[20px]">
        <div>{children}</div>
      </div>
    </div>
  );
}

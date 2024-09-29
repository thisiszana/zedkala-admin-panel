import { redirect } from "next/navigation";

import { getServerSession } from "@/utils/session";

export default function AuthLayout({ children }) {
  const session = getServerSession();

  if (session) redirect("/dashboard");
  return <main>{children}</main>;
}

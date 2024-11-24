import { Suspense } from "react";

import { Tabs } from "antd";

import { AddUser, Settings, Users } from "@/components/icons/Icons";
import PageHeading from "@/components/shared/PageHeading";
import Loaderbar from "@/components/shared/Loaderbar";
import GeneralTab from "./ui/general/GeneralTab";
import CreateUser from "./ui/create/CreateUser";
import AdminTab from "./ui/admin/AdminTab";

export default function AccountPage() {
  const items = [
    {
      key: "general",
      label: (
        <div className="flex items-center gap-2 dark:text-white">
          <Settings size={15} />
          <p className="text-h4 mr-2">عمومی</p>
        </div>
      ),
      children: (
        <Suspense fallback={<Loaderbar />}>
          <GeneralTab />
        </Suspense>
      ),
    },
    {
      key: "admins",
      label: (
        <div className="flex items-center gap-2  mr-4 dark:text-white">
          <Users size={15} />
          <p className="text-h4 mr-2">مدیران</p>
        </div>
      ),
      children: (
        <Suspense fallback={<Loaderbar />}>
          <AdminTab />
        </Suspense>
      ),
    },
    {
      key: "create",
      label: (
        <div className="flex items-center gap-2 dark:text-white">
          <AddUser size={15} />
          <p className="text-h4 mr-2">ایحاد کاربر جدید</p>
        </div>
      ),
      children: <CreateUser />,
    },
  ];
  return (
    <>
      <PageHeading title="تنضیمات حساب کاربری" />
      <Tabs defaultActiveKey="general" items={items} />
    </>
  );
}

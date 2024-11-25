import { Suspense } from "react";

import PageHeading from "@/components/shared/PageHeading";
import Loaderbar from "@/components/shared/Loaderbar";
import AdminProfile from "./ui/AdminProfile";

export default function AdminDeatailsPage({ id }) {
  return (
    <>
      <PageHeading title="مشخصات ادمین" />
      <Suspense fallback={<Loaderbar />}>
        <AdminProfile id={id} />
      </Suspense>
    </>
  );
}

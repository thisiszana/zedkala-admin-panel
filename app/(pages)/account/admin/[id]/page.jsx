import AdminDeatailsPage from "@/components/pages/account/ui/adminDeatails/AdminDeatailsPage";

export default function AdminDeatails({ params }) {
  return <AdminDeatailsPage id={params.id} />;
}

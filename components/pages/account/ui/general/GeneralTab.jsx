import { getCurrentAdmin } from "@/actions/admin.action";
import AvatarSection from "./AvatarSection";
import ProfileForm from "./ProfileForm";

export default async function GeneralTab() {
  const currentAdmin = await getCurrentAdmin();

  return (
    <div className="flex flex-col xl:flex-row gap-5">
      <AvatarSection admin={currentAdmin} />
      <ProfileForm {...JSON.parse(JSON.stringify(currentAdmin))} />
    </div>
  );
}

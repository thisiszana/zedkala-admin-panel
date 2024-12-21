import { getBanner } from "@/actions/banner.action";
import AddBannerPage from "@/components/pages/add-banner/AddBannerPage";
import BannerList from "@/components/pages/add-banner/ui/BannerList";

export default async function AddBanner() {
  const banner = await getBanner();

  return (
    <>
      <AddBannerPage />
      <BannerList banner={banner?.banner} />
    </>
  );
}

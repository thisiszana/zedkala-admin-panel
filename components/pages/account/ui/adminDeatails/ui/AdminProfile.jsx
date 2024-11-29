import { notFound } from "next/navigation";
import Image from "next/image";

import moment from "moment-jalaali";

import { Date, Flag, Location, Mail, Mobile } from "@/components/icons/Icons";
import ContentSlider from "@/components/shared/ContentSlider";
import DetailedBox from "@/components/shared/DetailedBox";
import CustomBadge from "@/components/shared/CustomBadge";
import { images as imagesDefault } from "@/constants";
import { getAdmin } from "@/actions/admin.action";
import { e2p, sp } from "@/utils/fun";

export default async function AdminProfile({ id }) {
  const { admin } = await getAdmin(id);

  if (!admin) return notFound();

  const {
    username,
    firstName,
    email,
    phoneNumber,
    address,
    country,
    images,
    roll,
    createdAt,
    productsCreated,
    blogsCreated,
    categoryCreated,
  } = JSON.parse(JSON.stringify(admin));

  const overviewContent = (
    <div className="w-full box border flex flex-col items-center gap-1">
      <div className="flex justify-center w-full mb-4">
        <Image
          src={images || imagesDefault.admin}
          width={200}
          height={200}
          style={{ width: "200px", height: "auto", borderRadius: "50%" }}
          alt="admin"
        />
      </div>
      <CustomBadge title={roll} condition={roll === "OWNER"} />
      <p className="text-h3 font-bold">{username}</p>
      <p className="text-p1 text-darkGray font-medium capitalize">
        {firstName}
      </p>
    </div>
  );

  const aboutContent = (
    <div className="w-full box border flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <Location />
        <p className="text-p1 font-medium line-clamp-2">{address || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Mail />
        <p className="text-p1 font-medium line-clamp-2">{email || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Mobile />
        <p className="text-p1 font-medium line-clamp-2">
          {e2p(phoneNumber) || "_"}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <Flag />
        <p className="text-p1 font-medium line-clamp-2">{country || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Date />
        <p className="text-p1 font-medium line-clamp-2">
          {e2p(moment(createdAt).locale("fa").format("jYYYY/jMM/jDD"))}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <DetailedBox title="نمای کلی" content={overviewContent} />
      <DetailedBox title="درباره ادمین" content={aboutContent} />
      <DetailedBox
        title="محصولات"
        content={
          <ContentSlider items={productsCreated} linkPrefix="/product" />
        }
      />
      <DetailedBox
        title="دسته‌بندی‌ها"
        content={<ContentSlider items={categoryCreated} linkPrefix="/blogs" />}
      />
      <DetailedBox
        title="وبلاگ‌ها"
        content={<ContentSlider items={blogsCreated} linkPrefix="/blogs" />}
      />
    </div>
  );
}

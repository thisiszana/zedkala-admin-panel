import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment-jalaali";

import CustomBadge from "@/components/shared/CustomBadge";
import { Clock } from "@/components/icons/Icons";
import ImageSlider from "./ImageSlider";
import { images } from "@/constants";

export default function HeaderProductInfo({ info }) {
  return (
    <div className="flex flex-col md:flex-row-reverse justify-between gap-4 p-4">
      <ImageSlider images={info?.images} />
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-2 items-center">
          <Clock
            className="text-darkGray dark:text-white"
            wrapperClassName="cardShadow rounded-btn p-3"
          />
          <div>
            <p className="font-bold text-darkGray text-sm dark:text-white">
              {moment(info?.createdAt).calendar()}
            </p>
            <p className="text-xs text-darkGray dark:text-white mt-2">
              {moment(info?.createdAt).format("LT")}
            </p>
          </div>
        </div>

        <p
          className={`text-p1 font-bold ${
            info?.stock !== 0 ? "text-darkGreen" : "text-darkRose"
          }`}
        >
          {info?.stock !== 0 ? "موجود" : "خارج از موجودی"}
        </p>

        <CustomBadge
          condition={info?.published}
          title={info?.published ? "منتشر شده" : "پیش نویس"}
        />
        <div className="space-y-2 w-fit">
          <p className="text-p2">ساخته شده توسط :</p>
          <Link
            href={`/account/admins/${info?.createdBy?._id}`}
            className="flex items-center gap-3"
          >
            <Image
              as={NextImage}
              src={info?.createdBy.images || images.admin}
              width={100}
              height={100}
              alt="creator"
              className="rounded-full w-30 h-30"
            />
            <div>
              <p className="text-p1 font-medium">{info?.createdBy?.username}</p>
              <p className="text-p2 text-darkGray">
                {info?.createdBy?.firstName}
              </p>
            </div>
          </Link>
        </div>

        <p className="font-bold text-h3">{info?.title}</p>
      </div>
    </div>
  );
}

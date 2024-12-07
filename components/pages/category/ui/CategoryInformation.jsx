"use client";

import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment-jalaali";

import CustomBadge from "@/components/shared/CustomBadge";
import SubCategoryAccordion from "./SubCategoryAccordion";
import { Clock } from "@/components/icons/Icons";
import { images } from "@/constants";
import { e2p } from "@/utils/fun";

export default function CategoryInformation({ info }) {
  return (
    <div className="flex flex-col xl:flex-row gap-box ml-3">
      <div className="w-full xl:w-[50%] space-y-5 box border p-4">
        <div className="flex gap-2 items-center">
          <Clock
            className="text-darkGray dark:text-white"
            wrapperClassName="cardShadow rounded-btn p-3"
          />
          <div>
            <p className="font-bold text-darkGray text-sm dark:text-white">
              {e2p(moment(info?.createdAt).format("jYYYY/jM/jD"))}
            </p>
            <p className="text-xs text-darkGray dark:text-white">
              {e2p(moment(info?.createdAt).format("LT"))}
            </p>
          </div>
        </div>

        <CustomBadge
          condition={info?.published}
          title={info?.published ? "منتشر شده" : "پیش‌نویس"}
        />

        <div className="space-y-2">
          <p className="text-p2">ساخته‌شده توسط :</p>
          <Link
            href={`/account/admins/${info?.createdBy?._id}`}
            className="flex items-center gap-3"
          >
            <Image
              as={NextImage}
              src={info?.createdBy.images || images.admin}
              width={50}
              height={50}
              alt="creator"
              className="rounded-full"
            />
            <div>
              <p className="text-p1 font-medium">{info?.createdBy?.username}</p>
              <p className="text-p2 text-darkGray dark:text-white">
                {info?.createdBy?.firstName}
              </p>
            </div>
          </Link>
        </div>

        <div>
          <Image
            as={NextImage}
            src={info.images[0]}
            width={100}
            height={100}
            alt={info?.name}
            className="rounded-box"
          />
          <p className="font-bold text-h3">{info?.name}</p>
        </div>

        <div className="space-y-2">
          <p className="text-p1 font-bold">زیر دسته‌ها :</p>
          <SubCategoryAccordion categories={info} />
        </div>

        <div className="space-y-2">
          <p className="text-p1 font-bold">برندها :</p>
          <div className="flex flex-wrap gap-2">
            {info.brands.length > 0 ? (
              info.brands.map((brand, brandIndex) => (
                <div
                  key={brandIndex}
                  className="bg-gray-100 p-2 rounded-lg dark:bg-dark2"
                >
                  <p className="font-medium">{brand.name}</p>
                  {brand.logo && (
                    <Image
                      as={NextImage}
                      src={brand.logo}
                      width={30}
                      height={30}
                      alt={brand.name}
                      className="rounded-full"
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-darkGray dark:text-white">برندی موجود نیست</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-p1 font-bold">ترتیب نمایش :</p>
          <p className="text-darkGray dark:text-white">{info.order}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment-jalaali";

import CustomBadge from "@/components/shared/CustomBadge";
import { Clock } from "@/components/icons/Icons";
import { images } from "@/constants";

export default function CategoryInformation({ info }) {
  console.log(info);
  return (
    <div className="flex flex-col xl:flex-row gap-box ml-3">
      <div className="w-full xl:w-[50%] h-fit flex justify-center box border">
        <Image
          as={NextImage}
          src={info.image}
          width={500}
          height={500}
          alt={info?.name}
          className="rounded-box"
        />
      </div>
      <div className="w-full xl:w-[50%] space-y-5 box border">
        <div className="flex gap-2 items-center">
          <Clock
            className="text-darkGray dark:text-white"
            wrapperClassName="cardShadow rounded-btn p-3"
          />
          <div>
            <p className="font-bold text-darkGray text-sm dark:text-white">
              {moment(info?.createdAt).format("jYYYY/jM/jD")}
            </p>
            <p className="text-xs text-darkGray dark:text-white">
              {moment(info?.createdAt).format("LT")}
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
              src={info?.createdBy.image || images.admin}
              width={100}
              height={100}
              alt="creator"
              className="rounded-full w-30 h-30"
            />
            <div>
              <p className="text-p1 font-medium">{info?.createdBy?.username}</p>
              <p className="text-p2 text-darkGray dark:text-white">
                {info?.createdBy?.firstName}
              </p>
            </div>
          </Link>
        </div>
        <p className="font-bold text-h3">{info?.categoryName}</p>
        <div className="space-y-2">
          <p className="text-p1 font-bold">زیر دسته‌ها :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {info.subCategories.map((c) => (
              <div key={c._id}>
                <div className="bg-gray-200 py-2 px-3 rounded-lg dark:bg-dark2">
                  <p className="text-p1 text-xs font-bold capitalize">{c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

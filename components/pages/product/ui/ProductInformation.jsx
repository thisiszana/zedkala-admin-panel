"use client";

import NextImage from "next/image";

import { useState } from "react";

import { Drawer, Button } from "antd";

import { Clock } from "@/components/icons/Icons";
import CustomBadge from "@/components/shared/CustomBadge";
import { Image } from "@nextui-org/react";

import moment from "moment-jalaali";
import { icons, images, productInformationDetails } from "@/constants";
import Link from "next/link";
import Avatar from "./Avatar";
import DiscountCountdown from "./DiscountCountdown";
import ImageSlider from "./ImageSlider";
import CustomBtn from "@/components/shared/CustomBtn";

moment.locale("fa");
moment.loadPersian({ usePersianDigits: true });

export default function ProductInformation({ info }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  if (info.discount) {
    console.log("true")
  }
  if (!info.discount) {
    console.log("false")
  }

  console.log(info);
  return (
    <div className="flex flex-col xl:flex-row-reverse gap-box">
      <ImageSlider images={info?.images} />
      <div className="w-full xl:w-[60%] space-y-5 box border">
        <div className="flex gap-2 items-center">
          <Clock
            className="text-darkGray dark:text-white"
            wrapperClassName="cardShadow rounded-btn p-3"
          />
          <div>
            <p className="font-bold text-darkGray text-sm dark:text-white">
              {moment(info?.createdAt).calendar()}
            </p>
            <p className="text-xs text-darkGray dark:text-white">
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

        <div className="space-y-2">
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
        <p className="font-bold text-h3">{info?.slug}</p>

        <div className="flex items-center gap-3">
          <p className="text-p1 text-darkGray">
            ({info?.orders?.length} سفارشات)
          </p>
          <Avatar orders={info?.orders} />
        </div>

        <div className="border-t pt-2">
          <p className="text-p1 font-bold">توضیحات :</p>
          <p className="text-darkGray text-p1">
            {" "}
            {info?.description ? info?.description : "تعریف نشده ..."}
          </p>
        </div>

        <div className="border-t pt-2">
          <p className="text-p1 font-bold">سیاست بازگشت کالا :</p>
          <p className="text-darkGray text-sm">
            {info?.returnPolicy ? info?.returnPolicy : "تعریف نشده ..."}
          </p>
        </div>

        <div className="border-t pt-2">
          <p className="text-p1 font-bold">گارانتی کالا :</p>
          <p className="text-darkGray text-sm">
            {info?.warranty ? info?.warranty : "تعریف نشده ..."}
          </p>
        </div>
        <hr />

        <DiscountCountdown discount={info.discount} originalPrice={info?.price} />

        {productInformationDetails(info).map((item) => (
          <div key={item.value} className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {item.icon}
              <p className="text-p1 text-darkGray">{item.name}</p>
            </div>
            <p className="text-p1">{item.value}</p>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="cardShadow rounded-lg p-3">{icons.color}</span>
            <p className="text-p1 text-darkGray">رنگ ها :</p>
          </div>
          <div className="flex gap-2 flex-wrap items-center max-w-[300px] max-h-[120px] overflow-auto border rounded-full p-2">
            {info.colors.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-6 h-6 rounded-full border border-black dark:border-white"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 items-center">
            <span className="cardShadow rounded-lg p-3">{icons.size}</span>
            <p className="text-p1 text-darkGray">سایزها:</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center p-[8px]">
            {info.sizes.length > 0 ? (
              info.sizes.map((size, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 rounded-md text-darkGray"
                >
                  {size}
                </span>
              ))
            ) : (
              <span className="text-gray-500">سایزی تعریف نشده است</span>
            )}
          </div>
        </div>

        <div className="space-y-2 border-t pt-2">
          <p className="text-p1 font-bold">مشخصات فنی :</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {info.specifications.slice(0, 2).map((spec) => (
              <div key={spec._id}>
                <div className="bg-gray-200 dark:bg-dark2 py-2 px-3 rounded-lg">
                  <p className="text-p1 text-xs font-bold capitalize">
                    {spec.label}
                  </p>
                  <p className="text-p1 text-xs my-2 capitalize">
                    {spec.value}
                  </p>
                </div>
              </div>
            ))}
            {info.specifications.length > 2 && (
              <div className="mt-4">
                <CustomBtn
                  title="نمایش بیشتر"
                  onClick={handleDrawerOpen}
                  classNames="py-2 px-3 font-bold flex items-center bg-dark1 text-white dark:bg-lightGray dark:text-dark1 justify-center rounded-btn"
                />
              </div>
            )}
          </div>
        </div>

        <Drawer
          title={
            <span className="font-bold dark:text-white">مشخصات فنی کامل</span>
          }
          placement="bottom"
          onClose={handleDrawerClose}
          open={isDrawerOpen}
          className={`dark:bg-dark1`}
        >
          <div className="space-y-2">
            {info.specifications.map((spec) => (
              <div key={spec._id} className="mb-3">
                <div className="bg-gray-200 dark:bg-dark2 py-2 px-3 rounded-lg">
                  <p className="text-p1 text-xs font-bold capitalize dark:text-white">
                    {spec.label}
                  </p>
                  <p className="text-p1 text-xs my-2 capitalize dark:text-lightGray">
                    {spec.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Drawer>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mt-4">
          <p className="font-bold">کلمات کلیدی :</p>
          {info.keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-dark2 px-2 py-1 rounded text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Category */}
        <div className="p-6 bg-white dark:bg-dark2 rounded-lg shadow-md space-y-6">
          {/* عنوان دسته‌بندی */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xl font-bold text-darkGray dark:text-white mb-2">
              دسته‌بندی
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              <span className="font-medium">عنوان:</span>{" "}
              <span className="text-primary">
                {info?.categoryName || "تعریف نشده"}
              </span>
            </p>
          </div>

          {/* زیرمجموعه‌ها */}
          <div>
            <h3 className="text-lg font-semibold text-darkGray dark:text-white mb-4">
              زیرمجموعه‌ها
            </h3>
            {info.subCategories.length > 0 ? (
              info.subCategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="p-4 bg-gray-50 dark:bg-dark1 rounded-lg border space-y-4 mb-4"
                >
                  {/* نام زیرمجموعه */}
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-lg font-medium">•</span>
                    <h4 className="text-md font-semibold text-darkGray dark:text-gray-300">
                      {subcategory.name || "بدون نام"}
                    </h4>
                  </div>

                  {/* لیست آیتم‌ها */}
                  <ul className="list-inside space-y-2">
                    {subcategory.items.length > 0 ? (
                      subcategory.items.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full inline-block"></span>
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500">
                        آیتمی تعریف نشده است
                      </li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">زیرمجموعه‌ای تعریف نشده است</p>
            )}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-dark2 rounded-lg shadow-md space-y-6">
          {/* deliveryOptions */}
          <div>
            <h3 className="text-lg font-semibold text-darkGray mb-4">
              گزینه‌های تحویل:
            </h3>
            <div className="flex gap-4 items-center">
              <span
                className={`px-4 py-2 rounded-lg text-sm ${
                  info.deliveryOptions.fastDelivery
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                تحویل سریع:{" "}
                {info.deliveryOptions.fastDelivery ? "فعال" : "غیرفعال"}
              </span>
              <span
                className={`px-4 py-2 rounded-lg text-sm ${
                  info.deliveryOptions.freeDelivery
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                تحویل رایگان:{" "}
                {info.deliveryOptions.freeDelivery ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>
          {/* insurance */}
          <div>
            <h3 className="text-lg font-semibold text-darkGray mb-4">
              اطلاعات بیمه:
            </h3>
            {info.insurance ? (
              <div className="p-6 border rounded-lg bg-gray-50 dark:bg-dark2 shadow-md space-y-4 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p className="text-sm flex items-start gap-2">
                    <span className="font-medium text-darkGray">نوع بیمه:</span>
                    <span className="text-gray-700">
                      {info.insurance.insuranceType || "تعریف نشده"}
                    </span>
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="font-medium text-darkGray">مدت بیمه:</span>
                    <span className="text-gray-700">
                      {info.insurance.insuranceDuration
                        ? `${info.insurance.insuranceDuration} ماه`
                        : "تعریف نشده"}
                    </span>
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="font-medium text-darkGray">
                      هزینه بیمه:
                    </span>
                    <span className="text-gray-700">
                      {info.insurance.insuranceCost
                        ? `${info.insurance.insuranceCost.toLocaleString()} تومان`
                        : "تعریف نشده"}
                    </span>
                  </p>
                  <p className="text-sm flex items-start gap-2">
                    <span className="font-medium text-darkGray">
                      بیمه اختیاری:
                    </span>
                    <span className="text-gray-700">
                      {info.insurance.optionalInsurance ? "بله" : "خیر"}
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
                    onClick={(e) => {
                      const content = e.currentTarget.nextElementSibling;
                      content.classList.toggle("hidden");
                      e.currentTarget
                        .querySelector("svg")
                        .classList.toggle("rotate-180");
                    }}
                  >
                    <span>مشاهده شرایط بیشتر</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transform transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <p className="text-sm text-gray-700 mt-2 hidden transition-all duration-300">
                    {info.insurance.insuranceTerms || "تعریف نشده"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">بیمه‌ای تعریف نشده است</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

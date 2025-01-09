"use client";

import React, { useState } from "react";

import { Drawer } from "antd";

import { icons, productInformationDetails } from "@/constants";

import CustomBtn from "@/components/shared/CustomBtn";
import DiscountCountdown from "./DiscountCountdown";
import Avatar from "./Avatar";
import HeaderProductInfo from "./HeaderProductInfo";
import { e2p, sp } from "@/utils/fun";

export default function ProductInformation({ info }) {
  console.log(info);
  return (
    <div className="w-full space-y-5 box border">
      <HeaderProductInfo info={info} />
      <DescriptionProductInfo info={info} />
      <DiscountCountdown discount={info.discount} originalPrice={info?.price} />
      {productInformationDetails(info).map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-dashed pb-3"
        >
          <div className="flex gap-2 items-center">
            {item.icon}
            <p className="text-p1 font-bold">{item.name}</p>
          </div>
          <div className="text-p1">{item.value}</div>
        </div>
      ))}
      <Specifications info={info} />
      {/* Keywords */}
      <div className="space-y-2 border-t pt-2">
        <p className="font-bold">کلمات کلیدی :</p>
        <div className="flex items-center gap-4 flex-wrap">
          {info.keywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-white shadow-md dark:bg-dark1 px-2 py-1 rounded text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <CategoryReview info={info} />
      <DeliveryOptionReview info={info} />
      <Insurance info={info} />
    </div>
  );
}

function DescriptionProductInfo({ info }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <p className="text-p1 text-darkGray">
          ({info?.orders?.length} سفارشات)
        </p>
        <Avatar orders={info?.orders} />
      </div>

      <div className="border-t pt-2">
        <p className="text-p1 font-bold mb-2">توضیحات :</p>
        <p className="text-darkGray text-p1">
          {" "}
          {info?.description ? info?.description : "تعریف نشده ..."}
        </p>
      </div>

      <div className="border-t pt-2">
        <p className="text-p1 font-bold mb-2">سیاست بازگشت کالا :</p>
        <p className="text-darkGray text-sm">
          {info?.returnPolicy ? info?.returnPolicy : "تعریف نشده ..."}
        </p>
      </div>

      <div className="border-t pt-2">
        <p className="text-p1 font-bold mb-2">گارانتی کالا :</p>
        <p className="text-darkGray text-sm">
          {info?.warranty ? info?.warranty : "تعریف نشده ..."}
        </p>
      </div>

      <div className="border-t pt-2 mb-2">
        <p className="text-p1 font-bold mb-2">{info?.introduction?.title} :</p>
        <p className="text-darkGray text-sm">
          {info?.introduction?.description}
        </p>
      </div>

      <div className="border-t pt-2">
        <p className="text-[16px] font-bold mb-2">بررسی تخصصی :</p>
        {info?.expertReview.map((review, index) => (
          <div className="border-dashed border-t pt-2 mb-2" key={index}>
            <p className="text-p1 font-bold mb-2">{review?.title} :</p>
            <p className="text-darkGray text-sm">{review?.description}</p>
          </div>
        ))}
      </div>
      <hr />
    </>
  );
}

function Specifications({ info }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <div className="space-y-2 border-t pt-2">
        <p className="text-p1 font-bold">مشخصات فنی :</p>
        <div className="flex items-center gap-4 flex-wrap">
          {info.specifications
            .flatMap((spec) => spec.items)
            .slice(0, 10)
            .map((item) => (
              <div
                className="bg-white shadow-md dark:bg-dark1 py-2 px-3 rounded-lg w-[150px]"
                key={item._id}
              >
                <p className="text-p1 text-xs font-bold truncate">
                  {item.label}
                </p>
                <p className="text-p1 text-xs my-2 truncate">{item.value}</p>
              </div>
            ))}
          {info?.specifications.flatMap((spec) => spec.items).length > 2 && (
            <div className="mt-4">
              <CustomBtn
                title="نمایش بیشتر"
                onClick={handleDrawerOpen}
                classNames="text-[12px] font-bold"
              />
            </div>
          )}
        </div>
      </div>

      <Drawer
        title={
          <span className="font-bold text-sm text-dark1 dark:text-white">
            مشخصات فنی کامل
          </span>
        }
        placement="bottom"
        onClose={handleDrawerClose}
        open={isDrawerOpen}
        height="50%"
        className="dark:bg-dark1 transition-all duration-300"
      >
        <div className="px-4 pb-6 overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 text-sm font-semibold text-left text-dark1 dark:text-white">
                  ویژگی
                </th>
                <th className="py-2 px-4 text-sm font-semibold text-left text-dark1 dark:text-white">
                  مقدار
                </th>
              </tr>
            </thead>
            <tbody>
              {info.specifications.map((spec) => (
                <React.Fragment key={spec._id}>
                  <tr>
                    <td
                      colSpan="2"
                      className="py-2 px-4 text-lg font-semibold text-dark1 dark:text-white border-b-2 border-red-500"
                    >
                      {spec.title}
                    </td>
                  </tr>
                  {spec.items.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="py-2 px-4 text-sm font-bold text-secondary dark:text-white capitalize">
                        {item.label}
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-700 dark:text-lightGray capitalize break-words">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Drawer>
    </>
  );
}

function CategoryReview({ info }) {
  return (
    <div className="p-4 space-y-6 border-t pt-2">
      <div className="pb-4">
        <p className="text-p1 font-bold mb-2">دسته‌بندی :</p>
        <div className="flex items-center gap-2">
          <p className="text-p1 font-bold bg-white shadow-md dark:bg-dark1 px-2 py-1 w-fit rounded">
            {info?.categoryName || "تعریف نشده"}
          </p>
          <p className="text-p1 font-bold bg-white shadow-md dark:bg-dark1 px-2 py-1 w-fit rounded">
            {info?.slug || "تعریف نشده"}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-p1 font-bold">زیرمجموعه‌ها :</h3>
        {info.subCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {info.subCategories.map((subcategory) => (
              <div
                key={subcategory._id}
                className="p-4 bg-white dark:bg-dark1 rounded-lg shadow-md flex flex-col justify-between"
              >
                <div className="mb-2">
                  <h4 className="text-sm font-bold text-darkGray dark:text-lightGray truncate">
                    {subcategory.name || "بدون نام"} :
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {subcategory.slug || "بدون اسلاگ"}
                  </p>
                </div>
                <ul className="mt-2 space-y-1">
                  {subcategory.items.length > 0 ? (
                    subcategory.items.map((item) => (
                      <li
                        key={item._id}
                        className="text-xs text-gray-600 dark:text-gray-400 truncate flex flex-col justify-between gap-"
                      >
                        <span className="font-bold text-gray-700 dark:text-lightGray">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.slug || "بدون اسلاگ"}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-xs text-gray-500">
                      آیتمی تعریف نشده است
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">زیرمجموعه‌ای تعریف نشده است.</p>
        )}
      </div>
    </div>
  );
}

function DeliveryOptionReview({ info }) {
  return (
    <div className="space-y-6 border-t pt-3">
      <p className="text-p1 font-bold">گزینه‌های تحویل :</p>

      <div className="flex flex-wrap items-center justify-center md:justify-between gap-4">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              info.deliveryOptions.fastDelivery
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {icons.fastDelivery}
          </div>
          <p className="text-sm mt-2 flex items-center gap-2 bg-white shadow-md dark:bg-dark1 px-2 py-1 rounded">
            تحویل سریع:{" "}
            <span className="font-bold inline-flex items-center">
              {info.deliveryOptions.fastDelivery ? icons.check : icons.cross}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              info.deliveryOptions.shippingToday
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {icons.shippingDelivery}
          </div>
          <p className="text-sm mt-2 flex items-center gap-2 bg-white shadow-md dark:bg-dark1 px-2 py-1 rounded">
            تحویل امروز:{" "}
            <span className="font-bold inline-flex items-center">
              {info.deliveryOptions.shippingToday ? icons.check : icons.cross}
            </span>
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              info.deliveryOptions.freeDelivery
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {icons.freeDelivery}
          </div>
          <p className="text-sm mt-2 flex items-center gap-2 bg-white shadow-md dark:bg-dark1 px-2 py-1 rounded">
            تحویل رایگان:{" "}
            <span className="font-bold inline-flex items-center">
              {info.deliveryOptions.freeDelivery ? icons.check : icons.cross}
            </span>
          </p>
        </div>
      </div>

      <div className="border rounded-md px-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-[16px] inline-flex items-center gap-3">
            {icons.motorDelivery} تحویل توسط پیک :
          </span>
          <span className="font-bold text-p1">
            {info.deliveryOptions.courierService || "تعریف نشده"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2 border-t pt-2">
          <span className="text-[16px] inline-flex items-center gap-3">
            {icons.cost} هزینه ارسال :
          </span>
          <span className="font-bold text-p1">
            {sp(info.deliveryOptions.deliveryFee)} تومان
          </span>
        </div>
        {info.deliveryOptions.deliveryNotes && (
          <div className="flex justify-between items-center flex-wrap mt-2 border-t pt-2">
            <span className="text-[16px] inline-flex items-center gap-3 mb-3 md:mb-0">
              {icons.note} یادداشت :
            </span>
            <p className="font-bold text-p1">
              {info.deliveryOptions.deliveryNotes}
            </p>
          </div>
        )}
      </div>

      <div>
        <p className="text-p1 font-bold mb-2">زمان‌های تحویل:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-fit">
          {info.deliveryOptions.estimatedDeliveryTime.map((time, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark1 px-2 py-1 rounded-md shadow-md"
            >
              <span className="font-bold  block mb-1">{time.day} :</span>
              {time.timeSlots.map((slot, slotIndex) => (
                <span
                  key={slotIndex}
                  className="bg-red-500 text-xs px-2 py-1 rounded-md block font-bold text-white text-center w-fit"
                >
                  {e2p(slot.startTime)} - {e2p(slot.endTime)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Insurance({ info }) {
  return (
    <div className="border-t pt-3">
      <p className="text-p1 font-bold mb-4">اطلاعات بیمه:</p>
      {info.insurance ? (
        <div className="space-y-4">
          <div className="border rounded-md px-4 py-2">
            <div className="flex justify-between items-center">
              <span className="text-[16px]">نوع بیمه :</span>
              <span className="font-bold text-p1">
                {info.insurance.insuranceType || "تعریف نشده"}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 border-t pt-2">
              <span className="text-[16px]">مدت بیمه :</span>
              <span className="font-bold text-p1">
                {info.insurance.insuranceDuration
                  ? `${e2p(info.insurance.insuranceDuration)} ماه`
                  : "تعریف نشده"}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 border-t pt-2">
              <span className="text-[16px]">هزینه بیمه :</span>
              <span className="font-bold text-p1">
                {info.insurance.insuranceCost
                  ? `${sp(info.insurance.insuranceCost)} تومان`
                  : "تعریف نشده"}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 border-t pt-2">
              <span className="text-[16px]">بیمه اختیاری :</span>
              <span className="font-bold text-p1">
                {info.insurance.optionalInsurance ? "بله" : "خیر"}
              </span>
            </div>
          </div>
          <p className="text-p1 font-bold mb-4">شرایط بیمه:</p>
          <p className="text-sm  mt-2 ">
            {info.insurance.insuranceTerms || "تعریف نشده"}
          </p>
        </div>
      ) : (
        <p className="text-darkGray">
          بیمه‌ای تعریف نشده است
        </p>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import moment from "moment-jalaali";
import "swiper/swiper-bundle.css";

import { images } from "@/constants";

export default function ContentSlider({ items, linkPrefix, imagesDefault }) {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] border rounded-lg shadow-md p-4 text-center w-full">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={images.itemsNotFound}
            alt="هیچ آیتمی یافت نشد"
            width={200}
            height={200}
          />
          <p className="text-gray-500 text-lg font-medium">
            هیچ آیتمی برای نمایش وجود ندارد!
          </p>
        </div>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{
        clickable: true,
        renderBullet: (index, className) =>
          `<span class="${className} custom-pagination-bullet"></span>`,
      }}
      spaceBetween={20}
      slidesPerView={items.length < 2 ? items.length : 1}
      breakpoints={{
        768: {
          slidesPerView: items.length < 2 ? items.length : 2,
        },
        1024: {
          slidesPerView: items.length < 3 ? items.length : 3,
        },
      }}
      className="rounded-lg overflow-hidden relative"
    >
      {items.map((item) => (
        <SwiperSlide key={item._id} className="p-2">
          <div className="flex flex-col items-center gap-4 border rounded-lg p-4 shadow-md mb-10">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-[200px] rounded-lg overflow-hidden relative"
              breakpoints={{
                0: {
                  navigation: false,
                },
                768: {
                  navigation: false,
                },
                1024: {
                  navigation: true,
                },
              }}
            >
              {item.images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={image || images.imageNotFound}
                    alt={`تصویر ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-contain mx-auto rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex flex-col items-center gap-2">
              {item.price && (
                <p className="text-lg font-medium">{item?.price} تومان</p>
              )}
              <p className="text-sm text-gray-500">
                {moment(item.createdAt).locale("fa").format("jYYYY/jMM/jDD")}
              </p>
              <Link
                href={`${linkPrefix}/${item._id}`}
                className="text-blue-500 hover:text-white bg-blue-100 px-3 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
              >
                مشاهده جزئیات
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

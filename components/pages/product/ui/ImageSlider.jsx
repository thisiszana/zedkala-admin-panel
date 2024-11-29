"use client";

import NextImage from "next/image";
import { Image } from "@nextui-org/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { icons } from "@/constants";

const ImageSlider = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full xl:w-[40%] h-[350px] flex justify-center items-center  space-y-5 box ml-5 rounded-lg shadow-md text-gray-500 border">
        <span className="text-[200px] ">{icons.imageNotFound}</span>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-[40%] mx-auto ml-5 space-y-5">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className}"></span>`,
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-full h-[350px] flex items-center justify-center dark:bg-dark1 border rounded-md cardShadow3">
              <Image
                as={NextImage}
                src={image}
                alt={`تصویر ${index + 1}`}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;

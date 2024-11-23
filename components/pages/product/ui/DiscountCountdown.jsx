"use client";

import { e2p } from "@/utils/fun";
import { useEffect, useState } from "react";

export default function DiscountCountdown({ discount }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (!discount?.expiresAt) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date(discount.expiresAt);
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [discount?.expiresAt]);

  if (!discount) return null;

  return (
    <div className="discount-container p-4 bg-red-100 border border-red-400 rounded-lg text-center">
      <h3 className="text-lg font-bold text-red-600 mb-2">
        {discount.title || "تخفیف ویژه!"}
      </h3>
      <p className="text-sm text-gray-700">
        مقدار تخفیف:{" "}
        <span className="font-semibold">{e2p(discount.value)}%</span>
      </p>
      <p className="text-sm text-gray-700">
        تاریخ انقضا:{" "}
        <span className="font-semibold">
          {discount.expiresAt
            ? new Date(discount.expiresAt).toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "بدون تاریخ انقضا"}
        </span>
      </p>
      {discount.expiresAt && timeLeft ? (
        <div className="time-left text-red-700 mt-2">
          <p className="text-sm">زمان باقی‌مانده:</p>
          <div className="flex justify-center gap-2 mt-1 text-sm font-medium">
            <span className="px-2 py-1 bg-red-200 rounded">
              {e2p(timeLeft.days)} روز
            </span>
            <span className="px-2 py-1 bg-red-200 rounded">
              {e2p(timeLeft.hours)} ساعت
            </span>
            <span className="px-2 py-1 bg-red-200 rounded">
              {e2p(timeLeft.minutes)} دقیقه
            </span>
            <span className="px-2 py-1 bg-red-200 rounded">
              {e2p(timeLeft.seconds)} ثانیه
            </span>
          </div>
        </div>
      ) : discount.expiresAt ? (
        <p className="text-red-700 mt-2">تخفیف به اتمام رسید!</p>
      ) : null}
    </div>
  );
}

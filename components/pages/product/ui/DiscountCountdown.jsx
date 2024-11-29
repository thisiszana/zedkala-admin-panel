"use client";

import { useEffect, useState } from "react";
import { Progress } from "antd";
import { e2p, reducePrice, sp } from "@/utils/fun";
import { icons } from "@/constants";

export default function DiscountCountdown({ discount, originalPrice }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [isExpired, setIsExpired] = useState(false); 

  if (
    !discount ||
    typeof discount !== "object" ||
    discount.value <= 0 ||
    !discount.title?.trim() ||
    !discount.expiresAt ||
    !discount.startAt
  ) {
    return null;
  }

  useEffect(() => {
    const startTime = new Date(discount.startAt).getTime();
    const targetTime = new Date(discount.expiresAt).getTime();
    const totalTime = targetTime - startTime;

    const calculateTimeLeftAndProgress = () => {
      const now = Date.now();

      if (now < startTime) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgressBarWidth(0);
        setIsExpired(false); 
        return;
      }

      if (now >= targetTime) {
        setTimeLeft(null);
        setProgressBarWidth(100);
        setIsExpired(true); 
        return;
      }

      const remainingTime = targetTime - now;
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
      const elapsedTime = now - startTime;
      const progress = Math.floor((elapsedTime / totalTime) * 100);
      setProgressBarWidth(progress);
    };

    calculateTimeLeftAndProgress();
    const timer = setInterval(calculateTimeLeftAndProgress, 1000);

    return () => clearInterval(timer);
  }, [discount.startAt, discount.expiresAt]);

  if (isExpired) {
    return (
      <div className="w-full bg-[#fdecf0] p-2 rounded-lg border border-red-300 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-red-700 font-extrabold text-lg">{discount.title}</h3>
          <div>
            <span className="text-green-600 font-bold text-lg">
            {sp(originalPrice)} تومان
            </span>
          </div>
        </div>
        <div className="text-gray-700 text-sm mb-2">
          <p>تخفیف به پایان رسیده!</p>
          <p>تاریخ پایان تخفیف: {new Date(discount.expiresAt).toLocaleString()}</p>
          <p>تخفیف اعمال شده: {discount.value}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fdecf0] p-2 rounded-lg border border-red-300 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-red-700 font-extrabold text-lg">
          {discount.title}
        </h3>
        <div>
          <span className="text-gray-500 line-through text-sm mx-2">
            {sp(originalPrice)} تومان
          </span>
          <span className="text-green-600 font-bold text-lg">
            {sp(reducePrice(discount.value, originalPrice))} تومان
          </span>
        </div>
      </div>
      {timeLeft && (
        <div className="text-gray-700 text-sm flex items-center mb-1">
          <span className="inline-block ml-4">{icons.timer}</span>
          <p className="font-light">
            {e2p(timeLeft.days)} : {e2p(timeLeft.hours)} : {e2p(timeLeft.minutes)} :{" "}
            {e2p(timeLeft.seconds)}
          </p>
        </div>
      )}
      <Progress
        percent={progressBarWidth}
        size="small"
        strokeColor={timeLeft ? "#e6123d" : "#52c41a"}
        status={timeLeft ? "active" : "exception"}
      />
    </div>
  );
}

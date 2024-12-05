"use client";

import { useEffect, useState } from "react";

import { Progress } from "antd";
import { e2p } from "@/utils/fun";

export default function TaskProgressBar({ dueDate, createdAt }) {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const startTime = new Date(createdAt).getTime();
    const endTime = new Date(dueDate).getTime();
    const totalTime = endTime - startTime;

    if (isNaN(totalTime) || totalTime <= 0) {
      setProgress(100);
      return;
    }

    const calculateProgress = () => {
      const now = Date.now();
      if (now >= endTime) {
        setProgress(100);
        setTimeLeft("مهلت تمام شد");
        return;
      }
      if (now < startTime) {
        setProgress(0);
        setTimeLeft("مهلت هنوز شروع نشده");
        return;
      }

      const elapsed = now - startTime;
      const remaining = endTime - now;

      setProgress(Math.floor((elapsed / totalTime) * 100));
      const remainingDays = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const remainingMinutes = Math.floor((remaining / (1000 * 60)) % 60);
      const remainingSeconds = Math.floor((remaining / 1000) % 60);

      setTimeLeft(
        `${e2p(remainingDays)} : ${e2p(remainingHours)} : ${e2p(
          remainingMinutes
        )} : ${e2p(remainingSeconds)} `
      );
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 1000);

    return () => clearInterval(interval);
  }, [dueDate, createdAt]);

  return (
    <div className="flex flex-col gap-2">
      <Progress
        percent={progress}
        size="small"
        strokeColor={progress < 100 ? "#52c41a" : "#ff4d4f"}
        status={progress < 100 ? "active" : "exception"}
      />
      <p className="text-sm text-gray-600">
        {timeLeft || "محاسبه زمان باقی‌مانده..."}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";

import CustomBtn from "@/components/shared/CustomBtn";
import { DownAngle, UpAngle } from "@/components/icons/Icons";

export default function TaskDescription({ task }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-dark1">{task.title}</p>
      <div
        className={`text-darkGray text-p1 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-[2rem]"
        }`}
        onClick={toggleDescription}
      >
        {task.description}
      </div>
      {task.description.length > 40 && (
        <CustomBtn
          title={isExpanded ? <UpAngle /> : <DownAngle />}
          classNames="text-dark2 mt-1 text-sm flex items-center justify-center"
          onClick={toggleDescription}
        />
      )}
    </div>
  );
}

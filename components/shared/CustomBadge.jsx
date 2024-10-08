import React from "react";

export default function CustomBadge({ condition, title, colors }) {
  return (
    <p
      className={`py-1 px-2 text-p2 rounded-btn w-fit h-fit ${
        colors
          ? colors
          : condition === false
          ? "text-darkOrange bg-lightOrange"
          : "text-darkGreen bg-lightGreen"
      }`}
    >
      {title}
    </p>
  );
}

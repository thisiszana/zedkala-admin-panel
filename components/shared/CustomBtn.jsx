"use client";

import Loader from "./Loader";

export default function CustomBtn({
  type,
  classNames,
  isLoading,
  disabled,
  title,
  icon,
  onClick,
}) {
  const bassClassNames = `rounded-lg px-[20px] h-[40px] Transition flex items-center gap-2 ${
    isLoading ? "bg-gray-200" : "bg-baseDark text-white"
  }`;
  return (
    <button
      type={type || "button"}
      className={classNames ? classNames : bassClassNames}
      disabled={disabled}
      onClick={onClick || null}
    >
      {isLoading ? (
        <Loader width={15} height={15} />
      ) : (
        <>
          {icon && icon}
          {title && title}
        </>
      )}
    </button>
  );
}

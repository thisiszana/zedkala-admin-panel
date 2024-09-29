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
  const baseClassNames = ``;
  return (
    <button
      className={classNames ? classNames : baseClassNames}
      onClick={onClick || null}
      disabled={disabled}
      title={title || "ذخیره"}
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

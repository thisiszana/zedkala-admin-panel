"use client";

import { EyeClosed, EyeOpen } from "@/components/icons/Icons";
import { useEffect, useState } from "react";

export default function CustomInp({
  type,
  name,
  value,
  onChange,
  label,
  wrapperClassName,
  min,
  max,
  readOnly,
  disabled,
}) {
  const [active, setActive] = useState(false);
  const [inpType, setInpType] = useState(type || "text");

  const onFocus = () => {
    setActive(true);
  };

  const onBlur = () => {
    if (value?.length === 0) setActive(false);
  };

  useEffect(() => {
    if (value?.length !== 0) setActive(true);
  }, [value]);

  return (
    <div className={`input-group ${wrapperClassName && wrapperClassName}`}>
      <input
        type={inpType}
        name={name || label}
        value={value}
        onChange={onChange}
        min={min || min}
        max={max || max}
        readOnly={readOnly}
        disabled={disabled}
        className="input w-full"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {label && (
        <label className={`user-label ${active && "active"}`}>{label}</label>
      )}
      {type === "password" && (
        <div
          className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2"
          onClick={() =>
            setInpType(inpType === "password" ? "text" : "password")
          }
        >
          {inpType === "password" ? <EyeClosed /> : <EyeOpen />}
        </div>
      )}
    </div>
  );
}

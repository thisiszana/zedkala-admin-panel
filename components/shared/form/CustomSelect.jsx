"use client";

import { useEffect, useState } from "react";

export default function CustomSelect({
  name,
  label,
  value,
  onChange,
  wrapperClassName,
  options,
}) {
  const [active, setActive] = useState(false);

  const onFocus = () => {
    setActive(() => true);
  };

  const onBlur = () => {
    if (value?.length === 0) {
      setActive(() => false);
    }
  };

  useEffect(() => {
    if (value?.length !== 0) {
      setActive(() => true);
    }
  }, []);
  return (
    <div className={`input-group ${wrapperClassName && wrapperClassName}`}>
      <select
        name={name}
        // defaultValue=""
        className="input w-full"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {label && (
        <label className={`user-label ${active && "active"}`}>{label}</label>
      )}
    </div>
  );
}

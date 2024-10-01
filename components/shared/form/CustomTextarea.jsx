"use client";

import { useEffect, useState } from "react";

const CustomTextarea = ({ name, label, value, onChange, wrapperClassName }) => {
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
      <textarea
        rows={5}
        name={name || "textarea"}
        value={value}
        onChange={onChange}
        className="input w-full dark:text-white"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {label && (
        <label className={`user-label ${active && "active"} `}>{label}</label>
      )}
    </div>
  );
};

export default CustomTextarea;

"use client";

import { useEffect, useState } from "react";

import { Select } from "antd";
const { Option } = Select;

export default function CustomSelect({
  name,
  label,
  value,
  onChange,
  wrapperClassName = "",
  options = [],
  placeholder = "انتخاب کنید",
  allowClear = true,
  mode = null,
}) {
  const [active, setActive] = useState(false);

  const onFocus = () => setActive(true);
  const onBlur = () => {
    if (!value || value?.length === 0) setActive(false);
  };

  useEffect(() => {
    if (value && value?.length !== 0) setActive(true);
  }, [value]);

  return (
    <div className={`my-4 w-full ${wrapperClassName}`}>
      {label && (
        <label className={`block text-gray-700 mb-2`}>
          {label}
        </label>
      )}
      <Select
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        mode={mode}
        placeholder={placeholder}
        allowClear={allowClear}
        className="w-full h-[56px]"
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
}

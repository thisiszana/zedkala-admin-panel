"use client";

import InputIcon from "react-multi-date-picker/components/input_icon";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";

export default function CustomDatePicker({ label, value, onChange }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <label className="text-gray-600 text-[14px] dark:text-white">
        {label || "تاریخ"}
      </label>
      <DatePicker
        inputClass="focus:outline-none w-full text-gray-700 bg-white text-dark2"
        calendar={persian}
        locale={persian_fa}
        format="MM/DD/YYYY HH:mm:ss"
        plugins={[<TimePicker position="bottom" />]}
        render={<InputIcon />}
        animations={[transition({ duration: 800, from: 35 })]}
        value={value}
        onChange={onChange}
        calendarPosition="bottom-right"
      />
    </div>
  );
}

"use client";

import InputIcon from "react-multi-date-picker/components/input_icon";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";

export default function CustomDataPicker({ form, setForm }) {
  const handleDateChange = (field, value) => {
    const date = new Date(value);
    setForm({
      ...form,
      discount: { ...form.discount, [field]: date },
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 flex-1 dark:bg-dark1">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="text-gray-600 text-[14px] dark:text-white">
          تاریخ شروع تخفیف
        </label>
        <DatePicker
          inputClass="focus:outline-none w-full text-gray-700 bg-white text-dark2"
          calendar={persian}
          locale={persian_fa}
          format="MM/DD/YYYY HH:mm:ss"
          plugins={[<TimePicker position="bottom" />]}
          render={<InputIcon />}
          animations={[transition({ duration: 800, from: 35 })]}
          value={form.discount?.startAt}
          onChange={(value) => handleDateChange("startAt", value)}
          calendarPosition="bottom-right"
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <label className="text-gray-600 text-[14px] dark:text-white">
          تاریخ انقضای تخفیف
        </label>
        <DatePicker
          inputClass="focus:outline-none w-full text-gray-700 bg-white text-dark2"
          calendar={persian}
          locale={persian_fa}
          format="MM/DD/YYYY HH:mm:ss"
          plugins={[<TimePicker position="bottom" />]}
          render={<InputIcon />}
          animations={[transition({ duration: 800, from: 35 })]}
          value={form.discount?.expiresAt}
          onChange={(value) => handleDateChange("expiresAt", value)}
          calendarPosition="bottom-right"
        />
      </div>
    </div>
  );
}

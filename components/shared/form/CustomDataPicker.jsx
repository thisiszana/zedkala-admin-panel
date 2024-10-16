"use client";

import InputIcon from "react-multi-date-picker/components/input_icon";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";

export default function CustomDataPicker({ form, setForm }) {
  const onChange = (e) => {
    const date = new Date(e);
    setForm({
      ...form,
      discount: [{ ...form.discount[0], expiresAt: date }],
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-600 text-[14px] dark:text-white">
        تاریخ انقضای تخفیف
      </label>
      <div className="border border-gray-300 rounded-md p-[8px] h-[40px] flex items-center justify-center focus-within:border-[#304ffe] bg-white">
        <DatePicker
          inputClass="focus:outline-none w-full text-gray-700 bg-transparent"
          calendar={persian}
          locale={persian_fa}
          format="MM/DD/YYYY HH:mm:ss"
          plugins={[<TimePicker position="bottom" />]}
          render={<InputIcon />}
          animations={[transition({ duration: 800, from: 35 })]}
          value={form.discount[0]?.expiresAt}
          onChange={onChange}
          calendarPosition="bottom-right"
        />
      </div>
    </div>
  );
}

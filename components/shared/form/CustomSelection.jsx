"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import CustomInp from "./CustomInp";
import CustomBtn from "../CustomBtn";
import { CircleClose, Trash } from "@/components/icons/Icons";
import { MESSAGES } from "@/utils/message";

export default function CustomSelection({ form, setForm }) {
  const [keywords, setKeywords] = useState(form.subCategories);
  const [value, setValue] = useState("");

  const onClick = (e) => {
    e.preventDefault();

    if (!value) toast.error(MESSAGES.fillInp);

    if (keywords.find((item) => item === value)) toast.error(MESSAGES.sameKey);

    setKeywords([...keywords, value]);
    setValue("");
    toast.success(MESSAGES.addKeywords);
  };

  useEffect(() => {
    setForm({
      ...form,
      subCategories: keywords,
    });
  }, [keywords]);

  const removeKeyword = (key) =>
    setKeywords(keywords.filter((item) => item !== key));

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <CustomInp
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="کلمه‌های مورد نظر رو وارد کنید"
        />
        <CustomBtn
          type="button"
          title="افزودن کلمه جدید"
          onClick={onClick}
          classNames="w-fit p-btn bg-lightGray rounded-btn dark:text-dark1"
        />
      </div>
      {keywords.length !== 0 && (
        <div className="flex gap-2 items-center flex-wrap mt-3">
          {keywords.map((key) => (
            <CustomBtn
              key={key}
              type="button"
              onClick={() => removeKeyword(key)}
              classNames="rounded-btn flex items-center gap-btn bg-dark1 hover:bg-dark2 Transition py-[2.5px] px-1.5 group"
              title={
                <>
                  <CircleClose
                    size={18}
                    className="text-darkGray group-hover:text-lightGray Transition"
                  />
                  <span className="text-lightGray text-p2">{key}</span>
                </>
              }
            />
          ))}
          <CustomBtn
            type="button"
            onClick={() => setKeywords([])}
            classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
            title={<p className="text-p1 font-bold">حذف همه</p>}
            icon={<Trash />}
          />
        </div>
      )}
    </div>
  );
}

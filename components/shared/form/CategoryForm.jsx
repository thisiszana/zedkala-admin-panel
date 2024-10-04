"use client";

import { useState } from "react";
import DetailedBox from "../DetailedBox";
import CustomInp from "./CustomInp";
import UploadedImage from "./UploadedImage";
import CustomSelection from "./CustomSelection";
import CustomBtn from "../CustomBtn";
import { Switch } from "antd";

export default function CategoryForm({ type, form, setForm, onChange }) {
  const [loading, setLoading] = useState(false);

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="categoryName"
        label="عنوان دسته بندی *"
        value={form.categoryName}
        onChange={onChange}
      />
      <UploadedImage form={form} setForm={setForm} />
      <CustomSelection form={form} setForm={setForm} />
    </div>
  );

  console.log(form)

  const handleSubmit = (e) => {};
  return (
    <div className="space-y-8">
      <DetailedBox
        title="عنوان دسته بندی"
        subtitle="عنوان و عکس"
        content={basicDetails}
      />
      <div className="flex items-center justify-end gap-10 space-x-8">
        <div className="flex items-center gap-2">
          <Switch
            id="publish"
            defaultChecked
            onChange={(checked) => {
              setForm({ ...form, published: checked });
            }}
            value={form.published}
            name="published"
          />
          <label htmlFor="publish" className="text-p1 ">
            منتشر شود؟
          </label>
        </div>

        <CustomBtn
          classNames={`${
            loading ? "bg-lightGray" : "bg-dark1 text-white dark:bg-white dark:text-dark1"
          } flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold`}
          type="button"
          disabled={loading}
          isLoading={loading}
          onClick={handleSubmit}
          title={"ایجاد دسته بندی"}
        />
      </div>
    </div>
  );
}

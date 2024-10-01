"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import CustomTextarea from "./CustomTextarea";
import DetailedBox from "../DetailedBox";
import CustomInp from "./CustomInp";
import UploadedImage from "./UploadedImage";

export default function ProductForm({ type, form, setForm, onChange }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="title"
        label="عنوان *"
        value={form.title}
        onChange={onChange}
      />
      <CustomTextarea
        type="text"
        name="description"
        label="توضیحات"
        value={form.description}
        onChange={onChange}
      />
      <UploadedImage form={form} setForm={setForm} />
    </div>
  );

  const properties = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="number"
        name="price"
        label="قیمت *"
        value={form.price}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CustomInp
        type="number"
        name="stock"
        label="موجودی *"
        value={form.stock}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <DetailedBox
        title="جزئیات اولیه"
        subtitle="عنوان، توضیحات، تصویر"
        content={basicDetails}
      />
      <DetailedBox
        title="ویژگی ها"
        subtitle="قیمت، موجودی، تخفیف، ..."
        content={properties}
      />
    </div>
  );
}

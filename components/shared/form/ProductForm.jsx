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

  return (
    <div className="space-y-8">
      <DetailedBox
        title="جزئیات اولیه"
        subtitle="عنوان، توضیحات، تصویر"
        content={basicDetails}
      />
    </div>
  );
}

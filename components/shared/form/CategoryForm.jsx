"use client";

import { useState } from "react";
import DetailedBox from "../DetailedBox";
import CustomInp from "./CustomInp";
import UploadedImage from "./UploadedImage";
import CustomSelection from "./CustomSelection";
import CustomBtn from "../CustomBtn";
import { Switch } from "antd";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/fun";
import { createCategory } from "@/actions/category.action";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/utils/message";

export default function CategoryForm({ type, form, setForm, onChange }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryName || !form.image) toast.error(MESSAGES.fillInp);

    setLoading(true);

    const uploadResult = await uploadImage(form.image[0]);

    const payload = {
      ...form,
      image: uploadResult.imageUrl,
    };

    let res;
    res = await createCategory(payload);

    setLoading(false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      router.push("/categories");
    } else {
      toast.error(res.message);
    }
  };
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
            loading
              ? "bg-lightGray"
              : "bg-dark1 text-white dark:bg-white dark:text-dark1"
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

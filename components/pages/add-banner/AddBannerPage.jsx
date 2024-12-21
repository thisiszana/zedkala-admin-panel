"use client";

import { useState } from "react";

import CustomDatePicker from "@/components/shared/CustomDatePicker";
import UploadedImage from "@/components/shared/form/UploadedImage";
import DetailedBox from "@/components/shared/DetailedBox";
import { uploadImages } from "@/utils/fun";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomSwitch from "@/components/shared/form/CustomSwitch";
import { createBanner } from "@/actions/banner.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddBannerPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    images: [],
    time: {},
    published: false,
    order: 0,
  });

  const router = useRouter();

  const handleDateChange = (value, dateType) => {
    const date = new Date(value);

    setForm((prevForm) => ({
      ...prevForm,
      time: {
        ...prevForm.time,
        [dateType]: date,
      },
    }));
  };
  console.log(form);
  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="title"
        label="عنوان *"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <UploadedImage form={form} setForm={setForm} />
      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        <CustomInp
          type="number"
          name="order"
          label="ترتیب نمایش"
          value={form.order}
          onChange={(e) =>
            setForm((prevForm) => ({
              ...prevForm,
              order: Number(e.target.value),
            }))
          }
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        />
        <CustomDatePicker
          label="تاریخ شروع"
          value={form.time?.startAt}
          onChange={(value) => handleDateChange(value, "startAt")}
        />
        <CustomDatePicker
          label="تاریخ پایان"
          value={form.time?.expiresAt}
          onChange={(value) => handleDateChange(value, "expiresAt")}
        />
      </div>
    </div>
  );

  const handleSubmit = async () => {
    setLoading(() => true);

    const uploadedImages = await uploadImages(form.images);

    const payload = {
      ...form,
      images: uploadedImages,
    };

    const res = await createBanner(payload);

    setLoading(() => false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      // router.push("/banner");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-8">
      <DetailedBox
        title="جزئیات اولیه"
        subtitle="تصویر و تاریخ مناسبت"
        content={basicDetails}
      />
      <div className="flex items-center justify-end gap-10 space-x-8">
        <div className="flex items-center gap-2">
          <CustomSwitch
            id="publish"
            label="منتشر شود؟"
            checked={form.published}
            onChange={(checked) => {
              setForm((prevForm) => ({ ...prevForm, published: checked }));
            }}
            name="published"
          />
        </div>
        <CustomBtn
          classNames={`${
            loading ? "bg-lightGray" : "bg-dark1 text-white"
          } flex items-center justify-center w-[150px] dark:bg-lightGray dark:text-dark1 h-[50px] rounded-btn text-p1 font-bold`}
          type="button"
          disabled={loading}
          isLoading={loading}
          onClick={handleSubmit}
          title={"ایجاد محصول"}
        />
      </div>
    </div>
  );
}

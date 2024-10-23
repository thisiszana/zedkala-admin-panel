"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CategorySelection from "./CategorySelection";
import CustomDataPicker from "./CustomDataPicker";
import CustomTextarea from "./CustomTextarea";
import Specifications from "./Specifications";
import UploadedImage from "./UploadedImage";
import DetailedBox from "../DetailedBox";
import CustomInp from "./CustomInp";
import KeywordsSelection from "./KeywordsSelection";
import { Switch } from "antd";
import CustomBtn from "../CustomBtn";
import toast from "react-hot-toast";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import { createProduct } from "@/actions/product.action";

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
        min={0}
        value={form.price}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CustomInp
        type="number"
        name="stock"
        label="موجودی *"
        min={0}
        value={form.stock}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CategorySelection form={form} onChange={onChange} />
      <div className="flex flex-wrap gap-box w-full h-full">
        <CustomInp
          type="number"
          name="discountValue"
          label="مقدار‌تخفیف"
          min={0}
          value={form.discount[0]?.value}
          onChange={(e) =>
            setForm({
              ...form,
              discount: [{ ...form.discount[0], value: e.target.value }],
            })
          }
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        />

        <CustomInp
          type="text"
          name="discountTitle"
          label="عنوان‌تخفیف"
          value={form.discount[0]?.title || ""}
          onChange={(e) =>
            setForm({
              ...form,
              discount: [{ ...form.discount[0], title: e.target.value }],
            })
          }
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        />
        <CustomDataPicker form={form} setForm={setForm} />
      </div>
      <CustomInp
        type="text"
        name="brand"
        label="نام تجاری *"
        value={form.brand}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
    </div>
  );

  const insuranceDetails = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <div className="flex flex-wrap gap-box">
        <CustomInp
          type="text"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          name="insuranceType"
          label="نوع بیمه"
          value={form.insurance[0]?.insuranceType || ""}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: [
                { ...form.insurance[0], insuranceType: e.target.value },
              ],
            })
          }
        />
        <CustomInp
          type="number"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          name="insuranceDuration"
          label="مدت بیمه (ماه)"
          value={form.insurance[0]?.insuranceDuration}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: [
                { ...form.insurance[0], insuranceDuration: e.target.value },
              ],
            })
          }
        />
        <CustomInp
          type="number"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          name="insuranceCost"
          label="هزینه بیمه"
          value={form.insurance[0]?.insuranceCost}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: [
                { ...form.insurance[0], insuranceCost: e.target.value },
              ],
            })
          }
        />
      </div>
      <CustomTextarea
        name="insuranceTerms"
        wrapperClassName="w-full h-full"
        label="شرایط بیمه"
        value={form.insurance[0]?.insuranceTerms || ""}
        onChange={(e) =>
          setForm({
            ...form,
            insurance: [
              { ...form.insurance[0], insuranceTerms: e.target.value },
            ],
          })
        }
      />
      <div className="flex flex-col gap-box w-full">
        <label className="font-semibold">نوع بیمه:</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="insuranceOption"
              checked={form.insurance[0]?.mandatoryInsurance || false}
              onChange={() =>
                setForm({
                  ...form,
                  insurance: [
                    {
                      ...form.insurance[0],
                      mandatoryInsurance: true,
                      optionalInsurance: false,
                    },
                  ],
                })
              }
            />
            بیمه اجباری
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="insuranceOption"
              checked={form.insurance[0]?.optionalInsurance || false}
              onChange={() =>
                setForm({
                  ...form,
                  insurance: [
                    {
                      ...form.insurance[0],
                      optionalInsurance: true,
                      mandatoryInsurance: false,
                    },
                  ],
                })
              }
            />
            بیمه اختیاری
          </label>
        </div>
      </div>
    </div>
  );

  const uploadImages = async (images) => {
    const uploadedImages = await Promise.all(
      images?.map(async (image) => {
        const uploadRes = await uploadImage(image);
        return uploadRes.imageUrl;
      })
    );
    return uploadedImages;
  };

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.images ||
      !form.price ||
      !form.stock ||
      !form.categoryName ||
      !form.subCategories ||
      !form.brand ||
      form.keywords.length === 0
    )
      return toast.error(MESSAGES.fields);
    console.log(form);
    setLoading(() => true);

    const uploadedImages = await uploadImages(form.image);

    const payload = {
      ...form,
      images: uploadedImages,
    };

    let res;
    res = await createProduct(JSON.parse(JSON.stringify(payload)));

    setLoading(() => false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      router.push("/products");
    } else {
      toast.error(res.message);
    }
  };

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
      <DetailedBox
        title="مشخصات"
        subtitle="مشخصات را اضافه یا حذف کنید"
        content={<Specifications form={form} setForm={setForm} />}
      />
      <DetailedBox
        title="بیمه"
        subtitle="جزئیات بیمه محصول"
        content={insuranceDetails}
      />
      <DetailedBox
        title="گارانتی"
        subtitle="مشخصات گارانتی"
        content={
          <div className="flex flex-col gap-box w-full h-full">
            <CustomInp
              type="text"
              name="warranty"
              label="گارانتی"
              value={form.warranty}
              onChange={onChange}
            />
          </div>
        }
      />
      <DetailedBox
        title="سیاست بازگشت"
        subtitle="سیاست بازگشت کالا را مشخص کنید"
        content={
          <div className="flex flex-col gap-box w-full h-full">
            <CustomTextarea
              name="returnPolicy"
              label="سیاست بازگشت"
              value={form.returnPolicy || ""}
              onChange={onChange}
            />
          </div>
        }
      />
      <DetailedBox
        title="کلمات‌کلیدی"
        content={
          <div className="w-full h-full">
            <KeywordsSelection form={form} setForm={setForm} />
          </div>
        }
      />
      <div className="flex items-center justify-start gap-10">
        <div className="flex items-center gap-2">
          <Switch
            id="publish"
            defaultChecked
            value={form.published}
            name="published"
            onChange={(checked) => {
              setForm({ ...form, published: checked });
            }}
          />
          <label htmlFor="publish" className="text-p1">
            منتشر شود؟
          </label>
        </div>
        <CustomBtn
          classNames={`${
            loading ? "bg-lightGray" : "bg-dark1 text-white"
          } flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold`}
          type="button"
          disabled={loading}
          isLoading={loading}
          onClick={handleSubmit}
          title="ایجاد محصول"
        />
      </div>
    </div>
  );
}

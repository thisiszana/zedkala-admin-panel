"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import toast from "react-hot-toast";
import { Switch } from "antd";

import { createProduct, editProduct } from "@/actions/product.action";
import CategoryTreeSelection from "./CategoryTreeSelection";
import KeywordsSelection from "./KeywordsSelection";
import CustomDataPicker from "./CustomDataPicker";
import CustomTextarea from "./CustomTextarea";
import Specifications from "./Specifications";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import DetailedBox from "../DetailedBox";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";

export default function ProductForm({
  type,
  form,
  setForm,
  onChange,
  editImage,
  id,
}) {
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
      <UploadedImage form={form} setForm={setForm} editImage={editImage} />
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
      <div className="flex flex-col gap-box w-full h-full">
        <div className="flex flex-wrap gap-box w-full h-full">
          <CustomInp
            type="number"
            name="discountValue"
            label="مقدار‌تخفیف"
            min={0}
            value={form.discount?.value}
            onChange={(e) =>
              setForm({
                ...form,
                discount: { ...form.discount, value: e.target.value },
              })
            }
            wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          />

          <CustomInp
            type="text"
            name="discountTitle"
            label="عنوان‌تخفیف"
            value={form.discount?.title || ""}
            onChange={(e) =>
              setForm({
                ...form,
                discount: { ...form.discount, title: e.target.value },
              })
            }
            wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          />
        </div>
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
          value={form.insurance?.insuranceType || ""}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: { ...form.insurance, insuranceType: e.target.value },
            })
          }
        />
        <CustomInp
          type="number"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          name="insuranceDuration"
          label="مدت بیمه (ماه)"
          value={form.insurance?.insuranceDuration}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: {
                ...form.insurance,
                insuranceDuration: e.target.value,
              },
            })
          }
        />
        <CustomInp
          type="number"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
          name="insuranceCost"
          label="هزینه بیمه"
          value={form.insurance?.insuranceCost}
          onChange={(e) =>
            setForm({
              ...form,
              insurance: { ...form.insurance, insuranceCost: e.target.value },
            })
          }
        />
      </div>
      <CustomTextarea
        name="insuranceTerms"
        wrapperClassName="w-full h-full"
        label="شرایط بیمه"
        value={form.insurance?.insuranceTerms || ""}
        onChange={(e) =>
          setForm({
            ...form,
            insurance: { ...form.insurance, insuranceTerms: e.target.value },
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
              checked={form.insurance?.mandatoryInsurance || false}
              onChange={() =>
                setForm({
                  ...form,
                  insurance: {
                    ...form.insurance,
                    mandatoryInsurance: true,
                    optionalInsurance: false,
                  },
                })
              }
            />
            بیمه اجباری
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="insuranceOption"
              checked={form.insurance?.optionalInsurance || false}
              onChange={() =>
                setForm({
                  ...form,
                  insurance: {
                    ...form.insurance,
                    optionalInsurance: true,
                    mandatoryInsurance: false,
                  },
                })
              }
            />
            بیمه اختیاری
          </label>
        </div>
      </div>
    </div>
  );

  const deliveryDetails = (
    <div className="flex items-center gap-box w-full h-[40px]">
      <CustomInp
        type="checkbox"
        name="fastDelivery"
        label="تحویل سریع"
        checked={form.deliveryOptions?.fastDelivery || false}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            deliveryOptions: {
              ...prev.deliveryOptions,
              fastDelivery: e.target.checked,
            },
          }))
        }
        wrapperClassName="flex items-center w-full"
      />

      <CustomInp
        type="checkbox"
        name="freeDelivery"
        label="تحویل رایگان"
        checked={form.deliveryOptions?.freeDelivery || false}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            deliveryOptions: {
              ...prev.deliveryOptions,
              freeDelivery: e.target.checked,
            },
          }))
        }
        wrapperClassName="flex items-center w-full"
      />
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
      !form.price ||
      !form.stock ||
      !form.categoryName ||
      !form.subCategories ||
      !form.brand ||
      form.keywords.length === 0
    )
      return toast.error(MESSAGES.fields);
    setLoading(() => true);

    const uploadedImages = await uploadImages(form.images);

    const payload = {
      ...form,
      images: uploadedImages,
    };

    let res;
    if (type === "CREATE") {
      res = await createProduct(JSON.parse(JSON.stringify(payload)));
    } else {
      res = await editProduct({ ...payload, id });
    }

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
        title="دسته‌بندی"
        subtitle="دسته‌بندی"
        content={<CategoryTreeSelection form={form} setForm={setForm} />}
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
        title="تنضیمات تحویل"
        subtitle="تنضیمات تحویل سریع و رایگان"
        content={deliveryDetails}
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
      <div className="flex items-center justify-end gap-10 space-x-8">
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
          } flex items-center justify-center w-[150px] dark:bg-lightGray dark:text-dark1 h-[50px] rounded-btn text-p1 font-bold`}
          type="button"
          disabled={loading}
          isLoading={loading}
          onClick={handleSubmit}
          title={type === "CREATE" ? "ایجاد محصول" : "ویرایش محصول"}
        />
      </div>
    </div>
  );
}

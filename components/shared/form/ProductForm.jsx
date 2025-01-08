"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import toast from "react-hot-toast";

import DeliveryDetails from "@/components/pages/add-product/ui/DeliveryDetails";
import Specifications from "@/components/pages/add-product/ui/Specifications";
import ExpertReview from "@/components/pages/add-product/ui/ExpertReview";
import { createProduct, editProduct } from "@/actions/product.action";
import CategoryTreeSelection from "./CategoryTreeSelection";
import KeywordsSelection from "./KeywordsSelection";
import CustomDataPicker from "./CustomDataPicker";
import CustomTextarea from "./CustomTextarea";
import { tabsAddProduct } from "@/constants";
import UploadedImage from "./UploadedImage";
import { uploadImages } from "@/utils/fun";
import { MESSAGES } from "@/utils/message";
import CustomSwitch from "./CustomSwitch";
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
  const [selectedTab, setSelectedTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (selectedTab < tabsAddProduct.length - 1)
      setSelectedTab(selectedTab + 1);
  };

  const handleBack = () => {
    if (selectedTab > 0) setSelectedTab(selectedTab - 1);
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
    ) {
      return toast.error(MESSAGES.fields);
    }

    setLoading(true);

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

    setLoading(false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      router.push("/products");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full p-4 space-y-4">
      <div className="flex flex-wrap gap-3 pb-3 items-center overflow-x-auto border-b w-fit">
        {tabsAddProduct.map((tab, index) => (
          <CustomBtn
            key={tab.key}
            title={tab.title}
            classNames={`px-2 py-1 rounded-btn text-[12px] ${
              selectedTab === index
                ? "bg-dark1 text-white dark:bg-dark2 "
                : "bg-gray-200 dark:text-dark1"
            }`}
            onClick={() => setSelectedTab(index)}
          />
        ))}
      </div>

      {selectedTab === 0 && (
        <div className="space-y-8">
          <DetailedBox
            title="جزئیات اولیه"
            subtitle="عنوان، توضیحات، تصویر"
            content={
              <BasicDetails
                form={form}
                setForm={setForm}
                onChange={onChange}
                editImage={editImage}
              />
            }
          />
          <DetailedBox
            title="معرفی"
            subtitle="معرفی محصول"
            content={
              <IntroductionDetails
                form={form}
                setForm={setForm}
                onChange={onChange}
              />
            }
          />
        </div>
      )}
      {selectedTab === 1 && (
        <DetailedBox
          title="دسته‌بندی"
          subtitle="دسته‌بندی"
          content={<CategoryTreeSelection form={form} setForm={setForm} />}
        />
      )}
      {selectedTab === 2 && (
        <DetailedBox
          title="ویژگی‌ها"
          subtitle="قیمت، موجودی، تخفیف، ..."
          content={
            <Properties form={form} setForm={setForm} onChange={onChange} />
          }
        />
      )}
      {selectedTab === 3 && (
        <div className="space-y-8">
          <DetailedBox
            title="مشخصات"
            subtitle="مشخصات را اضافه یا حذف کنید"
            content={<Specifications form={form} setForm={setForm} />}
          />
          <DetailedBox
            title="بررسی"
            subtitle="بررسی تخصصی محصول"
            content={<ExpertReview form={form} setForm={setForm} />}
          />
        </div>
      )}
      {selectedTab === 4 && (
        <DetailedBox
          title="بیمه"
          subtitle="جزئیات بیمه محصول"
          content={
            <InsuranceDetails
              form={form}
              setForm={setForm}
              onChange={onChange}
            />
          }
        />
      )}
      {selectedTab === 5 && (
        <DetailedBox
          title="تنضیمات تحویل"
          subtitle="تنضیمات تحویل سریع و رایگان"
          content={<DeliveryDetails form={form} setForm={setForm} />}
        />
      )}
      {selectedTab === 6 && (
        <DetailedBox
          title="گارانتی"
          subtitle="گارانتی، کلمات کلیدی و سیاست بازگشت کالا"
          content={
            <Warranty
              form={form}
              type={type}
              setForm={setForm}
              loading={loading}
              onChange={onChange}
              handleSubmit={handleSubmit}
            />
          }
        />
      )}

      <div className="flex justify-between mt-4">
        <CustomBtn
          title="برگشت"
          classNames="px-4 py-2 bg-dark1 dark:bg-lightGray text-white dark:text-dark1 rounded-btn text-[12px] h-fit"
          onClick={handleBack}
          disabled={selectedTab === 0}
        />
        {selectedTab < tabsAddProduct.length - 1 ? (
          <CustomBtn
            title="ادامه"
            classNames="px-4 py-2 bg-dark1 dark:bg-lightGray text-white dark:text-dark1 rounded-btn text-[12px] h-fit"
            onClick={handleNext}
          />
        ) : (
          <div className="flex flex-col-reverse md:flex-row items-end md:items-center justify-end gap-10 w-full rounded-[8px]">
            <div className="flex items-center gap-2">
              <CustomSwitch
                id="publish"
                label="منتشر شود؟"
                checked={form.published}
                onChange={(checked) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    published: checked,
                  }));
                }}
                name="published"
              />
            </div>
            <CustomBtn
              classNames={`${
                loading ? "bg-lightGray" : "bg-dark1 text-white"
              } flex items-center justify-center w-[100px] py-2 text-[12px] md:w-[150px] dark:bg-lightGray dark:text-dark1 h-fit rounded-btn text-[12px] md:text-[14px] font-bold`}
              type="button"
              disabled={loading}
              isLoading={loading}
              onClick={handleSubmit}
              title={type === "CREATE" ? "ایجاد محصول" : "ویرایش محصول"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function BasicDetails({ form, setForm, onChange, editImage }) {
  return (
    <div className="flex flex-col gap-box w-full h-full">
      <div className="flex flex-wrap gap-box w-full h-full">
        <CustomInp
          type="text"
          name="title"
          label="عنوان *"
          value={form.title}
          onChange={onChange}
          wrapperClassName="flex flex-1 flex-wrap xl:min-w-[400px] min-w-[150px]"
        />
        <CustomInp
          type="text"
          name="brand"
          label="نام تجاری *"
          value={form.brand}
          onChange={onChange}
          wrapperClassName="flex flex-1 flex-wrap xl:min-w-[400px] min-w-[150px]"
        />
      </div>
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
}

function IntroductionDetails({ form, setForm, onChange }) {
  return (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        label="عنوان"
        value={form.introduction?.title}
        onChange={(e) =>
          setForm({
            ...form,
            introduction: { ...form.introduction, title: e.target.value },
          })
        }
      />
      <CustomTextarea
        type="text"
        label="توضیحات"
        value={form.introduction?.description}
        onChange={(e) =>
          setForm({
            ...form,
            introduction: { ...form.introduction, description: e.target.value },
          })
        }
      />
    </div>
  );
}

function Properties({ form, setForm, onChange }) {
  return (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="number"
        name="price"
        label="قیمت *"
        min={0}
        value={form.price}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
      />
      <CustomInp
        type="number"
        name="stock"
        label="موجودی *"
        min={0}
        value={form.stock}
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
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
            wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
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
            wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
          />
        </div>
        <CustomDataPicker form={form} setForm={setForm} />
      </div>

      <div className="flex items-center gap-2">
        <CustomSwitch
          id="isGrocery"
          label="کالای سوپرمارکتی است؟"
          checked={form.isGrocery?.value || false}
          onChange={(checked) => {
            setForm({
              ...form,
              isGrocery: {
                ...form.isGrocery,
                value: checked,
              },
            });
          }}
          name="isGrocery"
        />
      </div>
    </div>
  );
}

function Warranty({ form, setForm, onChange }) {
  return (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="warranty"
        label="گارانتی"
        value={form.warranty}
        onChange={onChange}
      />
      <CustomTextarea
        name="returnPolicy"
        label="سیاست بازگشت"
        value={form.returnPolicy || ""}
        onChange={onChange}
      />
      <KeywordsSelection form={form} setForm={setForm} />
    </div>
  );
}

function InsuranceDetails({ form, setForm, onChange }) {
  return (
    <div className="flex flex-wrap gap-box w-full h-full">
      <div className="flex flex-wrap gap-box">
        <CustomInp
          type="text"
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
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
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
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
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[150px]"
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
        <div className="flex gap-4 flex-col-reverse md:flex-row md:items-center">
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
}

"use client";

import { useEffect, useState } from "react";

import CustomTextarea from "@/components/shared/form/CustomTextarea";
import UploadedImage from "@/components/shared/form/UploadedImage";
import CustomSelect from "@/components/shared/form/CustomSelect";
import CustomInp from "@/components/shared/form/CustomInp";
import { getCategories } from "@/actions/category.action";
import DetailedBox from "@/components/shared/DetailedBox";

export default function VendorRegistrationForm({ form, setForm, onChange }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { category } = await getCategories();
        setCategories(category);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categoryOptions = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  const storeDetails = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="text"
        name="storeName"
        value={form.storeInfo?.storeName || ""}
        onChange={(e) =>
          setForm((prevForm) => ({
            ...prevForm,
            storeInfo: {
              ...prevForm.storeInfo,
              storeName: e.target.value,
            },
          }))
        }
        label="نام فروشگاه *"
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
        required
      />
      <CustomInp
        type="text"
        name="taxCode"
        value={form.taxCode || ""}
        onChange={onChange}
        label="کد اقتصادی *"
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
        required
        pattern="[0-9]{10}"
      />
      <CustomInp
        type="text"
        name="businessLicense"
        value={form.businessLicense || ""}
        onChange={onChange}
        label="شماره مجوز کسب و کار *"
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
    </div>
  );

  const imageStoreDetails = (
    <div className="flex justify-around flex-wrap gap-box w-full h-full">
      <UploadedImage
        form={form}
        setForm={setForm}
        imagesPath="storeInfo.images"
        imageTitle="تصاویر فروشگاه"
      />
      <UploadedImage
        form={form}
        setForm={setForm}
        imageTitle="عکس پشت و روی کارت ملی"
      />
    </div>
  );

  const handleProductCategoryChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      productCategory: value,
    }));
  };

  return (
    <div className="space-y-8">
      <DetailedBox title="اطلاعات فروشگاه" content={storeDetails} />
      <DetailedBox
        title="آدرس فروشگاه فروشنده"
        content={
          <CustomTextarea
            name="storeAddress"
            value={form.storeInfo?.storeAddress || ""}
            onChange={(e) =>
              setForm((prevForm) => ({
                ...prevForm,
                storeInfo: {
                  ...prevForm.storeInfo,
                  storeAddress: e.target.value,
                },
              }))
            }
            label="آدرس فروشگاه *"
            wrapperClassName="w-full"
          />
        }
      />
      <DetailedBox
        title="دسته‌بندی محصول فروشگاه"
        content={
          <CustomSelect
            name="productCategory"
            label="دسته‌بندی محصولات *"
            options={categoryOptions}
            value={form.productCategory}
            onChange={handleProductCategoryChange}
          />
        }
      />
      <DetailedBox
        title="تصاویر مربوط به فروشگاه"
        content={imageStoreDetails}
      />

      <div className="flex items-center justify-end gap-10 space-x-8"></div>
    </div>
  );
}

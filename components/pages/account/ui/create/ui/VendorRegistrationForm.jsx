"use client";

import CustomInp from "@/components/shared/form/CustomInp";
import { vendorCategoryOptions } from "@/constants";
import CustomSelect from "@/components/shared/form/CustomSelect";
import UploadedImage from "@/components/shared/form/UploadedImage";
import CustomTextarea from "@/components/shared/form/CustomTextarea";
import { useEffect, useState } from "react";
import { getCategories } from "@/actions/category.action";

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

  const handleProductCategoryChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      productCategory: value,
    }));
  };

  return (
    <div className="w-full h-fit flex flex-wrap gap-5">
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
      <div className="flex flex-col gap-box w-full h-full">
        <p className={`user-label`}>تصاویر فروشگاه</p>
        <UploadedImage
          form={form}
          setForm={setForm}
          imagesPath="storeInfo.images"
        />
      </div>
      <div className="my-4 w-full">
        <CustomSelect
          name="productCategory"
          label="دسته‌بندی محصولات *"
          options={categoryOptions}
          value={form.productCategory}
          onChange={handleProductCategoryChange}
        />
      </div>
      <div className="flex flex-col gap-box w-full h-full">
        <p className={`user-label`}>عکس پشت و روی کارت ملی را وارد کنید *</p>
        <UploadedImage form={form} setForm={setForm} />
      </div>
    </div>
  );
}

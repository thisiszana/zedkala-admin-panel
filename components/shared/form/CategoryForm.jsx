"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useState } from "react";

import toast from "react-hot-toast";
import { Switch } from "antd";

import { createCategory, editCategory } from "@/actions/category.action";
import { Edit, Trash } from "@/components/icons/Icons";
import CustomSelection from "./CustomSelection";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import DetailedBox from "../DetailedBox";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";

export default function CategoryForm({ type, form, setForm, onChange, id }) {
  const [newBrand, setNewBrand] = useState({ name: "", logo: null });
  const [previewURL, setPreviewURL] = useState(null);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="name"
        label="عنوان دسته‌بندی *"
        value={form.name}
        onChange={onChange}
      />
      <CustomInp
        type="text"
        name="slug"
        label="اسلاگ دسته‌بندی"
        value={form.slug}
        onChange={onChange}
      />
      <UploadedImage form={form} setForm={setForm} />
      <CustomSelection form={form} setForm={setForm} />
      <CustomInp
        type="number"
        name="order"
        label="ترتیب نمایش"
        value={form.order}
        onChange={onChange}
      />
      <div className="flex items-center gap-2">
        <Switch
          id="isFeatured"
          checked={form.isFeatured}
          onChange={(checked) => {
            setForm({ ...form, isFeatured: checked });
          }}
        />
        <label htmlFor="isFeatured" className="text-p1">
          دسته‌بندی در صفحه اصلی نمایش داده شود؟
        </label>
      </div>
    </div>
  );

  const handleDeleteBrand = (index) => {
    const updatedBrands = [...form.brands];
    updatedBrands.splice(index, 1);
    setForm({ ...form, brands: updatedBrands });
  };

  const handleEditBrand = (index) => {
    const brandToEdit = form.brands[index];
    setNewBrand({ name: brandToEdit.name, logo: brandToEdit.logo });
    setPreviewURL(brandToEdit.logo);

    const updatedBrands = [...form.brands];
    updatedBrands.splice(index, 1);
    setForm({ ...form, brands: updatedBrands });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBrand({ ...newBrand, logo: file });
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleAddBrand = async () => {
    if (!newBrand.name || !newBrand.logo) {
      toast.error("لطفا نام و عکس برند را وارد کنید.");
      return;
    }

    try {
      setLoadingUrl(true);
      const uploadResult = await uploadImage(newBrand.logo);
      const logoUrl = uploadResult.imageUrl;

      setForm({
        ...form,
        brands: [...form.brands, { name: newBrand.name, logo: logoUrl }],
      });
      setLoadingUrl(false);

      setNewBrand({ name: "", logo: null });
      setPreviewURL(null);
      toast.success("برند با موفقیت اضافه شد.");
    } catch (error) {
      toast.error("خطا در آپلود لوگو. لطفا دوباره تلاش کنید.");
    }
  };

  const brandDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      {form.brands.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {form.brands.map((brand, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center gap-2 border p-2 rounded-md"
            >
              <p>{brand.name}</p>
              {brand.logo && (
                <Image
                  src={
                    typeof brand.logo === "string"
                      ? brand.logo
                      : URL.createObjectURL(brand.logo)
                  }
                  alt={brand.name}
                  width={100}
                  height={100}
                  className="h-24 w-24 object-cover rounded-md border border-gray-300 shadow-md"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditBrand(index)}
                  className="px-2 py-1 text-blue-500 hover:text-blue-700 border rounded"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDeleteBrand(index)}
                  className="px-2 py-1 text-red-500 hover:text-red-700 border rounded"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>برندی اضافه نشده است.</p>
      )}
      <div className="flex items-center gap-4 mt-4">
        <CustomInp
          type="text"
          name="brandName"
          label="نام برند"
          value={newBrand.name}
          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-md hover:border-blue-400 transition-all"
        >
          <span className="text-gray-500 text-[12px]">+</span>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {previewURL && (
          <Image
            src={previewURL}
            width={100}
            height={100}
            alt="پیش‌نمایش برند"
            className="h-24 w-24 object-cover rounded-md border border-gray-300 shadow-md"
          />
        )}
      </div>

      <CustomBtn
        onClick={handleAddBrand}
        title="اضافه کردن برند"
        classNames={`${
          loadingUrl
            ? "bg-lightGray"
            : "bg-dark1 text-white dark:bg-white dark:text-dark1"
        } flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold`}
        type="button"
        disabled={loadingUrl}
        isLoading={loadingUrl}
      />
    </div>
  );

  const handleSubmit = async () => {
    if (!form.name) return toast.error(MESSAGES.fields);
    setLoading(true);

    const uploadResult = form.image ? await uploadImage(form.image[0]) : null;
    const payload = {
      ...form,
      image: uploadResult ? uploadResult.imageUrl : form.image,
    };

    console.log(payload);

    let res;
    if (type === "CREATE") {
      res = await createCategory(payload);
    } else {
      res = await editCategory({ ...payload, id });
    }

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
        title="جزئیات دسته‌بندی"
        subtitle="عنوان، اسلاگ، آیکون و پدر"
        content={basicDetails}
      />
      <DetailedBox
        title="برندها"
        subtitle="اضافه کردن برندها"
        content={brandDetails}
      />
      <div className="flex items-center justify-end gap-10 space-x-8">
        <div className="flex items-center gap-2">
          <Switch
            id="publish"
            checked={form.published}
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
            loading
              ? "bg-lightGray"
              : "bg-dark1 text-white dark:bg-white dark:text-dark1"
          } flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold`}
          type="button"
          disabled={loading}
          isLoading={loading}
          onClick={handleSubmit}
          title={type === "CREATE" ? "ایجاد دسته‌بندی" : "ویرایش دسته‌بندی"}
        />
      </div>
    </div>
  );
}

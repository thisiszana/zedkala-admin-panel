"use client";

import { useRouter } from "next/navigation";
import NextImage from "next/image";

import { useState } from "react";

import { Image } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Switch } from "antd";

import { createCategory, editCategory } from "@/actions/category.action";
import { Edit, Trash, UploadIcon } from "@/components/icons/Icons";
import CustomSelection from "./CustomSelection";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import DetailedBox from "../DetailedBox";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";

export default function CategoryForm({
  type,
  form,
  setForm,
  onChange,
  id,
  editImage,
}) {
  const [newBrand, setNewBrand] = useState({ name: "", logo: null });
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <div className="flex flex-wrap gap-box w-full h-full">
        <CustomInp
          type="text"
          name="name"
          label="عنوان دسته‌بندی *"
          value={form.name}
          onChange={onChange}
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        />
        <CustomInp
          type="text"
          name="slug"
          label="اسلاگ دسته‌بندی"
          value={form.slug}
          onChange={onChange}
          wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        />
        <CustomInp
          type="number"
          name="order"
          label="ترتیب نمایش"
          value={form.order}
          onChange={onChange}
          wrapperClassName="flex flex-2 xl:min-w-[400px] min-w-[200px]"
        />
      </div>
      <UploadedImage form={form} setForm={setForm} editImage={editImage} />
    </div>
  );

  const subCategories = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomSelection form={form} setForm={setForm} />
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

    const { name, logo } = newBrand;

    if (name === brandToEdit.name && logo === brandToEdit.logo) return;

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
    if (!newBrand.name || !newBrand.logo) toast.error(MESSAGES.brandField);

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
      toast.success(MESSAGES.addBrand);
    } catch (error) {
      toast.error(MESSAGES.addBrandImageErr);
    }
  };

  const brandDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <div className="flex  flex-col gap-4 mt-4">
        <CustomInp
          type="text"
          name="brandName"
          label="نام برند"
          value={newBrand.name}
          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
        />
        <div className="flex items-center gap-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-md hover:border-blue-400 transition-all"
          >
            <div className="bg-gray-200 hover:bg-gray-300 dark:hover:bg-darkHover dark:bg-dark1 cursor-pointer transition rounded-full w-[50px] h-[50px] flex items-center justify-center">
              <UploadIcon size={15} />
            </div>
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
              as={NextImage}
              src={previewURL}
              width={100}
              height={100}
              alt="پیش‌نمایش برند"
              className="h-24 w-24 object-cover rounded-md border border-gray-300 shadow-md"
            />
          )}
        </div>
      </div>
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
                  as={NextImage}
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
                <CustomBtn
                  onClick={() => handleEditBrand(index)}
                  classNames="px-2 py-1 text-blue-500 hover:text-blue-700 border rounded"
                  icon={<Edit />}
                />

                <CustomBtn
                  onClick={() => handleDeleteBrand(index)}
                  classNames="px-2 py-1 text-red-500 hover:text-red-700 border rounded"
                  icon={<Trash />}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>برندی اضافه نشده است.</p>
      )}

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
    if (!form.name) return toast.error(MESSAGES.fields);
    setLoading(true);

    const uploadedImages = await uploadImages(form.images);
    const payload = {
      ...form,
      images: uploadedImages,
    };

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
        subtitle="عنوان، اسلاگ، عکس و ترتیب نمایش"
        content={basicDetails}
      />
      <DetailedBox
        title="زیر دسته‌بندی"
        subtitle="زیرمجموعه و آیتم ها"
        content={subCategories}
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

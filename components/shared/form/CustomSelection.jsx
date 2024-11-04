"use client";

import NextImage from "next/image";

import { useState } from "react";

import toast from "react-hot-toast";

import { CircleClose, Trash } from "@/components/icons/Icons";
import { shorterText, uploadImage } from "@/utils/fun";
import { MESSAGES } from "@/utils/message";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";
import { Image } from "@nextui-org/react";

export default function CustomSelection({ form, setForm }) {
  const [subImagePreview, setSubImagePreview] = useState(null);
  const [loadingUrl, setLoadingUrl] = useState(null);
  const [subImage, setSubImage] = useState(null);
  const [subName, setSubName] = useState("");
  const [items, setItems] = useState([
    { name: "", image: null, preview: null },
  ]);

  const addSubCategory = async (e) => {
    e.preventDefault();

    if (!subName) {
      toast.error(MESSAGES.fields);
      return;
    }
    setLoadingUrl(true);
    let subImageUrl = null;
    if (subImage) {
      const uploadResult = await uploadImage(subImage);
      subImageUrl = uploadResult.imageUrl;
    }

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        let itemImageUrl = null;
        if (item.image) {
          const uploadResult = await uploadImage(item.image);
          itemImageUrl = uploadResult.imageUrl;
        }
        return { ...item, image: itemImageUrl };
      })
    );

    const newSubcategory = {
      name: subName,
      items: updatedItems,
      image: subImageUrl,
    };

    setForm({
      ...form,
      subcategories: [...form.subcategories, newSubcategory],
    });

    setLoadingUrl(false);
    setSubName("");
    setItems([{ name: "", image: null, preview: null }]);
    setSubImage(null);
    setSubImagePreview(null);
    toast.success(MESSAGES.addSubcategories);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubImage(file);
      setSubImagePreview(URL.createObjectURL(file));
    }
  };

  const handleItemNameChange = (index, value) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, name: value } : item
    );
    setItems(updatedItems);
  };

  const handleItemImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedItems = items.map((item, i) =>
        i === index
          ? { ...item, image: file, preview: URL.createObjectURL(file) }
          : item
      );
      setItems(updatedItems);
    }
  };

  const addItemField = () => {
    setItems([...items, { name: "", image: null, preview: null }]);
  };

  const removeItemField = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const removeSubCategory = (index) => {
    const updatedSubcategories = form.subcategories.filter(
      (_, i) => i !== index
    );
    setForm({ ...form, subcategories: updatedSubcategories });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-box w-full h-full ">
        <CustomInp
          type="text"
          value={subName}
          onChange={(e) => setSubName(e.target.value)}
          label="نام زیرمجموعه"
        />
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CustomInp
                type="text"
                value={item.name}
                onChange={(e) => handleItemNameChange(index, e.target.value)}
                label={`نام آیتم ${index + 1}`}
              />
              <label
                htmlFor={`item-file-upload-${index}`}
                className="cursor-pointer"
              >
                <span className="text-gray-500">افزودن عکس</span>
              </label>
              <input
                type="file"
                id={`item-file-upload-${index}`}
                accept="image/*"
                onChange={(e) => handleItemImageChange(index, e)}
                className="hidden"
              />
              {item.preview && (
                <Image
                  as={NextImage}
                  src={item.preview}
                  width={50}
                  height={50}
                  alt={`پیش‌نمایش آیتم ${index + 1}`}
                  className="h-12 w-12 object-cover rounded-md border border-gray-300 shadow-md"
                />
              )}
              <CustomBtn
                type="button"
                onClick={() => removeItemField(index)}
                icon={<Trash />}
                classNames="text-red-500"
              />
            </div>
          ))}
        </div>
        <CustomBtn
          type="button"
          title="افزودن آیتم جدید"
          onClick={addItemField}
          classNames="flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold bg-dark1 text-white dark:bg-white dark:text-dark1"
        />
        <label
          htmlFor="sub-file-upload"
          className="cursor-pointer flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-400 rounded-md hover:border-blue-400 transition-all"
        >
          <span className="text-gray-500 text-[12px]">+</span>
        </label>
        <input
          type="file"
          id="sub-file-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {subImagePreview && (
          <Image
            as={NextImage}
            src={subImagePreview}
            width={100}
            height={100}
            alt="پیش‌نمایش زیرمجموعه"
            className="h-24 w-24 object-cover rounded-md border border-gray-300 shadow-md"
          />
        )}

        <CustomBtn
          type="button"
          title="افزودن زیرمجموعه"
          onClick={addSubCategory}
          classNames={`${
            loadingUrl
              ? "bg-lightGray"
              : "bg-dark1 text-white dark:bg-white dark:text-dark1"
          } flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold`}
          disabled={loadingUrl}
          isLoading={loadingUrl}
        />
      </div>

      {form.subcategories.length !== 0 && (
        <div className="flex gap-2 items-center flex-wrap mt-3">
          {form.subcategories.map((sub, index) => (
            <div key={index} className="flex items-center gap-2">
              <CustomBtn
                type="button"
                onClick={() => removeSubCategory(index)}
                classNames="rounded-btn flex items-center gap-btn bg-dark1 hover:bg-dark2 Transition py-[2.5px] px-1.5 group"
                title={
                  <>
                    <span className="text-white">
                      {sub.name} (
                      {shorterText(
                        sub.items.map((item) => item.name).join(", "),
                        20
                      )}
                      )
                    </span>
                    <CircleClose
                      size={18}
                      className="text-darkGray group-hover:text-lightGray Transition"
                    />
                  </>
                }
              />
              {sub.image && (
                <Image
                  as={NextImage}
                  src={
                    typeof sub.image === "string"
                      ? sub.image
                      : URL.createObjectURL(sub.image)
                  }
                  alt={sub.name}
                  width={100}
                  height={100}
                  className="h-24 w-24 object-cover rounded-md border border-gray-300 shadow-md"
                />
              )}
            </div>
          ))}
          <CustomBtn
            type="button"
            onClick={() => setForm({ ...form, subcategories: [] })}
            classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
            title={<p className="text-p1 font-bold">حذف همه زیرمجموعه‌ها</p>}
            icon={<Trash />}
          />
        </div>
      )}
    </div>
  );
}

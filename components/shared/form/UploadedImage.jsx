"use client";

import NextImage from "next/image";

import { useState } from "react";

import { Image } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Upload } from "antd";

import { Trash, UploadIcon } from "@/components/icons/Icons";
import { images as defaultImages } from "@/constants";
import { MESSAGES } from "@/utils/message";
import CustomBtn from "../CustomBtn";

const Dragger = Upload;

export default function UploadedImage({
  form,
  setForm,
  imagesPath = "images",
  editImage,
}) {
  const [existingImages, setExistingImages] = useState(editImage || []);

  const getImages = () => {
    const pathSegments = imagesPath.split(".");
    let current = form;
    for (const segment of pathSegments) {
      if (current[segment] === undefined) return [];
      current = current[segment];
    }
    return Array.isArray(current) ? current : [];
  };

  const setImages = (newImages) => {
    const pathSegments = imagesPath.split(".");
    const updatedForm = { ...form };
    let current = updatedForm;

    for (let i = 0; i < pathSegments.length - 1; i++) {
      const segment = pathSegments[i];
      current[segment] = current[segment] || {};
      current = current[segment];
    }

    current[pathSegments[pathSegments.length - 1]] = newImages;
    setForm(updatedForm);
  };

  const beforeUpload = (e) => {
    const { size } = e;

    if (size > 1 * 1000 * 1000) {
      toast.error(MESSAGES.highSizeImage);
      return Upload.LIST_IGNORE;
    }
  };

  const onChange = (e) => {
    const files = e.fileList.map((item) => item.originFileObj);
    setImages(files);
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages);
    setImages(updatedImages);
    toast.success(MESSAGES.deleteImage);
  };

  return (
    <div>
      <Dragger
        className="flex flex-col justify-center items-center dark:text-white bg-gray-50 dark:bg-dark1 border-1 rounded-xl"
        defaultFileList={getImages()}
        listType="picture"
        name="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        <div className="w-full rounded-3xl min-h-[150px] flex flex-col items-center justify-center gap-2 p-3 text-center">
          <div className="bg-gray-200 hover:bg-gray-300 dark:hover:bg-darkHover dark:bg-dark1 cursor-pointer transition rounded-full w-[70px] h-[70px] text-[30px] flex items-center justify-center">
            <UploadIcon />
          </div>
          <div>
            <p>عکس را انتخاب کنید</p>
            <p>JPG, PNG, JPEG, WEBP حداکثر ۱ مگابایت</p>
          </div>
        </div>
      </Dragger>
      {existingImages.length > 0 && (
        <div className="mb-4">
          <p className="my-3">تصاویر موجود:</p>
          <div className="flex gap-2 flex-wrap">
            {existingImages.map((img, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-3"
              >
                <Image
                  as={NextImage}
                  src={img || defaultImages.imageNotFound}
                  width={100}
                  height={100}
                  alt={`existing-${index}`}
                  className="w-24 h-24 object-cover rounded-lg mb-2"
                />
                <CustomBtn
                  type="button"
                  icon={<Trash color="red" />}
                  classNames=" cursor-pointer bg-dark2 hover:bg-dark3 transition rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleRemoveExistingImage(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

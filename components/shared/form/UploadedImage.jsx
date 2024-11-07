"use client";

import { Trash, UploadIcon } from "@/components/icons/Icons";
import { Upload } from "antd";
import toast from "react-hot-toast";
import { useState } from "react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import CustomBtn from "../CustomBtn";

const Dragger = Upload;

export default function UploadedImage({ form, setForm, images, editImage }) {
  const [existingImages, setExistingImages] = useState(editImage || []);

  const beforeUpload = (e) => {
    const { size } = e;

    if (size > 1 * 1000 * 1000) {
      toast.error("حجم فایل بیش از حد مجاز است!");
      return Upload.LIST_IGNORE;
    }
  };

  const onChange = (e) => {
    const files = e.fileList.map((item) => item.originFileObj);
    setForm({ ...form, images: files });
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(updatedImages);
    setForm({ ...form, images: updatedImages });
    toast.success("تصویر با موفقیت حذف شد!");
  };

  return (
    <div>
      <Dragger
        className="flex flex-col justify-center items-center border-dashed dark:text-white bg-gray-50 dark:bg-dark1 border-2 rounded-xl"
        defaultFileList={
          Array.isArray(form.images) && form.images.length > 0
            ? form.images
            : Array.isArray(images)
            ? images
            : []
        }
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
          <p>تصاویر موجود:</p>
          <div className="flex gap-2 flex-wrap">
            {existingImages.map((img, index) => (
              <div key={index} className="flex flex-col items-center justify-center">
                <Image
                  as={NextImage}
                  src={img}
                  width={100}
                  height={100}
                  alt={`existing-${index}`}
                  className="w-24 h-24 object-cover rounded-lg"
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

"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import { Upload } from "antd";

import { Trash, UploadIcon } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import { MESSAGES } from "@/utils/message";

const Dragger = Upload;

export default function UploadedCompressedFile({
  form,
  setForm,
  filePath = "files",
  editFile,
  fileTitle,
}) {
  const [existingFiles, setExistingFiles] = useState(editFile || []);

  const getFiles = () => {
    const pathSegments = filePath.split(".");
    let current = form;
    for (const segment of pathSegments) {
      if (current[segment] === undefined) return [];
      current = current[segment];
    }
    return Array.isArray(current) ? current : [];
  };

  const setFiles = (newFiles) => {
    const pathSegments = filePath.split(".");
    const updatedForm = { ...form };
    let current = updatedForm;

    for (let i = 0; i < pathSegments.length - 1; i++) {
      const segment = pathSegments[i];
      current[segment] = current[segment] || {};
      current = current[segment];
    }

    current[pathSegments[pathSegments.length - 1]] = newFiles;
    setForm((prevForm) => ({ ...prevForm, fileUrl: { ...updatedForm } }));
  };

  const beforeUpload = (e) => {
    const { size, name } = e;
    const fileType = name.split(".").pop().toLowerCase();

    if (size > 5 * 1000 * 1000) {
      toast.error(MESSAGES.highSizeFile);
      return Upload.LIST_IGNORE;
    }

    if (!["zip", "rar"].includes(fileType)) {
      toast.error(MESSAGES.invalidFileType);
      return Upload.LIST_IGNORE;
    }
  };

  const onChange = (e) => {
    const files = e.fileList.map((item) => item.originFileObj);
    setFiles(files);
  };

  const handleRemoveExistingFile = (index) => {
    const updatedFiles = existingFiles.filter((_, i) => i !== index);
    setExistingFiles(updatedFiles);
    setFiles(updatedFiles);
    toast.success(MESSAGES.deleteFile);
  };

  return (
    <div>
      <Dragger
        className="flex flex-col justify-center items-center dark:text-white bg-gray-50 dark:bg-dark1 border-1 rounded-xl"
        defaultFileList={getFiles()}
        listType="text"
        name="file"
        accept=".zip, .rar"
        onChange={onChange}
        beforeUpload={beforeUpload}
      >
        <div className="w-full rounded-3xl min-h-[150px] flex flex-col items-center justify-center gap-2 p-3 text-center">
          <div className="bg-gray-200 hover:bg-gray-300 dark:hover:bg-darkHover dark:bg-dark1 cursor-pointer transition rounded-full w-[70px] h-[70px] text-[30px] flex items-center justify-center">
            <UploadIcon />
          </div>
          <div>
            <p>{fileTitle || "فایل فشرده را انتخاب کنید"}</p>
            <p>ZIP, RAR حداکثر ۵ مگابایت</p>
          </div>
        </div>
      </Dragger>
      {existingFiles.length > 0 && (
        <div className="mb-4">
          <p className="my-3">فایل‌های موجود:</p>
          <div className="flex gap-2 flex-wrap">
            {existingFiles.map((file, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-3"
              >
                <p className="text-center">{file.name}</p>
                <CustomBtn
                  type="button"
                  icon={<Trash color="red" />}
                  classNames="cursor-pointer bg-dark2 hover:bg-dark3 transition rounded-full w-6 h-6 flex items-center justify-center"
                  onClick={() => handleRemoveExistingFile(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

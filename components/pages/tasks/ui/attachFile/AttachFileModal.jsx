"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { SendOutlined } from "@ant-design/icons";
import { Button, Modal, Input } from "antd";
import toast from "react-hot-toast";

import UploadedCompressedFile from "./ui/UploadedCompressedFile";
import { sendTaskAttachFile } from "@/services/queries";
import { uploadCompressedFile } from "@/utils/fun";
import { MESSAGES } from "@/utils/message";

export default function AttachFileModal({
  isOpen,
  onClose,
  taskID,
  currentUser,
}) {
  const [attachFile, setAttachFile] = useState({
    fileUrl: {},
    content: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const { fileUrl, content } = attachFile;

      console.log("File URL:", fileUrl);

      console.log("Attach File Data:", attachFile);

      if (!fileUrl || fileUrl.length === 0) {
        console.log("No file selected");
        return;
      }

      if (!content.trim()) {
        console.log("Content is empty");
        return;
      }

      const uploadedFile = await uploadCompressedFile(fileUrl.files[0]);

      if (uploadedFile.fileUrl) {
        await sendTaskAttachFile({
          taskID,
          content: {
            fileUrl: uploadedFile.fileUrl,
            content: attachFile.content,
            uploadedBy: currentUser._id,
          },
        });
        toast.success(MESSAGES.fileAttachedSuccessfully);
      } else {
        toast.error(MESSAGES.uploadFileFailed);
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error(MESSAGES.uploadFileFailed);
    },
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Modal
      title="فایل‌های پیوست"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      height={600}
    >
      <UploadedCompressedFile
        form={attachFile.fileUrl}
        setForm={setAttachFile}
      />
      <div className="flex items-center gap-2 mt-4">
        <Input.TextArea
          placeholder="متن پیوست خود را بنویسید..."
          value={attachFile.content}
          onChange={(e) =>
            setAttachFile({ ...attachFile, content: e.target.value })
          }
          autoSize={{ minRows: 1, maxRows: 5 }}
          className="rounded-[8px] border-gray-300 shadow-sm"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={() => mutation.mutate()}
          loading={mutation.isLoading}
          disabled={!attachFile.content.trim() || mutation.isLoading}
          className="rounded-[8px]"
        >
          ارسال
        </Button>
      </div>
    </Modal>
  );
}

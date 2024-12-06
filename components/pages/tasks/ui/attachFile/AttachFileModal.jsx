"use client";

import { useState } from "react";

import {
  SendOutlined,
  FileOutlined,
  UserOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Input, List, Avatar } from "antd";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import UploadedCompressedFile from "./ui/UploadedCompressedFile";
import { deleteTaskAttachFile, sendTaskAttachFile } from "@/services/queries";
import { uploadCompressedFile } from "@/utils/fun";
import { MESSAGES } from "@/utils/message";
import { useGetTaskDetails } from "@/hooks/useTasksQuery";
import Link from "next/link";
import { icons } from "@/constants";
import { Trash } from "@/components/icons/Icons";

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

  const { data, refetch } = useGetTaskDetails(taskID);

  const mutation = useMutation({
    mutationFn: async () => {
      const { fileUrl, content } = attachFile;

      if (!fileUrl || fileUrl.length === 0) {
        toast.error("No file selected");
        return;
      }

      if (!content.trim()) {
        toast.error("Content is empty");
        return;
      }

      const uploadedFile = await uploadCompressedFile(fileUrl.files[0]);

      if (uploadedFile.fileUrl) {
        await sendTaskAttachFile({
          taskID,
          content: {
            fileUrl: uploadedFile.fileUrl,
            content: attachFile.content,
            uploadedBy: currentUser,
          },
        });
        toast.success(MESSAGES.fileAttachedSuccessfully);
        refetch();
      } else {
        toast.error(MESSAGES.uploadFileFailed);
      }
    },
    onError: () => {
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
      <List
        header={<div>فایل‌های پیوست شده</div>}
        bordered
        dataSource={data?.task?.attachFiles || []}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.download}
              </Link>,
              item.uploadedBy?._id === currentUser && (
                <Button
                  icon={<Trash />}
                  danger
                  onClick={async () => {
                    try {
                      const res =await deleteTaskAttachFile({taskID, fileId: item._id }); 
                      cosole.log(res)
                      toast.success("فایل با موفقیت حذف شد.");
                      refetch(); 
                    } catch (error) {
                      toast.error("خطا در حذف فایل!");
                    }
                  }}
                />
              ),
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<FileOutlined />} />}
              title={<span>{item.content}</span>}
              description={
                <div className="flex items-center gap-4 text-gray-500">
                  <span>
                    <UserOutlined /> {item.uploadedBy?.username || "ناشناس"}
                  </span>
                  <span>
                    <ClockCircleOutlined />{" "}
                    {new Date(item.uploadedAt).toLocaleString("fa-IR")}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
        className="mb-4"
      />

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

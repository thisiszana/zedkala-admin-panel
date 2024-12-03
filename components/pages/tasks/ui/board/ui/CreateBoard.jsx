"use client";

import { useState } from "react";
import { Modal } from "antd";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomTextarea from "@/components/shared/form/CustomTextarea";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";
import { createBoard } from "@/actions/board.action";

export default function CreateBoard({ isOpen, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      toast.error("لطفاً عنوان تخته را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      await createBoard(form);
      toast.success("تخته جدید با موفقیت ایجاد شد.");
      onClose();
    } catch (error) {
      console.error("Error creating board:", error.message);
      toast.error("خطایی در ایجاد تخته رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="ایجاد تخته جدید"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* عنوان تخته */}
        <CustomInp
          label="عنوان تخته"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        {/* توضیحات تخته */}
        <CustomTextarea
          label="توضیحات"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-3">
          <CustomBtn
            title="لغو"
            onClick={onClose}
            classNames="bg-gray-300 text-black"
          />
          <CustomBtn
            title={loading ? <Loader /> : "ایجاد"}
            type="submit"
            disabled={loading}
            classNames="bg-dark1 text-white"
          />
        </div>
      </form>
    </Modal>
  );
}

"use client";

import { useState } from "react";
import { Modal } from "antd";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";
import toast from "react-hot-toast";
import { createList } from "@/actions/list.action";

export default function CreateList({ isOpen, onClose, boardId }) {
  const [form, setForm] = useState({
    title: "",
    boardId: boardId || "", // شناسه تخته به عنوان ورودی دریافت می‌شود
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.boardId) {
      toast.error("لطفاً عنوان لیست و شناسه تخته را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      await createList(form);
      toast.success("لیست جدید با موفقیت ایجاد شد.");
      onClose();
    } catch (error) {
      console.error("Error creating list:", error.message);
      toast.error("خطایی در ایجاد لیست رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="ایجاد لیست جدید"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* عنوان لیست */}
        <CustomInp
          label="عنوان لیست"
          name="title"
          value={form.title}
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

"use client";

import { CircleClose } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomDatePicker from "@/components/shared/CustomDatePicker";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomSelect from "@/components/shared/form/CustomSelect";
import CustomTextarea from "@/components/shared/form/CustomTextarea";
import { images } from "@/constants";
import { Avatar, Modal } from "antd";
import { useState } from "react";

export default function TaskForm({
  type,
  taskID,
  isModalOpen,
  closeModal,
  session,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    dueDate: new Date(),
  });

  console.log("task form", form);

  const onCancel = () => {
    closeModal();
    setForm({
      title: taskID ? data?.task?.title : "",
      description: taskID ? data?.task?.description : "",
      status: taskID ? data?.task?.status : "Todo",
      dueDate: taskID ? data?.task?.dueDate : "",
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleDateChange = (value) => {
    const date = new Date(value);
    setForm({
      ...form,
      dueDate: date,
    });
  };

  const handleStatus = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      status: value,
    }));
  };

  const modalTitle = (
    <div className="flex items-center justify-between border-b pb-3 mb-5">
      <p className="text-p1 font-medium">
        {type === "create" ? "ایجاد تسک جدید" : "ویرایش تسک"}
      </p>
      <CustomBtn
        icon={<CircleClose />}
        classNames="hoverable"
        onClick={closeModal}
        // disabled={createLoading}
      />
    </div>
  );

  const modalStyles = {
    content: {
      padding: "20px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
  };

  const onSubmit = (e) => {};

  return (
    <Modal
      title={modalTitle}
      style={modalStyles}
      onCancel={onCancel}
      open={isModalOpen}
      closeIcon={false}
      footer={false}
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <CustomInp
          type="text"
          label="عنوان"
          name="title"
          onChange={onChange}
          value={form.title}
        />
        <CustomTextarea
          label="توضیحات"
          name="description"
          onChange={onChange}
          value={form.description}
        />
        <CustomSelect
          label="وضعیت"
          name="status"
          onChange={handleStatus}
          value={form.status}
          options={[
            { value: "Todo", label: "انجام دادن" },
            { value: "Progress", label: "در حال انجام" },
            { value: "Done", label: "انجام شده" },
          ]}
        />
        <div className="space-y-2">
          <p className="font-medium text-p1">ایجاد کننده :</p>
          <div className="flex items-center gap-3">
            <Avatar src={session?.images || images.admin} />
            <p className="font-medium text-p1">{session?.username}</p>
          </div>
        </div>
        <hr />
        <div className="space-y-2">
          <p className="font-medium text-p1">سررسید</p>
          <div className="flex items-center gap-4">
            <CustomDatePicker
              value={form.dueDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <hr />
        <div className="flex justify-end gap-3">
          <CustomBtn
            type="button"
            title="لغو"
            classNames="border p-btn rounded-btn hoverable"
            onClick={onCancel}
          />
          <CustomBtn
            type="submit"
            title={type === "CREATE" ? "ایجاد" : "ویرایش"}
          />
        </div>
      </form>
    </Modal>
  );
}

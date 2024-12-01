"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { Avatar, Modal } from "antd";
import toast from "react-hot-toast";
import moment from "moment-jalaali";

import CustomTextarea from "@/components/shared/form/CustomTextarea";
import CustomDatePicker from "@/components/shared/CustomDatePicker";
import CustomSelect from "@/components/shared/form/CustomSelect";
import { createTask, editTask } from "@/actions/task.action";
import CustomInp from "@/components/shared/form/CustomInp";
import { CircleClose } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import { QUERY_KEY } from "@/services/queriesKey";
import Loader from "@/components/shared/Loader";
import { fetchTask } from "@/services/queries";
import { MESSAGES } from "@/utils/message";
import { images } from "@/constants";

moment.locale("fa");

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

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.task_ID, taskID],
    queryFn: fetchTask,
    staleTime: 0,
    cacheTime: 0,
    enabled: !!taskID,
  });

  useEffect(() => {
    if (data?.task) {
      setForm({
        title: data.task.title,
        description: data.task.description,
        status: data.task.status,
        dueDate: data.task.dueDate,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!!taskID && isModalOpen) {
      refetch();
    }
  }, [taskID, isModalOpen, refetch]);

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

  const { loading: createLoading, res: createRes } = useServerAction(
    createTask,
    form,
    () => onCancel()
  );

  const { loading: editLoading, res: editRes } = useServerAction(
    editTask,
    { ...form, id: taskID },
    () => onCancel()
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      (form.title && form.title.length === 0) ||
      (form.status && form.status.length === 0) ||
      (form.dueDate && form.dueDate.length === 0)
    )
      toast.error(MESSAGES.fields);

    type === "create" ? createRes() : editRes();
  };

  return (
    <Modal
      title={modalTitle}
      style={modalStyles}
      onCancel={onCancel}
      open={isModalOpen}
      closeIcon={false}
      footer={false}
    >
      {isFetching ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-p1 font-medium text-red-500">
            خطا درارتباط با سرور
          </p>
        </div>
      ) : (
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
              <Avatar
                src={
                  data
                    ? data?.task?.createdBy?.images || images.admin
                    : session?.images || images.admin
                }
              />
              <p className="font-medium text-p1">
                {data ? data?.task?.createdBy?.username : session?.username}
              </p>
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
              {form.dueDate && (
                <p className="capitalize">{moment(form.dueDate).fromNow()}</p>
              )}
            </div>
          </div>
          <hr />
          <div className="flex justify-end gap-3">
            <CustomBtn
              type="button"
              title="لغو"
              disabled={createLoading || editLoading}
              classNames="border p-btn rounded-btn hoverable"
              onClick={onCancel}
            />
            <CustomBtn
              type="submit"
              title={
                createLoading || editLoading ? (
                  <Loader height={15} width={15} />
                ) : type === "create" ? (
                  "ایجاد"
                ) : (
                  "ویرایش"
                )
              }
              disabled={createLoading || editLoading}
              classNames={`font-medium p-btn rounded-btn ${
                createLoading || editLoading
                  ? "bg-lightGray"
                  : "bg-dark1 text-white"
              }`}
            />
          </div>
        </form>
      )}
    </Modal>
  );
}

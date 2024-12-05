"use client";

import { useEffect, useState } from "react";

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
import Loader from "@/components/shared/Loader";
import { MESSAGES } from "@/utils/message";
import { backgroundColorsTasksPage, images } from "@/constants";
import { getAdmins } from "@/actions/admin.action";
import CommentsModal from "./CommentsModal";
import { useGetTaskDetails } from "@/hooks/useTasksQuery";

moment.locale("fa");

export default function TaskForm({
  type,
  taskID,
  isModalOpen,
  closeModal,
  session,
}) {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    dueDate: { startAt: new Date(), expiresAt: null },
    taskOwner: null,
    taskAssistants: null,
    background: "",
  });

  const { data, isFetching, isError, refetch } = useGetTaskDetails(taskID);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { admins } = await getAdmins();
        setAdmins(JSON.parse(JSON.stringify(admins)));
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    if (data?.task) {
      setForm({
        title: data.task.title,
        description: data.task.description,
        status: data.task.status,
        dueDate: data.task.dueDate,
        taskOwner: data.task.taskOwner,
        background: data.task.background,
        taskAssistants: data.task.taskAssistants,
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
      taskOwner: taskID ? data?.task?.taskOwner : "",
      background: taskID ? data?.task?.background : "",
      taskAssistants: taskID ? data?.task?.taskAssistants : "",
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleDateChange = (value, dateType) => {
    const date = new Date(value);

    setForm((prevForm) => ({
      ...prevForm,
      dueDate: {
        ...prevForm.dueDate,
        [dateType]: date,
      },
    }));
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
        icon={<CircleClose wrapperClassName="dark:bg-white" />}
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
    <>
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
        <form className="space-y-5 " onSubmit={onSubmit}>
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
          <div className="flex items-start flex-col gap-3">
            <p>رنگ پس زمینه</p>
            <div className="flex items-center flex-wrap gap-2 w-full">
              {backgroundColorsTasksPage.map((bg) => (
                <span
                  key={bg.id}
                  style={{ backgroundColor: bg.bg }}
                  className={`w-[30px] h-[30px] rounded-full border border-gray-300 cursor-pointer ${
                    form.background === bg.bg ? "ring-2 ring-dark1" : ""
                  }`}
                  onClick={() =>
                    setForm((prevForm) => ({ ...prevForm, background: bg.bg }))
                  }
                ></span>
              ))}
            </div>
          </div>
          <CustomSelect
            label="وضعیت"
            name="status"
            onChange={handleStatus}
            value={form.status}
            options={[
              { value: "Todo", label: "انجام دادن" },
              { value: "Progress", label: "در حال انجام" },
              { value: "Preview", label: "بررسی" },
              { value: "Done", label: "انجام شده" },
            ]}
          />
          <div className="flex items-center justify-between">
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
            
          </div>
          <hr />
          <div className="space-y-2">
            <p className="font-medium text-p1">سررسید</p>
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-between items-start gap-3">
                <CustomDatePicker
                  label="تاریخ شروع تسک"
                  value={form.dueDate?.startAt}
                  onChange={(value) => handleDateChange(value, "startAt")}
                />
                <CustomDatePicker
                  label="تاریخ پایان تسک"
                  value={form.dueDate?.expiresAt}
                  onChange={(value) => handleDateChange(value, "expiresAt")}
                />
              </div>
              {form.dueDate && (
                <p className="capitalize">
                  {moment(form.dueDate.startAt).fromNow()}
                </p>
              )}
            </div>
          </div>
          <hr />

          <CustomSelect
            label="چه افرادی میتوانند در تسک شما را یاری کنند :"
            name="taskAssistants"
            mode="multiple"
            value={
              form.taskAssistants?.map((assistant) => assistant.userId) || []
            }
            onChange={(value) => {
              const selectedAdmins = value
                .map((id) => admins.find((admin) => admin._id === id))
                .filter((admin) => admin);
              setForm({
                ...form,
                taskAssistants: selectedAdmins.map((admin) => ({
                  userId: admin._id,
                  username: admin.username,
                })),
              });
            }}
            options={admins.map((admin) => ({
              value: admin._id,
              label: (
                <div className="flex items-center gap-2">
                  <Avatar src={admin.images || images.admin} />
                  <span>{admin.username}</span>
                </div>
              ),
            }))}
          />

          {session.roll === "OWNER" && (
            <CustomSelect
              label="تسک رو چه کسی انجام بده :"
              name="taskOwner"
              value={form.taskOwner ? form.taskOwner.userId : undefined}
              onChange={(value) => {
                const selectedAdmin = admins.find(
                  (admin) => admin._id === value
                );
                setForm({
                  ...form,
                  taskOwner: {
                    userId: selectedAdmin._id,
                    username: selectedAdmin.username,
                  },
                });
              }}
              options={admins.map((admin) => ({
                value: admin._id,
                label: (
                  <div className="flex items-center gap-2">
                    <Avatar src={(admin && admin?.images) || images.admin} />
                    <span>{admin.username}</span>
                  </div>
                ),
              }))}
            />
          )}
          <div className="flex justify-end gap-3">
            <CustomBtn
              type="button"
              title="لغو"
              disabled={createLoading || editLoading}
              classNames="bg-dark1 text-white dark:bg-white dark:text-dark1 border p-btn rounded-btn hoverable"
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
              classNames={`${
                createLoading || editLoading
                  ? "bg-lightGray"
                  : "bg-dark1 text-white"
              } flex items-center justify-center w-[150px] dark:bg-lightGray dark:text-dark1 h-[50px] rounded-btn text-p1 font-bold`}
            />
          </div>
        </form>
      )}
    </Modal>
    </>
  );
}

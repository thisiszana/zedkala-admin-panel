"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import { Popover } from "antd";

import { CircleCheck, MenuDots, Trash } from "@/components/icons/Icons";
import CustomConfirmDeleteModal from "@/components/shared/CustomConfirmDeleteModal";
import { deleteTask, updateStatusTask } from "@/actions/task.action";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import Loader from "@/components/shared/Loader";

export default function TaskActions({ id, currentStatus }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => setIsPopoverOpen(false);

  const onOpenChange = (newOpen) => setIsPopoverOpen(newOpen);

  const { loading: todoLoading, res: todoRes } = useServerAction(
    updateStatusTask,
    {
      id,
      status: "Todo",
    },
    () => closePopover()
  );

  const { loading: progressLoading, res: progressRes } = useServerAction(
    updateStatusTask,
    {
      id,
      status: "Progress",
    },
    () => closePopover()
  );

  const { loading: doneLoading, res: doneRes } = useServerAction(
    updateStatusTask,
    {
      id,
      status: "Done",
    },
    () => closePopover()
  );

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await deleteTask({ id });
      toast.error(res.message);
      setIsModalVisible(false);
      onOpenChange(false);
    } catch (error) {
      toast.error("خطا در حذف تسک");
    } finally {
      setDeleteLoading(false);
    }
  };

  const popoverContent = (
    <div className="popContainer w-[200px] min-h-[150px] flex flex-col justify-center items-center">
      <CustomBtn
        classNames={`popButton ${
          currentStatus === "Todo" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          todoLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Todo" ? (
            <>
              <CircleCheck size={17} />
              <p>انجام دادن</p>
            </>
          ) : (
            <p>انجام دادن</p>
          )
        }
        onClick={() => todoRes()}
        disabled={todoLoading || progressLoading || doneLoading}
      />
      <CustomBtn
        classNames={`popButton ${
          currentStatus === "Progress" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          progressLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Progress" ? (
            <>
              <CircleCheck size={17} />
              <p>در حال انجام</p>
            </>
          ) : (
            <p>در حال انجام</p>
          )
        }
        onClick={() => progressRes()}
        disabled={todoLoading || progressLoading || doneLoading}
      />
      <CustomBtn
        classNames={`popButton ${
          currentStatus === "Done" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          doneLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Done" ? (
            <>
              <CircleCheck size={17} />
              <p>انجام شده</p>
            </>
          ) : (
            <p>انجام شده</p>
          )
        }
        onClick={() => doneRes()}
        disabled={todoLoading || progressLoading || doneLoading}
      />
      <CustomBtn
        classNames="popButton hoverable popButton text-darkRose hover:bg-lightRose Transition"
        title={
          deleteLoading ? (
            <Loader height={20} width={20} color={"red"} />
          ) : (
            <>
              <Trash size={17} />
              <p>حذف</p>
            </>
          )
        }
        onClick={() => setIsModalVisible(true)}
        disabled={
          todoLoading || progressLoading || doneLoading || deleteLoading
        }
      />
    </div>
  );
  return (
    <>
      <Popover
        open={isPopoverOpen}
        onOpenChange={onOpenChange}
        content={popoverContent}
        overlayInnerStyle={{
          padding: "0",
        }}
        trigger="click"
        placement="leftTop"
      >
        <CustomBtn
          type="button"
          icon={<MenuDots size={15} />}
          classNames="rounded-full w-[35px] h-[35px] flex items-center justify-center hoverable"
        />
      </Popover>
      <CustomConfirmDeleteModal
        title="تایید حذف"
        open={isModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        confirmMessage="آیا مطمئن هستید که می‌خواهید این تسک را حذف کنید؟"
        loading={deleteLoading}
      />
    </>
  );
}

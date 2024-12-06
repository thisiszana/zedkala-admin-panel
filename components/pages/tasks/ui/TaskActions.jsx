"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import { Popover } from "antd";

import CustomConfirmDeleteModal from "@/components/shared/CustomConfirmDeleteModal";
import { CircleCheck, MenuDots, Trash } from "@/components/icons/Icons";
import { deleteTask, updateStatusTask } from "@/actions/task.action";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import CommentsModal from "./comments/CommentsModal";
import Loader from "@/components/shared/Loader";
import { icons } from "@/constants";
import AttachFileModal from "./attachFile/AttachFileModal";

export default function TaskActions({ id, currentStatus, currentUser }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isAttachFileOpen, setIsAttachFileOpen] = useState(false);
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

  const { loading: previewLoading, res: previewRes } = useServerAction(
    updateStatusTask,
    {
      id,
      status: "Preview",
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
    <div className="popContainer min-w-[150px] dark:bg-dark1 border-1 rounded-[8px]">
      <CustomBtn
        classNames={`popButton flex justify-center w-full ${
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
        disabled={
          todoLoading || progressLoading || previewLoading || doneLoading
        }
      />
      <CustomBtn
        classNames={`popButton flex justify-center w-full ${
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
        disabled={
          todoLoading || progressLoading || previewLoading || doneLoading
        }
      />
      <CustomBtn
        classNames={`popButton flex justify-center w-full ${
          currentStatus === "Preview" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          previewLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Preview" ? (
            <>
              <CircleCheck size={17} />
              <p>بررسی</p>
            </>
          ) : (
            <p>بررسی</p>
          )
        }
        onClick={() => previewRes()}
        disabled={
          todoLoading || previewLoading || progressLoading || doneLoading
        }
      />
      <CustomBtn
        classNames={`popButton flex justify-center w-full ${
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
        disabled={
          todoLoading || progressLoading || previewLoading || doneLoading
        }
      />
      <CustomBtn
        classNames="popButton flex justify-center w-full hoverable popButton text-darkRose hover:bg-lightRose Transition"
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
          todoLoading ||
          progressLoading ||
          doneLoading ||
          deleteLoading ||
          previewLoading
        }
      />
    </div>
  );
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex items-center flex-col md:flex-row gap-y-3">
          <CustomBtn
            type="button"
            onClick={() => setIsCommentsOpen(true)}
            icon={icons.chat}
            classNames="rounded-full w-[35px] h-[35px] flex items-center justify-center hoverable"
            disabled={
              todoLoading ||
              progressLoading ||
              doneLoading ||
              deleteLoading ||
              previewLoading
            }
          />
          <CustomBtn
            type="button"
            onClick={() => setIsAttachFileOpen(true)}
            icon={icons.attachFile}
            disabled={
              todoLoading ||
              progressLoading ||
              doneLoading ||
              deleteLoading ||
              previewLoading
            }
            classNames="rounded-full w-[35px] h-[35px] flex items-center justify-center hoverable"
          />
        </div>
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
      </div>
      {isCommentsOpen && (
        <CommentsModal
          isOpen={isCommentsOpen}
          onClose={() => setIsCommentsOpen(false)}
          taskID={id}
          currentUser={currentUser}
        />
      )}
      {isAttachFileOpen && (
        <AttachFileModal
          isOpen={isAttachFileOpen}
          onClose={() => setIsAttachFileOpen(false)}
          taskID={id}
          currentUser={currentUser}
        />
      )}
    </>
  );
}

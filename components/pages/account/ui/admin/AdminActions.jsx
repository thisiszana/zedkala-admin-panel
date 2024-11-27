"use client";

import Link from "next/link";

import { useState } from "react";

import { Popover } from "antd";

import CustomConfirmDeleteModal from "@/components/shared/CustomConfirmDeleteModal";
import { changeRole, deleteAdmin } from "@/actions/admin.action";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import Loader from "@/components/shared/Loader";
import {
  CircleCheck,
  EyeOpen,
  MenuDots,
  Trash,
} from "@/components/icons/Icons";
import toast from "react-hot-toast";

export default function AdminActions({ roll, userId, showMore }) {
  const [adminContentInfo, setAdminContentInfo] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onOpen = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(!open);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { loading: makeAdminLoading, res: makeAdminRes } = useServerAction(
    changeRole,
    {
      userId,
      role: "ADMIN",
    },
    () => onClose()
  );

  const { loading: makeUserLoading, res: makeUserRes } = useServerAction(
    changeRole,
    {
      userId,
      role: "USER",
    },
    () => onClose()
  );

  const handleDeleteAdmin = async () => {
    setDeleteLoading(() => true);

    const res = await deleteAdmin({ userId });

    if (res.hasContent) {
      setAdminContentInfo(res.contentInfo);
      setDeleteLoading(() => false);
      openModal();
    } else if (res.status === "موفق") {
      console.log(res);
      toast.success(res.message);
      setDeleteLoading(() => false);
      onClose();
    } else {
      setDeleteLoading(() => false);
    }
  };

  const { loading: deleteAdminLoading, res: deleteAdminRes } = useServerAction(
    deleteAdmin,
    {
      userId,
      forceDelete: true,
    },
    () => {
      closeModal();
      onClose();
    }
  );

  const content = (
    <div className="popContainer w-[150px] min-h-[100px] flex flex-col justify-center items-center">
      <CustomBtn
        title={
          roll === "ADMIN" ? (
            <div className="flex items-center gap-2 text-darkBlue">
              <CircleCheck />
              <p>ادمین</p>
            </div>
          ) : makeAdminLoading ? (
            <div className="flex items-center justify-center w-full">
              <Loader height={20} width={20} />
            </div>
          ) : (
            "ادمین"
          )
        }
        classNames="popButton hoverable"
        disabled={roll === "ADMIN" || makeAdminLoading || makeUserLoading}
        onClick={() => makeAdminRes()}
      />
      <CustomBtn
        title={
          roll === "USER" ? (
            <div className="flex items-center gap-2 text-darkBlue">
              <CircleCheck />
              <p>کابر عادی</p>
            </div>
          ) : makeUserLoading ? (
            <div className="flex items-center justify-center w-full">
              <Loader height={20} width={20} />
            </div>
          ) : (
            "کاربر عادی"
          )
        }
        classNames="popButton hoverable"
        disabled={roll === "USER" || makeAdminLoading || makeUserLoading}
        onClick={() => makeUserRes()}
      />
      <div className="bg-gray-200 w-full h-[1px]" />
      <CustomBtn
        title={
          deleteLoading ? (
            <div className="flex items-center justify-center w-full">
              <Loader height={20} width={20} color="red" />
            </div>
          ) : (
            <>
              <Trash />
              <p>حذف</p>
            </>
          )
        }
        classNames="popButton text-darkRose hover:bg-lightRose Transition dark:bg-red-400"
        disabled={makeAdminLoading || makeUserLoading || deleteAdminLoading}
        onClick={handleDeleteAdmin}
      />
    </div>
  );

  const modalContent = (
    <p className="text-p1 text-center">
      این ادمین {adminContentInfo?.blogsCreated?.length || 0} بلاگ،{" "}
      {adminContentInfo?.productsCreated?.length || 0} محصول و{" "}
      {adminContentInfo?.categoryCreated?.length || 0} دسته‌بندی ایجاد کرده است.
      آیا مطمئن هستید که می‌خواهید حذف کنید؟
    </p>
  );

  return (
    <>
      <div className="flex items-center gap-1">
        <Link href={`/account/admin/${userId}`} className="iconButton">
          <EyeOpen />
        </Link>
        {showMore && (
          <Popover
            overlayInnerStyle={{
              padding: "0",
            }}
            content={content}
            open={open}
            onOpenChange={onOpenChange}
            trigger="click"
            placement="rightTop"
          >
            <CustomBtn
              type="button"
              icon={<MenuDots size={18} />}
              classNames="iconButton"
              onClick={onOpen}
            />
          </Popover>
        )}
      </div>
      <CustomConfirmDeleteModal
        title="حذف ادمین"
        onCancel={closeModal}
        open={isModalOpen}
        onConfirm={() => deleteAdminRes()}
        confirmMessage={modalContent}
        loading={deleteAdminLoading}
        footer={null}
      />
    </>
  );
}

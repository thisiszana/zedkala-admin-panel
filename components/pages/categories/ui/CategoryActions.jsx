"use client";

import Link from "next/link";

import { useState } from "react";

import { Popover } from "antd";

import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import Loader from "@/components/shared/Loader";
import {
  changeCategoryStatus,
  deleteCategory,
} from "@/actions/category.action";
import {
  Draft,
  Edit,
  EyeOpen,
  MenuDots,
  Publish,
  Trash,
} from "@/components/icons/Icons";
import toast from "react-hot-toast";
import CustomConfirmDeleteModal from "@/components/shared/CustomConfirmDeleteModal";

export default function CategoryActions({ categoryId, published }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const { loading: publishLoading, res: publishRes } = useServerAction(
    changeCategoryStatus,
    { id: categoryId, action: "publish" },
    () => onOpenChange()
  );

  const { loading: draftLoading, res: draftRes } = useServerAction(
    changeCategoryStatus,
    { id: categoryId, action: "draft" },
    () => onOpenChange()
  );

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteCategory({ id: categoryId });
      setIsModalVisible(false);
      onOpenChange(false);
    } catch (error) {
      toast.error("خطا در حذف دسته‌بندی");
    } finally {
      setDeleteLoading(false);
    }
  };

  const content = (
    <div className="popContainer min-w-[150px]">
      <CustomBtn
        disabled={published || deleteLoading}
        onClick={publishRes}
        classNames={`popButton flex justify-center w-full ${
          published
            ? "text-darkGreen bg-lightGreen dark:text-darkGreen"
            : "hoverable"
        }`}
        title={
          publishLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div className={`flex w-full items-center  gap-4 rounded-btn `}>
              <Publish />
              <p>منتشر شدن</p>
            </div>
          )
        }
      />
      <CustomBtn
        disabled={!published || deleteLoading}
        onClick={draftRes}
        classNames={`popButton flex justify-center w-full ${
          !published
            ? "text-darkOrange bg-lightOrange dark:text-darkOrange"
            : "hoverable"
        }`}
        title={
          draftLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div className={`flex w-full items-center gap-4`}>
              <Draft />
              <p>پیش نویس</p>
            </div>
          )
        }
      />
      <hr />
      <Link href={`/categories/${categoryId}`} className="popButton hoverable">
        <EyeOpen />
        جزئیات
      </Link>
      <Link
        href={`/categories/edit/${categoryId}`}
        className="popButton hoverable"
      >
        <Edit />
        ویرایش
      </Link>
      <hr />
      <CustomBtn
        onClick={() => setIsModalVisible(true)}
        disabled={deleteLoading || draftLoading || publishLoading}
        classNames="flex justify-center w-full"
        title={
          deleteLoading ? (
            <Loader width={15} height={15} color={"red"} className="py-1" />
          ) : (
            <div
              className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn hover:bg-lightRose text-darkRose`}
            >
              <Trash />
              <p>حذف</p>
            </div>
          )
        }
      />
    </div>
  );

  return (
    <div className="flex gap-2">
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        trigger="click"
        placement="rightTop"
        content={content}
        overlayInnerStyle={{
          padding: "0",
        }}
      >
        <CustomBtn icon={<MenuDots />} classNames="iconButton" />
      </Popover>
      <CustomConfirmDeleteModal
        visible={isModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        loading={deleteLoading}
        confirmMessage="آیا مطمئن هستید که می‌خواهید این دسته‌بندی را حذف کنید؟"
      />
    </div>
  );
}

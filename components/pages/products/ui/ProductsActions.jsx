"use client";

import Link from "next/link";

import { useState } from "react";

import toast from "react-hot-toast";
import { Popover } from "antd";

import CustomConfirmDeleteModal from "@/components/shared/CustomConfirmDeleteModal";
import { changeProductStatus, deleteProduct } from "@/actions/product.action";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import Loader from "@/components/shared/Loader";
import {
  Draft,
  Edit,
  EyeOpen,
  MenuDots,
  Publish,
  Trash,
} from "@/components/icons/Icons";

export default function ProductsActions({ productId, published }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => setOpen(newOpen);

  const { loading: publishLoading, res: publish } = useServerAction(
    changeProductStatus,
    {
      id: productId,
      action: "publish",
    },
    () => onOpenChange()
  );

  const { loading: draftLoading, res: draft } = useServerAction(
    changeProductStatus,
    {
      id: productId,
      action: "draft",
    },
    () => onOpenChange()
  );

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteProduct({ id: productId });
      setIsModalVisible(false);
      onOpenChange(false);
    } catch (error) {
      toast.error("خطا در حذف محصول");
    } finally {
      setDeleteLoading(false);
    }
  };

  const content = (
    <div className="popContainer min-w-[150px] dark:bg-dark1 border-1 rounded-[8px]">
      <CustomBtn
        disabled={published || draftLoading || deleteLoading}
        onClick={publish}
        classNames={`popButton flex justify-center w-full ${
          published
            ? "text-darkGreen dark:text-darkGreen  bg-lightGreen"
            : "hoverable"
        }`}
        title={
          publishLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div className={`flex w-full items-center  gap-4 rounded-btn `}>
              <Publish />
              <p>منتشر‌شده</p>
            </div>
          )
        }
      />
      <CustomBtn
        disabled={!published || deleteLoading || publishLoading}
        onClick={draft}
        classNames={`popButton flex justify-center w-full ${
          !published
            ? "text-darkOrange dark:text-darkOrange bg-lightOrange"
            : "hoverable"
        }`}
        title={
          draftLoading ? (
            <Loader width={15} height={15} />
          ) : (
            <div className={`flex w-full items-center gap-4`}>
              <Draft />
              <p>پیش‌نویس</p>
            </div>
          )
        }
      />
      <hr />
      <Link href={`/product/${productId}`} className="popButton hoverable">
        <EyeOpen />
        جزئیات
      </Link>
      <Link href={`/product/edit/${productId}`} className="popButton hoverable">
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
            <div className="flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn hover:bg-lightRose text-darkRose">
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
        placement="leftTop"
        content={content}
        overlayInnerStyle={{
          padding: "0",
        }}
      >
        <CustomBtn icon={<MenuDots />} classNames="iconButton" />
      </Popover>
      <CustomConfirmDeleteModal
        title="تایید حذف"
        open={isModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        confirmMessage="آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟"
        loading={deleteLoading}
      />
    </div>
  );
}

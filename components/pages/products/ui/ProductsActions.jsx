"use client";

import Link from "next/link";

import { useState } from "react";

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
} from "@/components/icons/IconS";

export default function ProductsActions({ productId, published }) {
  const [open, setOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await deleteProduct({ id: productId });
      setIsModalVisible(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className="popContainer min-w-[150px]">
      <CustomBtn
        disabled={published || draftLoading || loading}
        onClick={publish}
        classNames={`popButton flex justify-center w-full ${
          published ? "text-darkGreen bg-lightGreen" : "hoverable"
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
        disabled={!published || loading || publishLoading}
        onClick={draft}
        classNames={`popButton flex justify-center w-full ${
          !published ? "text-darkOrange bg-lightOrange" : "hoverable"
        }`}
        title={
          draftLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div className={`flex w-full items-center gap-4`}>
              <Draft />
              <p>پیش‌نویس</p>
            </div>
          )
        }
      />
      <hr />
      <Link href={`/products/${productId}`} className="popButton hoverable">
        <EyeOpen />
        جزئیات
      </Link>
      <Link
        href={`/products/edit/${productId}`}
        className="popButton hoverable"
      >
        <Edit />
        ویرایش
      </Link>
      <hr />
      <CustomBtn
        onClick={() => setIsModalVisible(true)}
        disabled={loading || draftLoading || publishLoading}
        classNames="flex justify-center w-full"
        title={
          loading ? (
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
        visible={isModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        confirmMessage="آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟"
        loading={loading}
      />
    </div>
  );
}

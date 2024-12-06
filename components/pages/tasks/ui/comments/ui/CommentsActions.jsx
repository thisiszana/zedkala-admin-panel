"use client";

import { useState } from "react";
import { Button, Popover, Input, Modal } from "antd";
import { SendOutlined } from "@ant-design/icons";

import Loader from "@/components/shared/Loader";
import { Close, Edit, MenuDots, Trash } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import { icons } from "@/constants";
import { deleteComment, editComment } from "@/actions/task.action";
import toast from "react-hot-toast";

export default function CommentsActions({
  comment,
  currentUser,
  taskID,
  onRefresh,
}) {
  const [newContent, setNewContent] = useState(comment.content);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const closePopover = () => setIsPopoverOpen(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteComment({ commentId: comment._id, taskID });
      toast.success(res.message);
      closePopover();
      onRefresh();
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await editComment({
        taskID,
        commentId: comment._id,
        newContent,
      });
      toast.success(res.message);
      setIsEditing(false);
      onRefresh();
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const popoverContent = (
    <div className="popContainer min-w-[150px] dark:bg-dark1 border-1 rounded-[8px]">
      <CustomBtn
        title={
          <div className="flex w-full items-center py-1 px-2 gap-4 rounded-btn hover:bg-lightRose text-green-600">
            <Edit />
            <p>ویرایش</p>
          </div>
        }
        onClick={() => {
          setIsEditing(true);
          closePopover();
        }}
        classNames="flex justify-center w-full"
        disabled={loading}
      />
      <hr />
      <CustomBtn
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
        onClick={handleDelete}
        disabled={loading}
        classNames="flex justify-center w-full"
      />
    </div>
  );

  if (comment.createdBy._id !== currentUser) return null;

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <Modal
        title="ویرایش"
        open={isEditing}
        // onCancel={onClose}
        footer={null}
      >
        <div className="flex items-center gap-2">
          
          <Input.TextArea
            placeholder="پیام خود را بنویسید..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            autoSize={{ minRows: 1, maxRows: 5 }}
            className="rounded-[8px] border-gray-300 shadow-sm"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleEdit}
            loading={loading}
            disabled={!newContent.trim()}
            className="rounded-[8px]"
          >
            ویرایش
          </Button>
        </div>
      </Modal>
        
      ) : (
        <Popover
          content={popoverContent}
          trigger="click"
          placement="bottomRight"
          open={isPopoverOpen}
          onOpenChange={(open) => setIsPopoverOpen(open)}
          overlayInnerStyle={{
            padding: "0",
          }}
        >
          <CustomBtn icon={<MenuDots />} classNames="iconButton" />
        </Popover>
      )}
    </div>
  );
}

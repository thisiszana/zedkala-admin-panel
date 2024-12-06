"use client";

import { useState } from "react";

import { Button, Popover, Input, Modal, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

import { deleteComment, editComment } from "@/actions/task.action";
import { MenuDots } from "@/components/icons/Icons";
import { tagsComment } from "@/constants";

const { Option } = Select;

export default function CommentsActions({
  comment,
  currentUser,
  taskID,
  onRefresh,
}) {
  const [newContent, setNewContent] = useState(comment.content);
  const [selectedTag, setSelectedTag] = useState(
    tagsComment.find((tag) => tag.value === comment.tagSlug) || null
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const closePopover = () => setIsPopoverOpen(false);
console.log(selectedTag)
  const handleTagChange = (value) => {
    const tag = tagsComment.find((tag) => tag.value === value);
    setSelectedTag(tag);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await editComment({
        taskID,
        commentId: comment._id,
        newContent,
        tag: selectedTag,
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

  const popoverContent = (
    <div className="popContainer min-w-[150px] dark:bg-dark1 border-1 rounded-[8px]">
      <Button
        onClick={() => {
          setIsEditing(true);
          closePopover();
        }}
        disabled={loading}
        className="w-full text-left"
      >
        ویرایش
      </Button>
      <hr />
      <Button
        onClick={handleDelete}
        disabled={loading}
        className="w-full text-left text-red-500"
      >
        حذف
      </Button>
    </div>
  );

  if (comment.createdBy._id !== currentUser) return null;

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <Modal
          title="ویرایش کامنت"
          open={isEditing}
          onCancel={() => setIsEditing(false)}
          footer={null}
        >
          <div className="flex flex-col gap-4">
            <Select
              placeholder="انتخاب تگ"
              className="w-full"
              value={selectedTag?.value}
              onChange={handleTagChange}
            >
              {tagsComment.map((tag) => (
                <Option key={tag.value} value={tag.value}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: tag.color,
                      }}
                    />
                    {tag.label}
                  </span>
                </Option>
              ))}
            </Select>
            <Input.TextArea
              placeholder="متن کامنت را وارد کنید..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleEdit}
              loading={loading}
              disabled={!newContent.trim()}
            >
              ذخیره تغییرات
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
          <Button type="text" icon={<MenuDots />} />
        </Popover>
      )}
    </div>
  );
}

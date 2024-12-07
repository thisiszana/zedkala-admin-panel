"use client";

import { useState } from "react";

import { Modal } from "antd";

import CustomTextarea from "@/components/shared/form/CustomTextarea";
import CustomSelect from "@/components/shared/form/CustomSelect";
import useServerAction from "@/hooks/useServerAction";
import CustomBtn from "@/components/shared/CustomBtn";
import { reviewTask } from "@/actions/task.action";

export default function PreviewModal({ isOpen, onClose, taskID }) {
  const [status, setStatus] = useState("approved");
  const [reviewComment, setReviewComment] = useState("");

  const { loading, res } = useServerAction(
    reviewTask,
    { taskID, status, reviewComment },
    () => onClose()
  );

  const handleSubmit = () => {
    res();
  };

  return (
    <Modal title="بررسی تسک" open={isOpen} onCancel={onClose} footer={null}>
      <div>
        <CustomSelect
          name="status"
          label="وضعیت"
          value={status}
          onChange={setStatus}
          options={[
            { value: "approved", label: "تایید شده" },
            { value: "needsReview", label: "نیاز به بررسی بیشتر" },
          ]}
        />
        <CustomTextarea
          name="reviewComment"
          label="نظر"
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
          wrapperClassName="mt-4"
        />
        <CustomBtn
          type="button"
          onClick={handleSubmit}
          title="ارسال"
          icon={null}
          isLoading={loading}
          disabled={loading || !reviewComment.trim()}
          classNames={`${
            loading ? "bg-lightGray" : "bg-dark1 text-white"
          } flex items-center justify-center w-[150px] dark:bg-lightGray dark:text-dark1 h-[50px] rounded-btn text-p1 font-bold`}
        />
      </div>
    </Modal>
  );
}

"use client";
import { Modal, Button } from "antd";

const CustomConfirmDeleteModal = ({
  visible,
  onConfirm,
  onCancel,
  confirmMessage = "آیا مطمئن هستید که می‌خواهید این مورد را حذف کنید؟",
  confirmButtonText = "حذف",
  cancelButtonText = "لغو",
  loading = false,
}) => {
  return (
    <Modal
      title="تایید حذف"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {cancelButtonText}
        </Button>,
        <Button
          key="confirm"
          type="primary"
          danger
          loading={loading}
          onClick={onConfirm}
        >
          {confirmButtonText}
        </Button>,
      ]}
    >
      <p>{confirmMessage}</p>
    </Modal>
  );
};

export default CustomConfirmDeleteModal;

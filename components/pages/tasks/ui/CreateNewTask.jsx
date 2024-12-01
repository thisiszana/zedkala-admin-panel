"use client";

import { useState } from "react";

import { AddFolder } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import TaskForm from "./TaskForm";

export default function CreateNewTask({ session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full flex justify-end">
      <CustomBtn
        icon={<AddFolder />}
        title="ایجاد تسک"
        classNames="bg-dark1 text-white rounded-btn py-2.5 px-5 flex items-center gap-3 font-medium ml-3"
        onClick={openModal}
      />
      {isModalOpen && (
        <TaskForm
          type="create"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
          taskID={null}
          session={session}
        />
      )}
    </div>
  );
}

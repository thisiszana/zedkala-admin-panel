"use client";

import { useState } from "react";

import { AddFolder } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import TaskForm from "./TaskForm";
import TasksFilter from "./TasksFilter";

export default function CreateNewTask({ session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full flex flex-col-reverse items-center justify-between gap-5 sm:flex-row sm:gap-8">
      <TasksFilter />
      <CustomBtn
        icon={<AddFolder />}
        title="ایجاد تسک"
        classNames="bg-dark1 text-white dark:bg-white dark:text-dark1 rounded-btn py-2.5 px-5 flex items-center gap-3 font-medium ml-3"
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

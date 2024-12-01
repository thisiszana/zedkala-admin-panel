"use client";

import { useState } from "react";

import CustomBtn from "@/components/shared/CustomBtn";
import { Edit } from "@/components/icons/Icons";
import TaskForm from "./TaskForm";

export default function EditTask({ id, session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <CustomBtn
        type="button"
        icon={<Edit size={15} />}
        classNames="rounded-full w-[35px] h-[35px] flex items-center justify-center hoverable"
        onClick={openModal}
      />
      {isModalOpen && (
        <TaskForm
          type="edit"
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          closeModal={closeModal}
          taskID={id}
          session={session}
        />
      )}
    </>
  );
}

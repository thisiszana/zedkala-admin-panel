"use client";

import { Trash } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import CustomTextarea from "@/components/shared/form/CustomTextarea";
import { useState } from "react";

export default function ExpertReview({ form, setForm }) {
  const [expertReview, setExpertReview] = useState(form.expertReview);

  const handleExpertReview = (index, field, value) => {
    const updateExpertReview = [...expertReview];
    updateExpertReview[index][field] = value;
    setExpertReview(updateExpertReview);
    setForm({
      ...form,
      expertReview: updateExpertReview,
    });
  };

  const handleRemoveExpertReview = (index) => {
    console.log(index);
    const updateExpertReview = expertReview.filter((_, i) => i !== index);
    setExpertReview(updateExpertReview);
    setForm({
      ...form,
      expertReview: updateExpertReview,
    });
  };

  const canAddExpertReview = expertReview.every(
    (exp) => exp.title.trim() !== "" && exp.description.trim() !== ""
  );

  const handleAddExpertReview = () => {
    if (canAddExpertReview) {
      setExpertReview([...expertReview, { title: "", description: "" }]);
    }
  };

  const expertReviewFields = expertReview.map((exp, index) => (
    <div key={index} className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name={`exp-title-${index}`}
        value={exp.title}
        label="عنوان"
        onChange={(e) => handleExpertReview(index, "title", e.target.value)}
      />
      <CustomTextarea
        type="text"
        name={`exp-desc-${index}`}
        value={exp.description}
        label="نوضیحات"
        onChange={(e) =>
          handleExpertReview(index, "description", e.target.value)
        }
      />
      <CustomBtn
        type="button"
        icon={<Trash />}
        onClick={() => handleRemoveExpertReview(index)}
        disabled={index <= 0}
        classNames="bg-red-500 text-white px-4 py-[18px] w-fit rounded-[10px] mb-5"
      />
    </div>
  ));
  return (
    <div className="flex flex-col w-full">
      {expertReviewFields}{" "}
      <CustomBtn
        type="button"
        onClick={handleAddExpertReview}
        title="اضافه"
        disabled={!canAddExpertReview}
        classNames={`w-fit bg-dark1 dark:bg-white dark:text-dark1 text-white px-4 py-2 rounded ${
          !canAddExpertReview ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

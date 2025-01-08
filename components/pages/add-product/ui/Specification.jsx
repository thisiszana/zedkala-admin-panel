"use client";

import { Trash } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import { useState } from "react";

export default function Specification({ form, setForm }) {
  const [specifications, setSpecifications] = useState(form.specifications);

  const handleAddSpecifications = () => {
    const allTitlesFilled = specifications.every(
      (spec) => spec.title.trim() !== ""
    );

    if (allTitlesFilled) {
      const updatedSpecifications = [
        ...specifications,
        { title: "", items: [{ label: "", value: "" }] },
      ];
      setSpecifications(updatedSpecifications);
      setForm((prevForm) => ({
        ...prevForm,
        specifications: updatedSpecifications,
      }));
    }
  };

  const handleAddItem = (index) => {
    const updatedSpecifications = [...specifications];
    const allLabelsFilled = updatedSpecifications[index].items.every(
      (item) => item.label.trim() !== ""
    );

    if (allLabelsFilled) {
      updatedSpecifications[index].items.push({ label: "", value: "" });
      setSpecifications(updatedSpecifications);
    }
  };

  const handleTitleChange = (index, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index].title = value;
    setSpecifications(updatedSpecifications);
  };

  const handleItemChange = (specIndex, itemIndex, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[specIndex].items[itemIndex][field] = value;
    setSpecifications(updatedSpecifications);
  };

  const handleRemoveSpecifications = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
    setForm({
      ...form,
      specifications: updatedSpecifications,
    });
  };

  const handleRemoveItem = (specIndex, itemIndex) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[specIndex].items = updatedSpecifications[
      specIndex
    ].items.filter((_, i) => i !== itemIndex);

    setSpecifications(updatedSpecifications);
  };

  const canAddSpecifications = specifications.every(
    (spec) => spec.title.trim() !== "" && spec.items.length > 0
  );

  const canAddItem = (index) =>
    specifications[index].items.every(
      (item) => item.label.trim() !== "" || item.value.trim() !== ""
    );

  const specificationFields = specifications.map((spec, specIndex) => (
    <div key={`spec-${specIndex}`} className="space-y-4">
      <div className="flex items-center gap-2">
        <CustomInp
          type="text"
          name={`spec-title-${specIndex}`}
          value={spec.title}
          label="عنوان"
          onChange={(e) => handleTitleChange(specIndex, e.target.value)}
          wrapperClassName="flex flex-5"
        />
        {specIndex > 0 && (
          <CustomBtn
            type="button"
            icon={<Trash />}
            classNames="bg-red-500 text-white px-4 py-[18px] rounded-[10px]"
            onClick={() => handleRemoveSpecifications(specIndex)}
            disabled={specIndex <= 0}
          />
        )}
      </div>
      {spec.items.map((item, itemIndex) => (
        <div
          key={`spec-${specIndex}-item-${itemIndex}`}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <CustomInp
            type="text"
            name={`spec-${specIndex}-label-${itemIndex}`}
            value={item.label}
            label="برچسب"
            onChange={(e) =>
              handleItemChange(specIndex, itemIndex, "label", e.target.value)
            }
            wrapperClassName="flex flex-5"
          />
          <CustomInp
            type="text"
            name={`spec-${specIndex}-value-${itemIndex}`}
            value={item.value}
            label="مقدار"
            onChange={(e) =>
              handleItemChange(specIndex, itemIndex, "value", e.target.value)
            }
            wrapperClassName="flex flex-5"
          />
          {itemIndex > 0 && (
            <CustomBtn
              type="button"
              icon={<Trash />}
              classNames="bg-red-500 text-white px-4 py-[18px] rounded-[10px]"
              onClick={() => handleRemoveItem(specIndex, itemIndex)}
              disabled={itemIndex <= 0}
            />
          )}
        </div>
      ))}
      <CustomBtn
        type="button"
        title="اضافه کردن آیتم"
        onClick={() => handleAddItem(specIndex)}
        classNames={`bg-dark1 dark:bg-white dark:text-dark1 text-white px-4 py-2 rounded ${
          !canAddItem(specIndex) ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!canAddItem(specIndex)}
      />
    </div>
  ));
  return (
    <div className="flex flex-col gap-4 flex-5">
      {specificationFields}
      <CustomBtn
        classNames={`bg-dark1 dark:bg-white dark:text-dark1 text-white px-4 py-2 rounded ${
          !canAddSpecifications ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="button"
        onClick={handleAddSpecifications}
        title="اضافه کردن مجموعه جدید"
        disabled={!canAddSpecifications}
      />
    </div>
  );
}

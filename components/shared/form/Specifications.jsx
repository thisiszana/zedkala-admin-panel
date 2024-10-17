"use client";

import { useState } from "react";
import CustomInp from "./CustomInp";
import CustomBtn from "../CustomBtn";
import { Trash } from "@/components/icons/Icons";

export default function Specifications({ form, setForm }) {
  const [specifications, setSpecifications] = useState(
    form.specifications || [{ label: "", value: "" }]
  );

  console.log(form)

  const handleAddSpecification = () => {
    const allLabelsFilled = specifications.every(
      (spec) => spec.label.trim() !== ""
    );

    if (allLabelsFilled) {
      setSpecifications([...specifications, { label: "", value: "" }]);
    }
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
    setForm({
      ...form,
      specifications: updatedSpecifications,
    });
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
    setForm({
      ...form,
      specifications: updatedSpecifications,
    });
  };

  const canAddSpecification = specifications.every(
    (spec) => spec.label.trim() !== ""
  );

  const specificationFields = specifications.map((spec, index) => (
    <div key={index} className="flex gap-4 items-center">
      <CustomInp
        type="text"
        name={`spec-label-${index}`}
        value={spec.label}
        label="برچسب"
        onChange={(e) =>
          handleSpecificationChange(index, "label", e.target.value)
        }
        wrapperClassName="flex flex-1"
      />
      <CustomInp
        type="text"
        name={`spec-value-${index}`}
        value={spec.value}
        label="مقدار"
        onChange={(e) =>
          handleSpecificationChange(index, "value", e.target.value)
        }
        wrapperClassName="flex flex-1"
      />
      <CustomBtn
        type="button"
        icon={<Trash />}
        className="bg-red-500 text-white px-4 py-2 rounded"
        disabled={index === 0}
        onClick={() => handleRemoveSpecification(index)}
      />
    </div>
  ));

  return (
    <div className="flex flex-col xl:flex-row justify-between items-center gap-8 lg:gap-20">
      <div className="flex flex-col gap-4 w-full">
        {specificationFields}{" "}
        <CustomBtn
          classNames={`bg-dark1 text-white px-4 py-2 rounded ${
            !canAddSpecification ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
          onClick={handleAddSpecification}
          title="اضافه"
          disabled={!canAddSpecification}
        />
      </div>
    </div>
  );
}

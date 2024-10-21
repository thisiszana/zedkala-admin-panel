"use client";

import { useEffect, useState } from "react";

import { SketchPicker } from "react-color";
import { Modal, Input, Tooltip } from "antd";

import { Trash } from "@/components/icons/Icons";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";

export default function Specifications({ form, setForm }) {
  const [specifications, setSpecifications] = useState(form.specifications);

  const [colors, setColors] = useState(
     []
  );
  const [currentColor, setCurrentColor] = useState("#fff");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newColor, setNewColor] = useState("");

  const handleAddColor = () => {
    if (!colors.includes(currentColor)) {
      const updatedColors = [...colors, currentColor];
      setColors(updatedColors);
      setForm((prevForm) => ({
        ...prevForm,
        colors: updatedColors,
      }));
      localStorage.setItem("colors", JSON.stringify(updatedColors));
    }
  };

  const showModal = (index) => {
    setEditIndex(index);
    setNewColor(colors[index]);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const updatedColors = colors.map((color, i) =>
      i === editIndex ? newColor : color
    );
    setColors(updatedColors);
    setForm({ ...form, colors: updatedColors });
    localStorage.setItem("colors", JSON.stringify(updatedColors));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemoveColor = (color) => {
    const updatedColors = colors.filter((c) => c !== color);
    setColors(updatedColors);
    setForm({ ...form, colors: updatedColors });
    localStorage.setItem("colors", JSON.stringify(updatedColors));
  };

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
        wrapperClassName=" flex flex-5"
      />
      <CustomInp
        type="text"
        name={`spec-value-${index}`}
        value={spec.value}
        label="مقدار"
        onChange={(e) =>
          handleSpecificationChange(index, "value", e.target.value)
        }
        wrapperClassName="flex flex-5"
      />
      <CustomBtn
        type="button"
        icon={<Trash />}
        classNames="bg-red-500 text-white px-4 py-[18px] rounded-[10px]"
        disabled={index === 0}
        onClick={() => handleRemoveSpecification(index)}
      />
    </div>
  ));

  // useEffect(() => {
  //   const savedSpecifications = JSON.parse(
  //     localStorage.getItem("specifications")
  //   );
  //   if (savedSpecifications) setSpecifications(savedSpecifications);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("specifications", JSON.stringify(specifications));
  // }, [specifications]);

  return (
    <div className="flex flex-col xl:flex-row justify-between items-center gap-8 lg:gap-20">
      <div className="flex flex-col gap-4 flex-5">
        {specificationFields}
        <CustomBtn
          classNames={`bg-dark1 dark:bg-white dark:text-dark1 text-white px-4 py-2 rounded ${
            !canAddSpecification ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="button"
          onClick={handleAddSpecification}
          title="اضافه"
          disabled={!canAddSpecification}
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <SketchPicker
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        />
        <CustomBtn
          classNames="bg-dark1 dark:bg-white dark:text-dark1 text-white px-4 py-2 rounded"
          type="button"
          onClick={handleAddColor}
          title="افزودن رنگ"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2 w-[420px]">
        {colors?.map((color, index) => (
          <Tooltip key={index} title="ویرایش رنگ">
            {" "}
            <div className="flex items-center gap-2 border-1 border-dark1 dark:border-white px-2 py-1 rounded">
              <div
                style={{
                  backgroundColor: color,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                }}
                onClick={() => showModal(index)}
              />
              <CustomBtn
                type="button"
                icon={<Trash width={15} />}
                classNames="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveColor(color)}
              />
            </div>
          </Tooltip>
        ))}
      </div>
      <Modal
        title="ویرایش رنگ"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="تایید"
        cancelText="لغو"
        okButtonProps={{ className: "bg-red-500 text-white hover:bg-red-600" }}
        cancelButtonProps={{
          className: "bg-gray-300 text-black hover:bg-gray-400",
        }}
      >
        <Input
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="کد رنگ جدید را وارد کنید"
        />
      </Modal>
    </div>
  );
}

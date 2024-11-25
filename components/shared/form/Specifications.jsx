"use client";

import { useEffect, useState } from "react";

import { Modal, Input, Tooltip, Select } from "antd";
import { SketchPicker } from "react-color";

import { Trash } from "@/components/icons/Icons";
import { sizesDefault } from "@/constants";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";

export default function Specifications({ form, setForm }) {
  const [specifications, setSpecifications] = useState(form.specifications);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState("#fff");
  const [selectedSize, setSelectedSize] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [newColor, setNewColor] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);


  useEffect(() => {
    setColors(form.colors || []);
    setSizes(form.sizes || []);
  }, [form.colors, form.sizes]);

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

  const handleAddSize = () => {
    if (selectedSize && !sizes.includes(selectedSize)) {
      const updatedSizes = [...sizes, selectedSize];
      setSizes(updatedSizes);
      setForm((prevForm) => ({
        ...prevForm,
        sizes: updatedSizes,
      }));
    }
    if (customSize && !sizes.includes(customSize)) {
      const updatedSizes = [...sizes, customSize];
      setSizes(updatedSizes);
      setForm((prevForm) => ({
        ...prevForm,
        sizes: updatedSizes,
      }));
      setCustomSize("");
    }
  };

  const handleRemoveSize = (size) => {
    const updatedSizes = sizes.filter((s) => s !== size);
    setSizes(updatedSizes);
    setForm({ ...form, sizes: updatedSizes });
  };

  const specificationFields = specifications.map((spec, index) => (
    <div key={index} className="flex flex-col sm:flex-row gap-4 items-center ">
      <CustomInp
        type="text"
        name={`spec-label-${index}`}
        value={spec.label}
        label="برچسب"
        onChange={(e) =>
          handleSpecificationChange(index, "label", e.target.value)
        }
        wrapperClassName="flex flex-5"
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
        onClick={() => handleRemoveSpecification(index)}
      />
    </div>
  ));

  return (
    <div className="w-full flex flex-col 2xl:flex-row justify-between items-center gap-8 lg:gap-20">
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
      <div className="flex flex-col gap-4 items-center">
        <SketchPicker
          color={currentColor}
          onChangeComplete={(color) => setCurrentColor(color.hex)}
        />
        <CustomBtn
          classNames="bg-dark1 dark:bg-lightGray dark:text-dark1 text-white px-4 py-2 rounded"
          type="button"
          onClick={handleAddColor}
          title="افزودن رنگ"
        />
        <div className="flex flex-wrap gap-2 w-full sm:w-[420px]">
          {colors?.map((color, index) => (
            <Tooltip key={index} title="ویرایش رنگ">
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
        <div className="flex flex-col items-center  gap-2 w-full sm:w-auto">
          <Select
            placeholder="انتخاب سایز استاندارد"
            onChange={(value) => setSelectedSize(value)}
            style={{ width: "100%", maxWidth: 200 }}
          >
            {sizesDefault.map((size,index) => (
              <Select.Option key={index} value={size}>
                {size}
              </Select.Option>
            ))}
          </Select>
          <Input
            placeholder="یا سایز دلخواه وارد کنید"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            style={{ width: "100%", maxWidth: 200 }}
          />
          <CustomBtn
            classNames="bg-dark1 dark:bg-lightGray dark:text-dark1 text-white px-4 py-2 rounded w-fit  sm:w-full sm:w-auto"
            type="button"
            onClick={handleAddSize}
            title="افزودن سایز"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-[420px]">
          {sizes?.map((size, index) => (
            <Tooltip key={index} title="حذف سایز">
              <div className="flex items-center justify-center gap-2 border-1 border-dark1 dark:border-white px-2 py-1 rounded">
                <span>{size}</span>
                <CustomBtn
                  type="button"
                  icon={<Trash width={15} />}
                  classNames="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveSize(size)}
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <Modal
        title="ویرایش رنگ"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SketchPicker
          color={newColor}
          onChangeComplete={(color) => setNewColor(color.hex)}
        />
      </Modal>
    </div>
  );
}

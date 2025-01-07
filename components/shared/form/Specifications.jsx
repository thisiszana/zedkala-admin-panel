"use client";

import { useEffect, useState } from "react";

import { Modal, Input, Tooltip, Select } from "antd";
import { SketchPicker } from "react-color";

import Specification from "@/components/pages/add-product/ui/Specification";
import { Trash } from "@/components/icons/Icons";
import { sizesDefault } from "@/constants";
import CustomBtn from "../CustomBtn";
import WeightForm from "@/components/pages/add-product/ui/WeightForm";
import VendorSelector from "@/components/pages/add-product/ui/VendorSelector";

export default function Specifications({ form, setForm }) {
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

  return (
    <div className="w-full flex flex-col 2xl:flex-row justify-between items-center gap-8 lg:gap-20">
      <Specification form={form} setForm={setForm} />
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
            {sizesDefault.map((size, index) => (
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
        <WeightForm form={form} setForm={setForm} />
        <VendorSelector form={form} setForm={setForm} />
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

"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { CircleClose, Trash } from "@/components/icons/Icons";
import { MESSAGES } from "@/utils/message";
import CustomBtn from "../CustomBtn";

// In this section, when receiving product data for editing, they are not placed correctly.

const SubCategoryItemsSelection = ({ setForm, subCategoryItems }) => {
  const [items, setItems] = useState(subCategoryItems || []);
  const [selectItems, setSelectItems] = useState([]);

  const onSelectItem = (e) => {
    const selectedItem = e.target.value;

    if (selectItems.includes(selectedItem))
      toast.error(MESSAGES.existItemCategory);

    setItems([...items, selectedItem]);
    setSelectItems([...selectItems, selectedItem]);
    toast.success(MESSAGES.addItemCategory);
  };

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      subCategories: prevForm.subCategories.map((sub) => ({
        ...sub,
        items: selectItems,
      })),
    }));
  }, [items, setSelectItems]);

  const removeItem = (item) => {
    const newItems = items.filter((i) => i !== item);
    setItems(newItems);
    setSelectItems(newItems);
  };

  const clearAllItems = () => {
    setItems([]);
    setSelectItems([]);
    setForm((prevForm) => ({
      ...prevForm,
      subCategories: prevForm.subCategories.map((sub) => ({
        ...sub,
        items: [],
      })),
    }));
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-2">
        <select
          onChange={onSelectItem}
          className="input w-full dark:text-white dark:bg-dark1"
        >
          <option value="" className="mt-5">
            یک آیتم از زیردسته‌بندی انتخاب کنید...
          </option>
          {subCategoryItems.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {items.length !== 0 && (
        <div className="flex gap-2 items-center flex-wrap mt-3">
          {selectItems.map((item) => (
            <CustomBtn
              key={item}
              type="button"
              onClick={() => removeItem(item)}
              classNames="rounded-btn flex items-center gap-btn bg-dark1 hover:bg-dark2 Transition py-[2.5px] px-1.5 group"
              title={
                <>
                  <span className="text-lightGray text-p2">{item}</span>
                  <CircleClose
                    size={18}
                    className="text-darkGray group-hover:text-lightGray Transition"
                  />
                </>
              }
            />
          ))}
          <CustomBtn
            type="button"
            onClick={clearAllItems}
            classNames="rounded-btn flex items-center gap-btn text-[#ff5630] hover:bg-lightOrange Transition p-2"
            title={<p className="text-p1 font-bold">حذف همه</p>}
            icon={<Trash />}
          />
        </div>
      )}
    </div>
  );
};

export default SubCategoryItemsSelection;

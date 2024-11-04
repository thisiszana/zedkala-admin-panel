"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CircleClose, Trash } from "@/components/icons/Icons";
import CustomInp from "./CustomInp";
import CustomBtn from "../CustomBtn";

const SubCategoryItemsSelection = ({ form, setForm, subCategoryItems }) => {
  const [items, setItems] = useState(subCategoryItems || []);
  const [selectItems, setSelectItems] = useState([]);
  const [value, setValue] = useState("");

  const onSelectItem = (event) => {
    const selectedItem = event.target.value;

    if (selectItems.find((item) => item === selectedItem)) {
      toast.error("شما قبلاً این آیتم را انتخاب کرده‌اید");
      return;
    }

    setItems([...items, selectedItem]);
    setSelectItems([...selectItems, selectedItem]);
    toast.success("آیتم اضافه شد");
  };

  useEffect(() => {
    setForm({
      ...form,
      subCategories: { ...form.subCategories, items: selectItems },
    });
  }, [items]);

  const removeItem = (item) => {
    const newItems = items.filter((i) => i !== item);
    setItems(newItems);
    setSelectItems(newItems);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-2">
        <select
          value={value}
          onChange={onSelectItem}
          className="input w-full dark:text-white bg-red-400"
        >
          <option value="">یک آیتم از زیردسته‌بندی انتخاب کنید...</option>
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
            onClick={() => setItems([])}
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

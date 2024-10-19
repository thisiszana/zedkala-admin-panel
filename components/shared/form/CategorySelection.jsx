"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/actions/category.action";

export default function CategorySelection({ name, form, label, onChange }) {
  const [categories, setCategories] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { category } = await getCategories();
        setCategories(JSON.parse(JSON.stringify(category)));
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorState(true);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(
      (c) => c.categoryName === form.categoryName
    );
    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategories || []);
    } else {
      setSubCategories([]);
    }
  }, [form.categoryName, categories]);

  return (
    <div className="flex flex-wrap gap-box w-full h-full">
      <select
        name="categoryName"
        className="input w-full dark:text-white"
        value={form.categoryName}
        onChange={onChange}
      >
        <option value="">دسته‌بندی را انتخاب کنید ...</option>
        {errorState ? ( 
          <option value="" disabled className="text-center text-red-500">
            خطا در ارتباط با سرور
          </option>
        ) : (
          categories.map((c) => (
            <option key={c._id} value={c.categoryName}>
              {c.categoryName}
            </option>
          ))
        )}
      </select>
      {subCategories.length > 0 && (
        <select
          name="subCategories"
          className="input w-full dark:text-white"
          value={form.subCategories}
          onChange={onChange}
        >
          <option value="">زیر ‌دسته‌بندی را انتخاب کنبد...</option>
          {subCategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

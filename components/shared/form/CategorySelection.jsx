"use client";

import { useEffect, useState } from "react";

import { getCategories } from "@/actions/category.action";

export default function CategorySelection({ name, form, label, onChange }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { category } = await getCategories();
        setCategories(category);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
        className="input w-full"
        value={form.categoryName}
        onChange={onChange}
      >
        <option value="">دسته‌بندی را انتخاب کنید ...</option>
        {categories.map((c) => (
          <option key={c._id} value={c.categoryName}>
            {c.categoryName}
          </option>
        ))}
      </select>
      {subCategories.length > 0 && (
        <select
          name="subCategories"
          className="input w-full"
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
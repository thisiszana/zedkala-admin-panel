"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/actions/category.action";
import CustomInp from "./CustomInp";

export default function CategorySelection({ name, form, label, onChange }) {
  const [categories, setCategories] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { category } = await getCategories();
        setCategories(category);
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
      setSlug(selectedCategory.slug);
      onChange({ target: { name: "slug", value: selectedCategory.slug } });
    } else {
      setSubCategories([]);
      setSlug("");
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
      {slug.length > 0 && (
        <CustomInp
          label="اسلاگ"
          type="text"
          name="slug"
          value={slug}
          onChange={onChange}
          wrapperClassName="w-full dark:text-white"
          readOnly
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import SubCategoryItemsSelection from "./SubCategoryItemsSelection";
import { getCategories } from "@/actions/category.action";
import CustomInp from "./CustomInp";

export default function CategorySelection({ form, setForm, onChange }) {
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategoryItems, setSelectedSubCategoryItems] = useState([]);

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
      (c) => c.name === form.categoryName
    );
    if (selectedCategory) {
      const formattedSubcategories = selectedCategory.subcategories.map(
        (sub) => ({
          name: sub.name,
          items: sub.items.map((item) => item.name),
        })
      );
      console.log(formattedSubcategories)
      setSubCategories(formattedSubcategories);
      setSlug(selectedCategory.slug);
      setForm((prevForm) => ({ ...prevForm, slug: selectedCategory.slug }));
    } else {
      setSubCategories([]);
      setSlug("");
      setSelectedSubCategoryItems([]);
    }
  }, [form.categoryName, categories]);

  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = subCategories.find(
      (sub) => sub.name === e.target.value
    );

    setSelectedSubCategoryItems(
      selectedSubCategory ? selectedSubCategory.items : []
    );

    setForm((prevForm) => ({
      ...prevForm,
      subCategories: selectedSubCategory ? [{ ...selectedSubCategory }] : [],
    }));
  };

  return (
    <div className="flex flex-wrap gap-box w-full h-full">
      <select
        name="categoryName"
        className="input w-full dark:text-white dark:bg-dark1"
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
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))
        )}
      </select>

      {subCategories.length > 0 && (
        <select
          name="subCategory"
          className="input w-full dark:text-white dark:bg-dark1"
          onChange={handleSubCategoryChange}
        >
          <option value="">زیر‌دسته‌بندی را انتخاب کنید...</option>
          {subCategories.map((sub) => (
            <option key={sub.name} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>
      )}
      {selectedSubCategoryItems.length > 0 && (
        <SubCategoryItemsSelection
          form={form}
          setForm={setForm}
          subCategoryItems={selectedSubCategoryItems}
        />
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

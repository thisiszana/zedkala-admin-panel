"use client";

import { useEffect, useState } from "react";

import CategoryForm from "@/components/shared/form/CategoryForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddCategoryPage({ category }) {
  const [form, setForm] = useState({
    categoryName: "",
    subCategories: category?.subCategories || [],
    image: "",
    published: false,
  });

  useEffect(() => {
    if (category) setForm(category);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <PageHeading title="افزودن دسته بندی" />
      <CategoryForm
        type={`${category ? "EDIT" : "CREATE"}`}
        form={form}
        setForm={setForm}
        onChange={onChange}
        id={category?._id}
      />
    </>
  );
}

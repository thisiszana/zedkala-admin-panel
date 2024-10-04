"use client";

import { useState } from "react";

import CategoryForm from "@/components/shared/form/CategoryForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddCategoryPage() {
  const [form, setForm] = useState({
    categoryName: "",
    subCategories: [],
    image: "",
    published: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <PageHeading title="افزودن دسته بندی" />
      <CategoryForm
        type="create"
        form={form}
        setForm={setForm}
        onChange={onChange}
      />
    </>
  );
}

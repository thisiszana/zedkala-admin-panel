"use client";

import { useEffect, useState } from "react";

import ProductForm from "@/components/shared/form/ProductForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    discount: [{ value: 0, title: "", expiresAt: new Date() }],
    categoryName: "",
    subCategories: "",
    specifications: [{ label: "", value: "" }],
    colors: [],
    brand: "",
    keywords: [],
    returnPolicy: "",
    published: false,
    warranty: "",
    insurance: [
      {
        insuranceType: "",
        insuranceDuration: 0,
        insuranceCost: 0,
        insuranceTerms: "",
        optionalInsurance: true,
        mandatoryInsurance: false,
      },
    ],
  });

  // useEffect(() => {
  //   const savedForm = JSON.parse(localStorage.getItem("form"));
  //   if (savedForm) {
  //     setForm(savedForm);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("form", JSON.stringify(form));
  // }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <PageHeading title="اضافه کردن محصول جدید" />
      <ProductForm
        type="add"
        form={form}
        setForm={setForm}
        onChange={onChange}
      />
    </>
  );
}

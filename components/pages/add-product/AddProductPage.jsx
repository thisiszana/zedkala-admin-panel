"use client";

import ProductForm from "@/components/shared/form/ProductForm";
import PageHeading from "@/components/shared/PageHeading";
import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    discount: [{ value: 0, title: "", expiresAt: new Date() }],
    categoryName: "",
    subCategories: "",
    keywords: [],
    brand: "",
    colors: [],
    returnPolicy: "",
    published: false,
    specifications: [{ label: "", value: "" }],
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

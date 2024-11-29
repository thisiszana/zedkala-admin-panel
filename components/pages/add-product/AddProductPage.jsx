"use client";

import { useEffect, useState } from "react";

import ProductForm from "@/components/shared/form/ProductForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddProductPage({ data }) {
  const [form, setForm] = useState({
    title: data?.title || "",
    slug: data?.slug || "",
    description: data?.description || "",
    images: [],
    price: data?.price || 0,
    stock: data?.stock || 0,
    discount: data?.discount || [],
    categoryName: data?.categoryName || "",
    subCategories: data?.subCategories || [],
    specifications: data?.specifications || [{ label: "", value: "" }],
    colors: data?.colors || [],
    sizes: data?.sizes || [],
    brand: data?.brand || "",
    keywords: data?.keywords || [],
    returnPolicy: data?.returnPolicy || "",
    published: data?.published || false,
    warranty: data?.warranty || "",
    deliveryOptions: data?.deliveryOptions || [
      { fastDelivery: false, freeDelivery: false },
    ],
    insurance: data?.insurance || [
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

  useEffect(() => {
    if (data?.subCategories) {
      setForm((prevForm) => ({
        ...prevForm,
        subCategories: data.subCategories,
      }));
    }
  }, [data?.subCategories]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  // console.log("form in addproductpage com", form);
  return (
    <>
      <PageHeading title={`${data ? "ویرایش محصول" : "افزودن محصول"}`} />
      <ProductForm
        type={`${data ? "EDIT" : "CREATE"}`}
        form={form}
        setForm={setForm}
        onChange={onChange}
        editImage={data?.images}
        id={data?._id}
      />
    </>
  );
}

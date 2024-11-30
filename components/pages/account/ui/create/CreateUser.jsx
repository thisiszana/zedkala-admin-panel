"use client";

import { useState } from "react";

import { notification } from "antd";
import toast from "react-hot-toast";

import CustomSelect from "@/components/shared/form/CustomSelect";
import VendorRegistrationForm from "./ui/VendorRegistrationForm";
import CustomSwitch from "@/components/shared/form/CustomSwitch";
import { createAdminByOwner } from "@/actions/auth.action";
import CustomInp from "@/components/shared/form/CustomInp";
import DetailedBox from "@/components/shared/DetailedBox";
import { createVendor } from "@/actions/vendor.action";
import CustomBtn from "@/components/shared/CustomBtn";
import { uploadImages } from "@/utils/fun";
import { MESSAGES } from "@/utils/message";
import { rollOptions } from "@/constants";

export default function CreateUser() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: "",
    roll: "USER",
    storeInfo: { storeName: "", storeAddress: "", images: [] },
    productCategory: "",
    images: [],
    taxCode: "",
    businessLicense: null,
    terms: false,
  });

  const [api, contextHolder] = notification.useNotification();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRollChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      roll: value,
    }));

    if (value === "VENDOR") {
      api.open({
        message: MESSAGES.vendorAddInfoMess,
        description: MESSAGES.vendorAddInfoDesc,
        placement: "topRight",
        duration: 10,
      });
    }
  };

  const basicDetails = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="text"
        label="نام کاربری *"
        name="username"
        value={form.username}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
      <CustomInp
        type="text"
        label="نام *"
        name="firstName"
        value={form.firstName}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
      <CustomInp
        type="text"
        label="نام خانوادگی *"
        name="lastName"
        value={form.lastName}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
      <CustomInp
        type="email"
        label="ایمیل"
        name="email"
        value={form.email}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
    </div>
  );

  const aboutDetails = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="text"
        label="شماره تماس"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
      <CustomInp
        type="text"
        label="کشور"
        name="country"
        value={form.country}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
      {form?.roll !== "VENDOR" && (
        <CustomInp
          type="text"
          label="آدرس"
          name="address"
          value={form.address}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
        />
      )}
    </div>
  );

  const passDetails = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="password"
        label="رمز عبور *"
        name="password"
        value={form.password}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
      <CustomInp
        type="password"
        label="تایید رمز عبور *"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
      />
    </div>
  );

  console.log(form);
  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.username ||
      !form.firstName ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error(MESSAGES.fillInp);
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error(MESSAGES.confirmPassword);
      return;
    }

    const meliImages = await uploadImages(form.images);
    const storeImages = await uploadImages(form.storeInfo.images);

    const payload = {
      ...form,
      images: meliImages,
      storeInfo: {
        ...form.storeInfo,
        images: storeImages,
      },
    };

    setLoading(true);

    try {
      let response;
      if (form.roll === "VENDOR") {
        response = await createVendor(payload);
      } else {
        response = await createAdminByOwner(form);
      }

      if (response.code === 201) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(MESSAGES.error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}{" "}
      <div className="space-y-8">
        <DetailedBox
          title="اطلاعات کاربر"
          subtitle="نام، نام خانوادگی و ..."
          content={basicDetails}
        />
        <DetailedBox
          title="درباره کاربر"
          subtitle="شماره تماس و ..."
          content={aboutDetails}
        />
        <DetailedBox title="رمز عبور کاربر" content={passDetails} />
        <DetailedBox
          title="نقش کاربر"
          content={
            <CustomSelect
              name="roll"
              label="نقش"
              options={rollOptions}
              value={form.roll}
              onChange={handleRollChange}
            />
          }
        />
        {form.roll === "VENDOR" && (
          <VendorRegistrationForm
            form={form}
            setForm={setForm}
            onChange={onChange}
          />
        )}
        <div className="flex items-center justify-end gap-10 space-x-8">
          {form.roll === "VENDOR" && (
            <div className="flex items-center gap-2">
              <CustomSwitch
                id="terms"
                label="با قوانین موافقت میکنید؟"
                checked={form.terms}
                onChange={(checked) => {
                  setForm((prevForm) => ({ ...prevForm, terms: checked }));
                }}
                name="terms"
              />
            </div>
          )}
          <CustomBtn
            title="ایجاد"
            type="button"
            onClick={onSubmit}
            classNames={`${
              loading ? "bg-lightGray" : "bg-dark1 text-white"
            } flex items-center justify-center w-[150px] dark:bg-lightGray dark:text-dark1 h-[50px] rounded-btn text-p1 font-bold ml-4`}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  );
}

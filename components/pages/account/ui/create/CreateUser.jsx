"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import CustomSelect from "@/components/shared/form/CustomSelect";
import { createAdminByOwner } from "@/actions/auth.action";
import CustomInp from "@/components/shared/form/CustomInp";
import DetailedBox from "@/components/shared/DetailedBox";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import { MESSAGES } from "@/utils/message";

export default function CreateUser() {
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
  });

  const { loading, res } = useServerAction(createAdminByOwner, form);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.firstName ||
      !form.password ||
      !form.confirmPassword
    )
      toast.error(MESSAGES.fillInp);

    if (form.password !== form.confirmPassword)
      toast.error(MESSAGES.confirmPassword);

    res();
  };
  return (
    <DetailedBox
      title="ادمین جدید"
      content={
        <form
          className="box w-full h-fit flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          <div className="w-full h-fit flex flex-wrap gap-5">
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
            <CustomInp
              type="text"
              label="آدرس"
              name="address"
              value={form.address}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomSelect
              name="roll"
              label="نقش"
              options={["ADMIN", "USER"]}
              value={form.roll}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
          </div>
          <div className="w-full flex justify-end">
            <CustomBtn
              title="ایجاد"
              type="submit"
              classNames={`w-fit rounded-btn py-2.5 px-5 text-p1 font-medium ${
                loading ? "bg-lightGray" : "bg-dark1 text-white"
              }`}
              isLoading={loading}
            />
          </div>
        </form>
      }
    />
  );
}

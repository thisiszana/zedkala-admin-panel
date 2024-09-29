"use client";

import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    gender: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full h-[100vh] flex flex-col items-center justify-center">
        <div className="mb-[40px]">
          <h1 className="font-medium text-gray-600 text-[30px] mb-[5px]">
            مدیریت راحت و آسان
          </h1>
        </div>
        <div className="space-y-5">
          <div className="flex gap-4">
            <CustomInp
              name="firstName"
              type="text"
              label="اسم"
              value={form.firstName}
              onChange={changeHandler}
            />
            <CustomInp
              name="lastName"
              type="text"
              label="نام خانوادگی"
              value={form.lastName}
              onChange={changeHandler}
            />
          </div>
          <CustomInp
            name="username"
            type="text"
            label="نام کاربری"
            value={form.username}
            onChange={changeHandler}
          />
          <CustomInp
            name="password"
            type="password"
            label="رمز عبور"
            value={form.password}
            onChange={changeHandler}
          />
          <CustomBtn
            type="submit"
            title="ثبت نام"
            isLoading={loading}
            disabled={loading}
            classNames={`${
              loading ? "bg-gray-100 text-black" : "bg-black text-white"
            } w-full h-[50px] font-bold flex items-center justify-center rounded-btn`}
          />
          <div className="flex items-center justify-center gap-4 text-sm font-bold">
            <Link
              href="/login"
              className="bg-gray-100 border text-center py-1 px-4 rounded-lg"
            >
              ورود
            </Link>
            <p>قبلا ثبت نام کرده اید؟</p>
          </div>
        </div>
      </div>
    </form>
  );
}

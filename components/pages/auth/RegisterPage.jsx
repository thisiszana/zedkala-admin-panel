"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import CustomInp from "@/components/shared/form/CustomInp";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useServerAction";
import { createAdmin } from "@/actions/auth.action";
import { MESSAGES } from "@/utils/message";
import toast from "react-hot-toast";
import DarkLightMode from "@/components/shared/layout/DarkLightMode";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const { loading, res } = useServerAction(createAdmin, form, () =>
    router.push("/login")
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.username || !form.password)
      return toast.error(MESSAGES.fillInp);

    res();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center h-[100vh] justify-center gap-[150px] bg-white dark:bg-dark2 max-xl:p-[30px]"
    >
      <div className="w-full h-fit flex items-center justify-center bg-white dark:bg-dark1 rounded-[8px]">
        <div className="max-w-[500px] w-full p-8">
          <div className="mb-[40px]">
            <h1 className="font-medium text-gray-600 dark:text-lightGray text-[30px] mb-[5px]">
              مدیریت راحت و آسان
            </h1>
          </div>
          <div className="space-y-5">
            <div className="flex gap-4">
              <CustomInp
                name="firstName"
                type="text"
                label="اسم *"
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
              label="نام کاربری *"
              value={form.username}
              onChange={changeHandler}
            />
            <CustomInp
              name="password"
              type="password"
              label="رمز عبور *"
              value={form.password}
              onChange={changeHandler}
            />
            <CustomBtn
              type="submit"
              title="ثبت نام"
              isLoading={loading}
              disabled={loading}
              classNames={`${
                loading ? "bg-lightGray text-black" : "bg-dark2 text-white"
              } w-full h-[50px] font-bold flex items-center dark:bg-lightGray dark:text-dark1 justify-center rounded-btn`}
            />
            <div className="flex items-center justify-center gap-4 text-sm font-bold">
              <p>قبلا ثبت نام کرده اید؟</p>
              <Link
                href="/login"
                className="bg-lightGray border text-center py-1 px-4 rounded-lg dark:bg-dark1 dark:text-white"
              >
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

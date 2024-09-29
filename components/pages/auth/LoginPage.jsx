"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import toast from "react-hot-toast";

import CustomInp from "@/components/shared/form/CustomInp";
import useServerAction from "@/hooks/useServerAction";
import CustomBtn from "@/components/shared/CustomBtn";
import { loginAdmin } from "@/actions/auth.action";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const { loading, res } = useServerAction(loginAdmin, form, () =>
    router.push("/dashboard")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.password || !form.username) return toast.error(MESSAGES.fillInp);

    res();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[150px] bg-white max-xl:p-[30px]"
    >
      <div className="w-full h-[100vh] flex items-center justify-center bg-white">
        <div className="max-w-[500px] w-full p-8">
          <div className="mb-[40px]">
            <h1 className="font-medium text-gray-600 text-[30px] mb-[5px]">
              ورود ادمین
            </h1>
          </div>
          <div className="space-y-5">
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
                loading ? "bg-gray-100 text-black" : "bg-black text-white"
              } w-full h-[50px] font-bold flex items-center justify-center rounded-btn`}
            />
            <div className="flex flex-col items-center gap-4 text-sm font-bold">
              <div className="flex items-center justify-center gap-4">
                <p>حساب کاربری ندارید؟</p>
                <Link
                  href="/register"
                  className="bg-gray-100 border text-center py-1 px-4 rounded-lg"
                >
                  ثبت نام
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

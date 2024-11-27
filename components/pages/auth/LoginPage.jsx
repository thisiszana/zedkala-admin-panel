"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useState } from "react";

import toast from "react-hot-toast";
import { Alert } from "antd";

import CustomInp from "@/components/shared/form/CustomInp";
import useServerAction from "@/hooks/useServerAction";
import CustomBtn from "@/components/shared/CustomBtn";
import { loginAdmin } from "@/actions/auth.action";
import { MESSAGES } from "@/utils/message";

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
        className="flex items-center h-[100vh] justify-center gap-[150px] bg-white dark:bg-dark2 max-xl:p-[30px]"
      >
        <div className="w-fit h-fit flex items-center justify-center bg-white dark:bg-dark1 rounded-[8px]">

          <div className="max-w-[500px] w-full p-8">
            <div className="mb-[40px]">
              <h1 className="font-medium text-gray-600 dark:text-lightGray text-[30px] mb-[5px]">
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
                title="ورود"
                isLoading={loading}
                disabled={loading}
                classNames={`${
                  loading ? "bg-lightGray text-black" : "bg-dark2 text-white"
                } w-full h-[50px] font-bold flex items-center dark:bg-lightGray dark:text-dark1 justify-center rounded-btn`}
              />
              <div className="flex flex-col items-center gap-4 text-sm font-bold">
                <div className="flex items-center justify-center gap-4">
                  <p>حساب کاربری ندارید؟</p>
                  <Link
                    href="/register"
                    className="bg-lightGray border text-center py-1 px-4 rounded-lg dark:bg-dark1 dark:text-white"
                  >
                    ثبت نام
                  </Link>
                </div>
              </div>
              <Alert
                description={
                  <div className="space-y-2">
                    <p>
                      یوزرنیم مالک : <span className="font-bold">Zana80</span>{" "}
                      / پسورد : <span className="font-bold">zana12345</span>
                    </p>
                  </div>
                }
                type="info"
                showIcon
              />
            </div>
          </div>
        </div>
      </form>
  );
}

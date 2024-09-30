"use client";

import { Close, MenuBars, MenuDots } from "@/components/icons/Icons";
import CustomBtn from "../CustomBtn";
import { Fragment, useState } from "react";
import { Drawer } from "antd";
import Link from "next/link";
import Loader from "../Loader";
import { icons, menuLinks } from "@/constants";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const onClose = () => setOpen(false);

  const _drawer = {
    styles: {
      body: { padding: "0px", margin: "10px 0px" },
      header: { padding: "15px 20px" },
    },
    title: (
      <div className="flex items-center justify-between bg-white dark:bg-slate-700">
        <Link href="/dashboard" className="flex items-center gap-[10px]">
          <div className="flex items-center italic font-bold">
            <span className="text-baseDark">Zedkala</span>
            <span className="text-dark1 dark:text-white">Shop</span>
          </div>
        </Link>
        <CustomBtn
          onClick={() => onClose()}
          icon={<Close />}
          classNames="iconButton dark:text-white"
        />
      </div>
    ),
  };

  return (
    <div>
      <CustomBtn
        icon={<MenuBars />}
        onClick={() => setOpen(true)}
        classNames="iconButton"
      />
      <Drawer
        placement="left"
        onClose={onClose}
        open={open}
        closeIcon={false}
        styles={_drawer.styles}
        title={_drawer.title}
        width={250}
        className={`dark:bg-slate-700`} 
      >
        <nav>
          <Link
            href="/"
            className="border-2 rounded-full p-2 mx-4 flex items-center justify-between gap-2 cursor-pointer hoverable"
            onClick={() => onClose()}
          >
            <div className="flex items-center gap-2">
              {isLoading && (
                <div className="flex items-center justify-center w-full py-1">
                  <Loader width={20} height={20} />
                </div>
              )}
            </div>
            <MenuDots size={15} wrapperClassName="iconButton" />
          </Link>
          <div className="mr-4 mb-2 mt-5">
            <h1 className="text-p1 text-gray-400 dark:text-white">نمای کلی</h1>
          </div>
          <ul>
            {menuLinks.map((item) => (
              <Fragment key={item.title}>
                <li
                  className={`rounded-l-btn ml-4 Transition mb-[2px] border-r-4 ${
                    pathname === item.link
                      ? "bg-baseLight text-baseDark border-darkPurple"
                      : "bg-white dark:bg-slate-700 text-black dark:text-white hover:bg-lightGray dark:hover:bg-slate-700 border-transparent"
                  }`}
                >
                  <Link
                    href={item.link}
                    className="flex Transition items-center gap-[20px] py-[12px] px-[10px]"
                    onClick={() => onClose()}
                  >
                    <div className="icon_size">{item.image}</div>
                    <span className="text-p1">{item.title}</span>
                  </Link>
                </li>
                {item.title === "داشبورد" && (
                  <div className="mr-4 mb-2 mt-5">
                    <h1 className="text-p1 text-gray-400 dark:text-white">
                      مدیریت
                    </h1>
                  </div>
                )}
                {item.title === "ایجاد وبلاگ" && (
                  <div className="mr-4 mb-2 mt-5">
                    <h1 className="text-p1 text-gray-400 dark:text-white">
                      تنظیمات
                    </h1>
                  </div>
                )}
              </Fragment>
            ))}
            <li className="rounded-btn mx-4 hover:bg-lightRose text-darkRose transition duration-75 ease-in-out">
              <button
                className="flex items-center w-full gap-[20px] p-[10px]"
                onClick={() => signOut()}
              >
                <div className="icon_size">{icons.power}</div>
                <span className="text-[17px] font-black">خروج</span>
              </button>
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
}

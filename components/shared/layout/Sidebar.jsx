"use client";

import { usePathname } from "next/navigation";
import NextImage from "next/image";
import Link from "next/link";

import { Fragment, useState } from "react";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Image } from "@nextui-org/react";
import { Tooltip } from "antd";

import { LayerPlus, MenuDots } from "@/components/icons/Icons";
import { images, menuLinks } from "@/constants";
import useSession from "@/hooks/useSession";
import Loader from "../Loader";
import Navbar from "./Navbar";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const { data, isError, isLoading } = useSession();

  return (
    <>
      <Navbar isCollapsed={isCollapsed} />
      <aside
        className={`fixed z-30 right-0 h-screen max-lg:hidden bg-white dark:bg-dark2 overflow-y-auto border-l border-gray-200 dark:border-none sidebarScroll transition-all duration-300 ease-in-out ${
          isCollapsed ? "min-w-[80px] " : "min-w-[250px]"
        }`}
      >
        <div
          className={`flex items-center justify-between fixed bg-white dark:bg-dark2 p-4 mt-[9px] top-0 right-0 z-20 transition-all duration-300 ease-in-out ${
            isCollapsed ? "min-w-[75px]" : "min-w-[250px]"
          }`}
        >
          <Link href="/dashboard" className="flex items-center gap-[10px]">
            {!isCollapsed && (
              <div className="flex items-center italic font-bold">
                <span className="text-baseDark">Zedkala</span>
                <span className="text-dark1 dark:text-white">Shop</span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-lg border rounded-full p-1"
          >
            {isCollapsed ? <FiArrowRight /> : <FiArrowLeft />}
          </button>
        </div>

        <nav className="pt-[74px] pb-5 mt-[60px] transition-opacity duration-300 ease-in-out">
          {!isCollapsed && (
            <Link
              href="/account"
              className="border-2 rounded-full p-2 mx-4 flex items-center justify-between gap-2 cursor-pointer hoverable dark:bg-dark2"
            >
              {isLoading && (
                <div className="flex items-center justify-center w-full py-1">
                  <Loader width={20} height={20} />
                </div>
              )}
              {isError && <p>ارور</p>}
              {data?.success && (
                <>
                  <div className="flex items-center gap-2">
                    <Image
                      as={NextImage}
                      src={data?.session?.images || images.admin}
                      width={35}
                      height={35}
                      alt="user"
                      radius="full"
                      className="w-[35px] h-[35px]"
                    />
                    <p className="text-p2 capitalize">
                      {data?.session?.firstName}
                    </p>
                  </div>
                  <MenuDots size={15} wrapperClassName="iconButton" />
                </>
              )}
            </Link>
          )}

          <div className="mr-4 mb-2 mt-5">
            <h1 className="text-p1 text-gray-400 dark:text-white">نمای کلی</h1>
          </div>

          <ul
            className={`${
              isCollapsed
                ? "flex flex-col items-center gap-y-5"
                : "min-w-[250px]"
            }`}
          >
            {menuLinks.map((item) => (
              <Fragment key={item.title}>
                <li
                  className={`rounded-l-btn ml-4 transition-all duration-300 ease-in-out mb-[2px] border-r-4 ${
                    pathname === item.link
                      ? "bg-baseLight text-baseDark border-darkPurple"
                      : "bg-white dark:bg-dark2 text-black dark:text-white hover:bg-lightGray dark:hover:bg-darkHover border-transparent"
                  } ${isCollapsed ? "pr-2 py-2 px-3" : ""} flex items-center`}
                >
                  <Tooltip title={item.title} placement="right">
                    <Link
                      href={item.link}
                      className={`flex items-center transition-all duration-300 ease-in-out ${
                        isCollapsed
                          ? "justify-center px-0"
                          : "gap-[20px] py-[12px] px-[10px]"
                      }`}
                    >
                      <div>{item.image}</div>
                      {!isCollapsed && (
                        <span className="text-p1">{item.title}</span>
                      )}
                    </Link>
                  </Tooltip>
                </li>
                {item.title === "داشبورد" && !isCollapsed && (
                  <div className="mr-4 mb-2 mt-5">
                    <h1 className="text-p1 text-gray-400 dark:text-white">
                      مدیریت
                    </h1>
                  </div>
                )}
                {item.title === "ایجاد وبلاگ" && !isCollapsed && (
                  <div className="mr-4 mb-2 mt-5">
                    <h1 className="text-p1 text-gray-400 dark:text-white">
                      تنظیمات
                    </h1>
                  </div>
                )}
              </Fragment>
            ))}
            {!isCollapsed && (
              <li className="rounded-btn mx-4 bg-gradient-to-br mt-2 from-gray-200 to-transparent transition duration-75 ease-in-out">
                <Link
                  href="/tasks"
                  className="flex flex-col items-center gap-[10px] py-[12px] px-[10px]"
                >
                  <div className="rounded-2xl p-3 bg-gradient-to-tr from-darkPurple to-purple-300 text-white">
                    <LayerPlus />
                  </div>
                  <span className="text-p1 font-medium">ایجاد تسک جدید</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}

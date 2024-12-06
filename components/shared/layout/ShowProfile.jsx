"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { Avatar } from "@nextui-org/react";
import { Drawer, Tooltip } from "antd";

import { Close, Exclamation } from "@/components/icons/Icons";
import { images, profileLinks } from "@/constants";
import useSession from "@/hooks/useSession";
import CustomBadge from "../CustomBadge";
import SignoutBtn from "./SignoutBtn";
import CustomBtn from "../CustomBtn";
import Loader from "../Loader";

export default function ShowProfile() {
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useSession();

  const onClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader height={20} width={20} />;
  }

  if (isError) {
    return (
      <Tooltip title="Failed to fetch data!" placement="left">
        <Exclamation size={20} className="text-darkRose" />
      </Tooltip>
    );
  }

  const _drawer = {
    styles: {
      body: { padding: "0px", margin: "10px 0px" },
      header: { padding: "10px" },
    },
    title: (
      <CustomBtn
        onClick={() => onClose()}
        icon={<Close />}
        classNames="rounded-full p-2 mx-4 flex items-center justify-between gap-2 cursor-pointer hoverable dark:bg-dark1 dark:text-lightGray"
      />
    ),
  };
  return (
    <>
      <CustomBtn
        onClick={() => setOpen(true)}
        classNames="flex"
        title={
          <Avatar
            src={data?.session?.images || images.admin}
            isBordered
            className="cursor-pointer ml-2"
          />
        }
      />
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        closeIcon={false}
        styles={_drawer.styles}
        title={_drawer.title}
        width={300}
        className={`dark:bg-dark1`}
      >
        <div className="pb-[80px]">
          <div className="flex flex-col items-center justify-center">
            <Image
              src={data?.session?.images || images.admin}
              width={200}
              height={200}
              alt="user"
              radius="full"
              className="w-[100px] h-[100px] mb-2 rounded-full"
            />
            <p className="font-medium dark:text-lightGray">
              {data?.session?.username}
            </p>
            <p className="text-darkGray mb-2">{data?.session?.firstName}</p>
            <CustomBadge
              title={data?.session?.roll}
              colors={
                data?.session?.roll === "OWNER"
                  ? "bg-lightGreen text-darkGreen"
                  : data?.session?.roll === "ADMIN"
                  ? "bg-lightBlue text-darkBlue"
                  : "bg-lightRose text-darkRose"
              }
            />
          </div>
          <div className="w-full h-[1px] bg-gray-300 my-5" />
          <ul className="px-[20px] space-y-2">
            {profileLinks.map((link) => (
              <li
                key={link.name}
                className="bg-white dark:bg-dark1 text-black dark:text-white hover:bg-lightGray dark:hover:bg-slate-700 border-transparent"
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-5 px-2 py-3 rounded-btn hoverable"
                  onClick={() => onClose()}
                >
                  <div>{link.icon}</div>
                  <p>{link.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-dark1 absolute bottom-0 right-0 left-0 p-3">
          <SignoutBtn
            title="خروج"
            buttonClassName="w-full bg-rose-100 hover:bg-rose-200 Transition font-bold text-darkRose p-3 rounded-btn"
            onClick={() => onClose()}
          />
        </div>
      </Drawer>
    </>
  );
}

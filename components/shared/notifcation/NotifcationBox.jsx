"use client";

import { Fragment, useState } from "react";

import { Popover, Tooltip } from "antd";

import { Bell, Mail } from "@/components/icons/Icons";
import { notifications } from "@/constants";
import CustomBtn from "../CustomBtn";

export default function NotifcationBox() {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <div>
      {notifications.map((notif, index) => (
        <Fragment key={notif.key}>
          <div className="p-5 flex gap-4">
            <div>{notif.image}</div>
            <div>
              <p className="font-medium">{notif.text}</p>
              <p className="text-p2 text-gray-400">
                {notif.date} / {notif.category}
              </p>
            </div>
          </div>
          {index <= notifications.length - 1 && <hr />}
        </Fragment>
      ))}
    </div>
  );
  return (
    <Popover
      overlayInnerStyle={{
        padding: "0",
        margin: "0 20px",
        minWidth: "250px",
        maxHeight: "500px",
        overflowY: "auto",
      }}
      open={open}
      onOpenChange={onOpenChange}
      trigger="click"
      content={content}
      title={
        <div className="flex items-center justify-between px-5 py-3">
          <h1 className="text-h4 bg-white/50">اعلانات</h1>
          <Tooltip title="Mark all as read">
            <Mail
              wrapperClassName="iconButton cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </Tooltip>
        </div>
      }
    >
      <div className="relative">
        <CustomBtn
          icon={<Bell />}
          classNames="iconButton"
          onClick={() => setOpen(!open)}
        />
        <div className="bg-darkBlue text-white border-2 border-white rounded-full w-[20px] h-[20px] flex items-center justify-center text-[12px] absolute top-0 right-0">
          6
        </div>
      </div>
    </Popover>
  );
}

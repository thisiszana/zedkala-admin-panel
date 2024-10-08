"use client";

import { MenuDots } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import { Popover } from "@nextui-org/react";
import { useState } from "react";

export default function CategoryActions({ categoryId, published }) {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = <div className="popContainer min-w-[150px]"></div>;
  return (
    <div className="flex gap-2">
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        trigger="click"
        placement="rightTop"
        content={content}
        overlayInnerStyle={{
          padding: "0",
        }}
      >
        <CustomBtn icon={<MenuDots />} classNames="iconButton" />
      </Popover>
    </div>
  );
}

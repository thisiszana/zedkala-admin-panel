"use client";

import { useState } from "react";

import { Popover } from "antd";

import CustomBtn from "@/components/shared/CustomBtn";
import { MenuDots } from "@/components/icons/Icons";

export default function TaskActions({ id, currentStatus }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => setIsPopoverOpen(false);

  const onOpenChange = (newOpen) => setIsPopoverOpen(newOpen);

  const popoverContent = <div className="popContainer w-[200px] min-h-[150px] flex flex-col justify-center items-center">
    
  </div>;
  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={onOpenChange}
      content={popoverContent}
      overlayInnerStyle={{
        padding: "0",
      }}
      trigger="click"
      placement="leftTop"
    >
      <CustomBtn
        type="button"
        icon={<MenuDots size={15} />}
        classNames="rounded-full w-[35px] h-[35px] flex items-center justify-center hoverable"
      />
    </Popover>
  );
}

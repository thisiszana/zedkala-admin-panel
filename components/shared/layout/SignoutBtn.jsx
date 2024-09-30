"use client";

import { Power } from "@/components/icons/Icons";
import { signOut } from "@/actions/auth.action";
import CustomBtn from "../CustomBtn";

export default function SignoutBtn({ title, buttonClassName }) {
  return (
    <CustomBtn
      onClick={() => signOut()}
      title={title || <Power />}
      classNames={buttonClassName || "iconButton"}
    />
  );
}

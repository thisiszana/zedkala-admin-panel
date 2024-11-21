import Link from "next/link";

import { Tooltip } from "antd";

import { Edit, EyeOpen, LeftAngle } from "@/components/icons/Icons";
import CustomLink from "@/components/shared/CustomLink";
import CustomBtn from "@/components/shared/CustomBtn";

export default function ProductAction({ id }) {
  return (
    <div className="w-full flex justify-between items-center gap-3">
      <CustomLink
        href="/products"
        className="backLink"
        title="بازگشت"
        icon={<LeftAngle size={10} />}
      />
      <div className="flex items-center gap-3">
        <Tooltip placement="bottom" title="زنده">
          <Link href="/" target="_blank">
            <CustomBtn
              icon={<EyeOpen className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
        <Tooltip placement="bottom" title="ویرایش">
          <Link href={`/product/edit/${id}`}>
            <CustomBtn
              icon={<Edit className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}

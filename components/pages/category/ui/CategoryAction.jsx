import { Edit, EyeOpen, LeftAngle } from "@/components/icons/Icons";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomLink from "@/components/shared/CustomLink";
import { Tooltip } from "antd";
import Link from "next/link";

export default function CategoryAction({ id }) {
  return (
    <div className="ml-3 flex justify-between items-center ">
      <CustomLink
        href="/categories"
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
          <Link href={`/categories/edit/${id}`}>
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

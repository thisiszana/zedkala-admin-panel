import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment-jalaali";

import CategoryActions from "@/components/pages/categories/ui/CategoryActions";
import CustomBadge from "@/components/shared/CustomBadge";
import { shorterText } from "@/utils/fun";
import { images } from ".";

export const categoriesDataSourse = (categories) =>
  categories?.map((c) => ({
    key: c._id,
    name: (
      <Link
        href={`categories/${c._id}`}
        className="flex items-center gap-2 w-fit"
      >
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <Image
            as={NextImage}
            src={c.image}
            width={100}
            height={100}
            alt="Category"
            property
          />
        </div>
        <p>{shorterText(c.categoryName, 15)}...</p>
      </Link>
    ),
    date: moment(c.createdAt).format("jYYYY/jMM/jDD"),
    status: (
      <CustomBadge
        condition={c.published}
        title={c.published ? "منتشر شد" : "پیش نویس"}
      />
    ),
    creator: (
      <Link
        href={`/account/admins/${c.createdBy._id}`}
        className="flex items-center xl:flex-row gap-3"
      >
        <div className="w-10 h-10">
          <Image
            as={NextImage}
            src={c.createdBy.image || images.admin}
            width={200}
            height={200}
            style={{ width: "500px", height: "auto" }}
            alt="admin"
            className="rounded-full"
          />
        </div>
        <p className="text-p2 font-medium capitalize">
          {c.createdBy.firstName}
        </p>
      </Link>
    ),
    actions: <CategoryActions categoryId={c._id} published={c.published} />,
  }));
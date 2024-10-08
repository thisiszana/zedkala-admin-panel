import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";

import { shorterText } from "@/utils/fun";
import moment from "moment";

export const categoriesDataSourse = (categories) =>
  categories?.map((c) => ({
    key: c._id,
    name: (
      <Link
        hred={`categories/${c._id}`}
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
        <p>{shorterText(c.name, 15)}...</p>
      </Link>
    ),
    date: moment(c.createdAt).calendar(),
    status: (
        
    )
  }));

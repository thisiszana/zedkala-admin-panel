import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";

import { shorterText } from "@/utils/fun";

export default function CategoryResult({ category, closeModal }) {
  return (
    <div>
      <h1 className="text-h3 font-medium mb-2">محصولات</h1>
      {category.map((cat) => (
        <Link
          href={`/categories/${cat._id}`}
          key={cat._id}
          className="flex items-center gap-3 justify-between hoverable rounded-btn py-2 px-3"
          onClick={closeModal}
        >
          <div className="flex items-center gap-4  w-full">
            <Image
              as={NextImage}
              src={cat.images[0]}
              width={100}
              height={100}
              alt="cat"
              radius="none"
              className="ml-4"
            />
            <div>
              <p className="text-p1 font-medium line-clamp-4">
                {shorterText(cat.name, 30)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

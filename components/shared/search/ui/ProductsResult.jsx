import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";

import { e2p, shorterText, sp } from "@/utils/fun";

export default function ProductsResult({ products, closeModal }) {
  return (
    <div>
      <h1 className="text-h3 font-medium mb-2">محصولات</h1>
      {products.map((product) => (
        <Link
          href={`/products/${product._id}`}
          key={product._id}
          className="flex items-center gap-3 justify-between hoverable rounded-btn py-2 px-3"
          onClick={closeModal}
        >
          <div className="flex items-center gap-4  w-full">
            <Image
              as={NextImage}
              src={product.images[0]}
              width={100}
              height={100}
              alt="product"
              radius="none"
              className="ml-4"
            />
            <div>
              <p className="text-p1 font-medium line-clamp-4">
                {shorterText(product.title, 30)}
              </p>
              <div className="flex -tems-center gap-2">
                <p className="text-p2 text-darkGray">
                  {sp(product.price)}
                  تومان
                </p>
                <p className="text-p2 text-darkGray">
                  موجودی : {e2p(product.stock.toLocaleString())}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment-jalaali";

import CategoryActions from "@/components/pages/categories/ui/CategoryActions";
import CustomBadge from "@/components/shared/CustomBadge";
import { e2p, shorterText, sp } from "@/utils/fun";
import { images } from ".";
import ProductsActions from "@/components/pages/products/ui/ProductsActions";

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
    date: e2p(moment(c.createdAt).format("jYYYY/jMM/jDD")),
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

export const productsDataSourse = (products) =>
  products?.map((product) => ({
    key: product._id,
    name: (
      <Link
        href={`/products/${product._id}`}
        className="flex items-center gap-2 w-fit"
      >
        <div className="w-[100px] h-[100px] flex items-center justify-center">
          <Image
            as={NextImage}
            src={product.images[0]}
            width={100}
            height={100}
            alt="product"
            priority
          />
        </div>
        <div>
          <p>{shorterText(product.title, 15)}...</p>
          <p>در {product.categoryName}</p>
        </div>
      </Link>
    ),
    stock: (
      <p
        className={`w-fit ${
          product.stock === 0 &&
          "text-darkRose px-2 rounded-xl bg-lightRose font-bold text-xs"
        }`}
      >
        {product.stock === 0
          ? "ناموجود"
          : sp(product.stock.toLocaleString())}
      </p>
    ),
    price: `${sp(product.price)}`,
    discount: product.discount.map((dis) => e2p(dis.value) || "_"),
    orders: (e2p(product.orders) && product.orders.length) || "_",
    comments: (e2p(product.comments) && product.comments.length) || "_",
    likes: (e2p(product.likes) && product.likes.length) || "_",
    date: e2p(moment(product.createdAt).format("jYYYY/jMM/jDD")),
    status: (
      <CustomBadge
        condition={product.published}
        title={product.published ? "منتشر شده" : "پیش نویس"}
      />
    ),
    creator: (
      <Link
        href={`/account/admins/${product.createdBy._id}`}
        className="flex items-center xl:flex-row gap-3"
      >
        <div className="w-10 h-10">
          <Image
            as={NextImage}
            src={product.createdBy.image || images.admin}
            width={200}
            height={200}
            style={{ width: "500px", height: "auto" }}
            alt="admin"
            className="rounded-full"
          />
        </div>
        <p className="text-p2 font-medium capitalize">
          {product.createdBy.firstName}
        </p>
      </Link>
    ),
    actions: (
      <ProductsActions productId={product._id} published={product.published} />
    ),
  }));

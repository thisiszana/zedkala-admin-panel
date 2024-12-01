import NextImage from "next/image";
import Link from "next/link";

import { Image } from "@nextui-org/react";
import moment from "moment-jalaali";
import { Tooltip } from "antd";

import CategoryActions from "@/components/pages/categories/ui/CategoryActions";
import ProductsActions from "@/components/pages/products/ui/ProductsActions";
import AdminActions from "@/components/pages/account/ui/admin/AdminActions";
import CustomBadge from "@/components/shared/CustomBadge";
import { e2p, shorterText, sp } from "@/utils/fun";
import { images } from ".";

export const categoriesDataSourse = (categories) =>
  categories?.map((c) => ({
    key: c._id,
    name: (
      <Link
        href={`categories/${c._id}`}
        className="flex items-center gap-2 w-fit"
      >
        <div className="hidden lg:flex w-[100px] h-[100px] items-center justify-center">
          <Image
            as={NextImage}
            src={c.images[0] || images.imageNotFound}
            width={100}
            height={100}
            alt="دسته‌بندی"
            property
          />
        </div>
        <p>{shorterText(c.name, 15)}...</p>
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
        <div className="hidden lg:flex w-10 h-10 items-center justify-center">
          <Image
            as={NextImage}
            src={c.createdBy.images || images.admin}
            width={200}
            height={200}
            style={{ width: "500px", height: "auto" }}
            alt="ادمین"
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
        href={`/product/${product._id}`}
        className="flex items-center gap-2 w-fit"
      >
        <div className="hidden lg:flex w-[100px] h-[100px] items-center justify-center">
          <Image
            as={NextImage}
            src={product.images[0] || images.imageNotFound}
            width={100}
            height={100}
            alt="product"
            priority="true"
          />
        </div>
        <div>
          <Tooltip title="جزئیات" placement="left">
            <p>{shorterText(product.title, 15)}...</p>
            <p>در {product.categoryName}</p>
          </Tooltip>
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
        {product.stock === 0 ? "ناموجود" : sp(product.stock.toLocaleString())}
      </p>
    ),
    price: `${sp(product.price)} تومان`,
    discount: e2p(product.discount.value) || "_",
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
        <div className="hidden lg:flex w-10 h-10 items-center justify-center">
          <Image
            as={NextImage}
            src={product.createdBy.images || images.admin}
            width={200}
            height={200}
            style={{ width: "100%", height: "auto" }}
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

export const adminsDataSourse = (admins, currentUserID, currentUserRoll) =>
  admins.map((admin) => ({
    key: admin._id,
    avatar: (
      <div className="w-12 h-12">
        <Image
          as={NextImage}
          src={admin.images || images.admin}
          width={100}
          height={100}
          style={{ width: "500px", height: "48px" }}
          alt="admin"
          radius="full"
        />
      </div>
    ),
    name: (
      <div>
        <p className="text-p1 font-medium">
          {currentUserID === admin._id && (
            <span className="bg-lightBlue text-darkBlue rounded-btn py-.5 px-2 text-p2 font-medium border border-darkBlue mr-2">
              YOU
            </span>
          )}
          {admin.username}
        </p>
        {admin.firstName && (
          <p className="text-p2 text-darkGray">{admin.firstName}</p>
        )}
      </div>
    ),
    phone: admin.phoneNumber || "_",
    roll: (
      <CustomBadge
        condition={admin.roll === "OWNER" || admin.roll === "ADMIN"}
        title={admin.roll}
      />
    ),
    date: (
      <div>
        <p>{moment(admin.createdAt).locale("fa").format("jYYYY/jMM/jDD")}</p>
        <p className="text-p2 text-darkGray">
          {moment(admin.createdAt).locale("fa").format("HH:mm")}
        </p>
      </div>
    ),
    action: (
      <AdminActions
        roll={admin.roll}
        userId={admin._id}
        showMore={currentUserRoll === "OWNER" && admin.roll !== "OWNER"}
      />
    ),
  }));

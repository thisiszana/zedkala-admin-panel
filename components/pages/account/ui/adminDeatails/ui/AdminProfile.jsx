import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import moment from "moment-jalaali";

import { Date, Flag, Location, Mail, Mobile } from "@/components/icons/Icons";
import DetailedBox from "@/components/shared/DetailedBox";
import CustomBadge from "@/components/shared/CustomBadge";
import { images as imagesDefault } from "@/constants";
import { getAdmin } from "@/actions/admin.action";
import { e2p, sp } from "@/utils/fun";

export default async function AdminProfile({ id }) {
  const { admin } = await getAdmin(id);

  if (!admin) return notFound();

  const {
    username,
    firstName,
    email,
    phoneNumber,
    address,
    country,
    images,
    roll,
    createdAt,
    productsCreated,
    blogsCreated,
    categoryCreated,
  } = admin;

  const overviewContent = (
    <div className="w-full box border flex flex-col items-center gap-1">
      <div className="flex justify-center w-full mb-4">
        <Image
          src={images || imagesDefault.admin}
          width={200}
          height={200}
          style={{ width: "200px", height: "auto", borderRadius: "50%" }}
          alt="admin"
        />
      </div>
      <CustomBadge title={roll} condition={roll === "OWNER"} />
      <p className="text-h3 font-bold">{username}</p>
      <p className="text-p1 text-darkGray font-medium capitalize">
        {firstName}
      </p>
    </div>
  );

  const aboutContent = (
    <div className="w-full box border flex flex-col gap-3">
      <div className="flex items-center gap-5">
        <Location />
        <p className="text-p1 font-medium line-clamp-2">{address || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Mail />
        <p className="text-p1 font-medium line-clamp-2">{email || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Mobile />
        <p className="text-p1 font-medium line-clamp-2">
          {e2p(phoneNumber) || "_"}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <Flag />
        <p className="text-p1 font-medium line-clamp-2">{country || "_"}</p>
      </div>
      <div className="flex items-center gap-5">
        <Date />
        <p className="text-p1 font-medium line-clamp-2">
          {e2p(moment(createdAt).locale("fa").format("jYYYY/jMM/jDD"))}
        </p>
      </div>
    </div>
  );

  const productsContent =
    productsCreated && productsCreated.length === 0 ? (
      <p>هیچ محصولی ایجاد نشده!</p>
    ) : (
      <div className="flex flex-wrap gap-6 box border w-full">
        {productsCreated?.map((product) => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="flex flex-col gap-2 items-center flex-1 min-w-[200px] box border hoverable"
          >
            <Image
              width={100}
              height={100}
              src={product.images[0] || imagesDefault.imageNotFound}
              alt="محصول"
            />
            <p className="text-p1 font-medium">{sp(product.price)}</p>
            <p className="text-p2">
              {moment(product.createdAt).locale("fa").format("jYYYY/jMM/jDD")}
            </p>
          </Link>
        ))}
      </div>
    );

  const blogsContent =
    blogsCreated && blogsCreated.length === 0 ? (
      <p>هیچ وبلاگی ایجاد نشده!</p>
    ) : (
      <div className="flex flex-wrap gap-6 box border w-full">
        {blogsCreated?.map((blog) => (
          <Link
            key={blog._id}
            href={`/blogs/${blog._id}`}
            className="flex flex-col gap-2 items-center flex-1 min-w-[200px] box border hoverable"
          >
            <Image
              width={100}
              height={100}
              src={blog.image || imagesDefault.imageNotFound}
              alt="وبلاگ"
            />
            <p className="text-p2">{moment(blog.createdAt).format("L")}</p>
          </Link>
        ))}
      </div>
    );

  const categoriesContent =
    categoryCreated && categoryCreated.length === 0 ? (
      <p>هیچ دسته‌بندی ایجاد نشده!</p>
    ) : (
      <div className="flex flex-wrap gap-6 box border w-full">
        {categoryCreated?.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="flex flex-col gap-2 items-center flex-1 min-w-[200px] box border hoverable"
          >
            <Image
              width={100}
              height={100}
              src={category?.images[0] || images.imageNotFound}
              alt="دسته‌بندی"
            />
            <p className="text-p2">
              {moment(category.createdAt).locale("fa").format("jYYYY/jMM/jDD")}
            </p>
          </Link>
        ))}
      </div>
    );
  return (
    <div className="space-y-5">
      <DetailedBox title="نمای کلی" content={overviewContent} />
      <DetailedBox title="درباره" content={aboutContent} />
      <DetailedBox title="محصولات ساخته شده" content={productsContent} />
      <DetailedBox
        title="دسته‌بندی‌های ساخته شده"
        content={categoriesContent}
      />
      <DetailedBox title="وبلاگ‌های ساخته شده" content={blogsContent} />
    </div>
  );
}

"use server";

import ZedkalaAdmin from "@/models/zedkalaAdmin";
import { ZedkalProducts } from "@/models/zedkalaProducts";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export const createProduct = async (data) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const admin = await ZedkalaAdmin.findById(session.userId);

    const {
      title,
      description,
      images,
      price,
      stock,
      discount,
      categoryName,
      subCategories,
      specifications,
      colors,
      brand,
      keywords,
      returnPolicy,
      warranty,
      published,
      insurance,
    } = data;

    const newProduct = await ZedkalProducts.create({
      title,
      description,
      images,
      price,
      stock,
      discount,
      categoryName: categoryName.toLowerCase(),
      subCategories: subCategories.toLowerCase(),
      specifications,
      colors,
      brand,
      keywords,
      returnPolicy,
      warranty,
      published,
      insurance,
      createdBy: session.userId,
    });

    admin.productsCreated.push(newProduct._id);
    await admin.save();

    revalidatePath("/products");

    return {
      message: MESSAGES.productCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in add product", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getProducts = async (searchParams) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const { page, search, stock, discount, sort, category, published } =
      searchParams;

    let query = {};
    let filters = {};

    if (search && search.trim() !== "") query = { $text: { $search: search } };

    if (stock)
      query == "in-stock" ? (filters.stock = { $gt: 0 }) : (filters.stock = 0);

    if (discount)
      discount == "has-discount"
        ? (filters.discount = { $gt: 0 })
        : (filters.discount = 0);

    if (category) filters.category = category;

    if (published)
      published === "true"
        ? (filters.published = true)
        : (filters.published = false);

    const pageNumber = page || 1;
    const perPage = 5;
    const totalProductsWithoutFilter = await ZedkalProducts.countDocuments();
    const totalProducts = await ZedkalProducts.countDocuments({
      ...query,
      ...filters,
    });

    const products = await ZedkalProducts.find({ ...filters, ...query })
      .sort({
        ...(sort == 1
          ? { createdAt: -1 }
          : sort == 2
          ? { createdAt: 1 }
          : sort == 3
          ? { price: -1 }
          : sort == 4
          ? { price: 1 }
          : sort == 5
          ? { orders: -1 }
          : {}),
      })
      .skip((pageNumber - 1) * perPage)
      .limit(perPage)
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName image",
      })
      .lean();

    return {
      products,
      totalPages,
      totalProducts,
      totalProductsWithoutFilter,
      status: MESSAGES.success,
      code: 200,
    };
  } catch (error) {
    console.log("error in get products", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

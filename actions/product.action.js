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
    console.log("error in add product", error.message)
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

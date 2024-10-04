"use server";

import { revalidatePath } from "next/cache";

import ZedkalaAdmin from "@/models/zedkalaAdmin";
import ZedkalaCategory from "@/models/zedkalaCategory";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";

export const createCategory = async (data) => {
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

    const { categoryName, subCategories, image, published } = data;

    const newCategory = await ZedkalaCategory.create({
      categoryName,
      subCategories,
      image,
      published,
      createdBy: session.userId,
    });

    admin.categoryCreated.push(newCategory._id);
    await admin.save();

    revalidatePath("/categories");

    return {
      message: MESSAGES.categoryCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

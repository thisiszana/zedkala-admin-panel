"use server";

import ZedkalaAdmin from "@/models/zedkalaAdmin";
import { ZedkalaBanner } from "@/models/zedkalaBanner";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export const createBanner = async (data) => {
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

    const { title, time, order, images, published } = data;

    const newBanner = await ZedkalaBanner.create({
      title,
      time,
      order,
      images,
      published,
      createdBy: session.userId,
    });

    admin.bannerCreated.push(newBanner._id);
    await admin.save();

    revalidatePath("/products");

    return {
      message: MESSAGES.bannerCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in add banner", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getBanner = async () => {
  try {
    const banner = await ZedkalaBanner.find();

    if (!banner)
      return {
        message: MESSAGES.bannerNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    return {
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
      banner,
    };
  } catch (error) {
    console.log("error in get banner", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

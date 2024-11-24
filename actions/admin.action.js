"use server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import { sanitizeData } from "@/utils/fun";
import connectDB from "@/utils/connectDB";

export const getCurrentAdmin = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const currentAdmin = await ZedkalaAdmin.findById(session.userId)
      .select("-password")
      .lean();

    if (!currentAdmin)
      return {
        message: MESSAGES.aUserNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };
      const sanitizedCurrentAdmin = sanitizeData(currentAdmin);
    return {
      currentAdmin: sanitizedCurrentAdmin,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in get current admin", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

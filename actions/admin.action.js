"use server"

import { getServerSession } from "@/utils/session";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";

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
  
      return {
        currentAdmin,
        message: MESSAGES.success,
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
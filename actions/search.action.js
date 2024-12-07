"use server";

import { ZedkalaProducts } from "@/models/zedkalaProducts";
import { ZedkalaCategory } from "@/models/zedkalaCategory";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { ZedkalaTask } from "@/models/zedkalaTask";
import ZedkalaVendor from "@/models/zedkalaVendor";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";

export const searchDashboard = async (searchQuery) => {
  try {
    await connectDB();
    console.log("searchQuery", searchQuery);
    let query = { $text: { $search: searchQuery } };

    const products = await ZedkalaProducts.find({ ...query }).lean();
    // const category = await ZedkalaCategory.find(query).lean();
    // const vendors = await ZedkalaVendor.find(query).lean();
    const admins = await ZedkalaAdmin.find(query).select("-password").lean();
    // const users = await ZedkalaUser.find(query).lean();
    const tasks = await ZedkalaTask.find(query)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images",
      })
      .lean();

    return {
      result: {
        products,
        // category,
        tasks,
        // users,
        admins,
        // vendors,
        searchQuery,
      },
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log(error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

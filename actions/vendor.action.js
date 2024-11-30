"use server";

import ZedkalaVendor from "@/models/zedkalaVendor";
import connectDB from "@/utils/connectDB";
import { hashedPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";

export const createVendor = async (data) => {
  try {
    await connectDB();

    const {
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      address,
      country,
      roll,
      images,
      storeName,
      storeAddress,
      productCategory,
      taxCode,
      businessLicense,
      terms,
    } = data;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER" || session.roll === "ADMIN")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    if (
      !firstName ||
      !username ||
      !password ||
      !images ||
      !taxCode ||
      !businessLicense ||
      !storeName ||
      !storeAddress ||
      !productCategory ||
      !terms
    )
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

      const existingVendor = await ZedkalaVendor.findOne({username})

      if (existingVendor)
        return {
          message: MESSAGES.user_exist,
          status: MESSAGES.failed,
          code: STATUS_CODES.exist,
        };
  
      const hashPassword = await hashedPassword(password);
  
      await ZedkalaVendor.create({
        firstName,
        lastName,
        username,
        password: hashPassword,
        email,
        phoneNumber,
        address,
        country,
        roll,
        images,
        storeName,
        storeAddress,
        productCategory,
        taxCode,
        businessLicense,
        terms,
      });
  
      revalidatePath("/account");
  
      return {
        message: MESSAGES.vendorCreated,
        status: MESSAGES.success,
        code: STATUS_CODES.created,
      };
  } catch (error) {
    console.log("error in creat vendor by owner", error.message)
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

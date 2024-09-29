"use server";

import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";
import { hashedPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { revalidatePath } from "next/cache";

export const CreateAdmin = async (data) => {
  try {
    await connectDB();

    const { firstName, lastName, username, password } = data;

    if (!firstName || !username || !password)
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const existingAdmin = await ZedkalaAdmin.findOne({ username });

    if (existingAdmin)
      return {
        message: MESSAGES.user_exist,
        status: MESSAGES.failed,
        code: STATUS_CODES.exist,
      };

    const hashPassword = await hashedPassword(password);

    await ZedkalaAdmin.create({
      firstName,
      lastName,
      username,
      password: hashPassword,
    });

    revalidatePath("/account");
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

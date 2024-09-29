"use server";

import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";
import { hashedPassword, verifyPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/var";
import { sign } from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
    return {
      message: MESSAGES.register,
      status: MESSAGES.success,
      code: STATUS_CODES.created,
    };
  } catch (error) {
    console.log("create admin error", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const loginAdmin = async (data) => {
  try {
    await connectDB();

    const { username, password } = data;

    if (!username || !password)
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const admin = await ZedkalaAdmin.findOne({ username });

    if (!admin)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const isValidPass = await verifyPassword(password, admin.password);

    if (!isValidPass)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const accessToken = sign(
      {
        username,
        userId: admin._id,
        firstName: admin.firstName,
        roll: admin.roll,
        image: admin.image,
      },

      SECRET_KEY,
      {
        expiresIn: SESSION_EXPIRATION,
      }
    );

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + SESSION_EXPIRATION),
      sameSite: "lax",
      path: "/",
    });

    return {
      message: MESSAGES.login,
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

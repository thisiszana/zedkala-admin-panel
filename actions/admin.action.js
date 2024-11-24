"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { sign } from "jsonwebtoken";

import { hashedPassword, sanitizeData, verifyPassword } from "@/utils/fun";
import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/var";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";

export const getAdmins = async () => {
  try {
    await connectDB();

    const admins = await ZedkalaAdmin.find().select("-password").lean();

    return {
      admins,
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

export const updateProfile = async (data) => {
  try {
    await connectDB();

    const {
      username,
      newPassword,
      currentPassword,
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      address,
      country,
      images,
    } = data;
    console.log(data);
    
    const session = getServerSession();

    const admin = await ZedkalaAdmin.findById(session.userId);

    if (!admin) {
      return {
        message: MESSAGES.aUserNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };
    }

    if (!username || !firstName) {
      return {
        message: MESSAGES.fields,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    }

    if (newPassword) {
      const isValidPass = await verifyPassword(currentPassword, admin.password);

      if (!isValidPass) {
        return {
          message: MESSAGES.noMatchPassword,
          status: MESSAGES.failed,
          code: STATUS_CODES.badRequest,
        };
      } else {
        const hashPass = await hashedPassword(newPassword);
        admin.password = hashPass;
      }
    }

    if (username !== admin.username) {
      const isUsernameExist = await ZedkalaAdmin.findOne({ username });

      if (isUsernameExist) {
        return {
          message: MESSAGES.user_exist,
          status: MESSAGES.failed,
          code: STATUS_CODES.exist,
        };
      } else {
        admin.username = username;
      }
    }

    if (images && images.length !== 0) admin.images = images;

    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.gender = gender;
    admin.email = email;
    admin.phoneNumber = phoneNumber;
    admin.address = address;
    admin.country = country;
    await admin.save();

    const accessToken = sign(
      {
        username,
        userId: admin._id,
        firstName: firstName,
        image: images && images.length !== 0 ? images : admin.images,
        roll: admin.roll,
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

    revalidatePath("/account");

    return {
      message: MESSAGES.updateProfile,
      status: MESSAGES.update,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in update profile", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

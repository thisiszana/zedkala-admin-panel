import { NextResponse } from "next/server";

import { sign } from "jsonwebtoken";

import {
  REFRESH_TOKEN_EXPIRATION,
  SECRET_KEY,
  SESSION_EXPIRATION,
} from "@/utils/var";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { verifyPassword } from "@/utils/fun";
import connectDB from "@/utils/connectDB";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection error:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { msg: MESSAGES.fields, success: false },
        { status: STATUS_CODES.badRequest }
      );
    }

    const user = await ZedkalaUser.findOne({ username });

    if (!user) {
      return NextResponse.json(
        {
          msg: MESSAGES.userNotFound,
          success: false,
        },
        { status: STATUS_CODES.not_found }
      );
    }

    const isValidPass = await verifyPassword(password, user.password);

    if (!isValidPass) {
      return NextResponse.json(
        {
          msg: MESSAGES.userNotFound,
          success: false,
        },
        { status: STATUS_CODES.not_found }
      );
    }

    const accessToken = sign(
      {
        username,
        userId: user._id,
        displayName: user.displayName,
      },
      SECRET_KEY,
      { expiresIn: SESSION_EXPIRATION }
    );

    const refreshToken = sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    return NextResponse.json(
      {
        msg: MESSAGES.login,
        success: true,
        accessToken,
        refreshToken,
        accessExpiresIn: SESSION_EXPIRATION,
        refreshExpiresIn: REFRESH_TOKEN_EXPIRATION,
      },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error during login:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

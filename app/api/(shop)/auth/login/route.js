import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/var";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { verifyPassword } from "@/utils/fun";
import connectDB from "@/utils/connectDB";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password)
      return NextResponse.json(
        { msg: MESSAGES.fields, success: false },
        { status: STATUS_CODES.failed }
      );

    const user = await ZedkalaUser.findOne({ username });

    if (!user)
      return NextResponse.json(
        {
          msg: MESSAGES.userNotFound,
          success: false,
        },
        { status: STATUS_CODES.not_found }
      );

    const isValidPass = await verifyPassword(password, user.password);

    if (!isValidPass)
      return NextResponse.json(
        {
          message: MESSAGES.userNotFound,
          success: false,
        },
        { status: STATUS_CODES.not_found }
      );

    const accessToken = sign(
      {
        username,
        userId: user._id,
        displayName: user.displayName,
        image: null,
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

    const response = NextResponse.json(
      {
        msg: MESSAGES.login,
        status: true,
      },
      { status: STATUS_CODES.created }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
  console.log("error in login user", error.message)
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

import { NextResponse } from "next/server";

import { verify } from "jsonwebtoken";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import connectDB from "@/utils/connectDB";
import { SECRET_KEY } from "@/utils/var";

export async function GET(req) {
  console.log(req);
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const authorization = req.headers.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { msg: MESSAGES.unAuthorized, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const accessToken = authorization.spplit(" ")[1];

    let decode;
    try {
      decode = verify(accessToken, SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const userId = decode?.userId;

    if (!userId) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.invalidToken }
      );
    }

    const userCart = await ZedkalaUser.findOne({ _id: userId }).select("cart");

    if (!userCart)
      return NextResponse.json(
        { msg: MESSAGES.aUserNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, userCart },
      { status: STATUS_CODES.success }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

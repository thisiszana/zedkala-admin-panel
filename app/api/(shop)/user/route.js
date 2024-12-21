import { NextResponse } from "next/server";

import { SECRET_KEY } from "@/utils/var";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { verify } from "jsonwebtoken";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    console.log(req.headers);
    const authorization = req.headers.get("Authorization");
    console.log("authorization", authorization);

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { msg: MESSAGES.unAuthorized, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const accessToken = authorization.split(" ")[1];

    let decoded;
    try {
      decoded = verify(accessToken, SECRET_KEY);
    } catch (err) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const userId = decoded?.userId;
    if (!userId) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.invalidToken }
      );
    }

    const user = await ZedkalaUser.findById(userId).select(
      "displayName username email phoneNumber images"
    );

    if (!user) {
      return NextResponse.json(
        { msg: MESSAGES.aUserNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, user },
      { status: STATUS_CODES.success }
    );
    console.log("userrrrrrrrrrr", user);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

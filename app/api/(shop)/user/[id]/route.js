import ZedkalaUser from "@/models/shop/zedkalaUser";
import connectDB from "@/utils/connectDB";
import { hashedPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { SECRET_KEY } from "@/utils/var";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

export async function PATCH(req) {
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
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const user = await ZedkalaUser.findById(userId);
    if (!user) {
      return NextResponse.json(
        { msg: MESSAGES.userNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const body = await req.json();
console.log(body)
    const updates = body;

    if (body.password) {
      const hashPassword = await hashedPassword(body.password);
      updates.password = hashPassword;
    }

    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });

    await user.save();

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, user },
      { status: STATUS_CODES.success }
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error in PATCH API:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

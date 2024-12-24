import { NextResponse } from "next/server";

import { verify, sign } from "jsonwebtoken";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import {
  REFRESH_SECRET_KEY,
  SECRET_KEY,
  SESSION_EXPIRATION,
} from "@/utils/var";

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
    const { refreshToken } = await req.json();
    console.log(refreshToken);
    if (!refreshToken) {
      return NextResponse.json(
        { msg: MESSAGES.fields, success: false },
        { status: STATUS_CODES.failed }
      );
    }

    let decoded;
    try {
      decoded = verify(refreshToken, SECRET_KEY);
    } catch (err) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const newAccessToken = sign(
      {
        userId: decoded.userId,
      },
      SECRET_KEY,
      { expiresIn: SESSION_EXPIRATION }
    );

    return NextResponse.json(
      {
        msg: MESSAGES.tokenRefreshed,
        success: true,
        accessToken: newAccessToken,
        accessExpiresIn: SESSION_EXPIRATION,
      },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error during token refresh:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

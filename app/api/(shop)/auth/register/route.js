import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { hashedPassword } from "@/utils/fun";
import connectDB from "@/utils/connectDB";

const validateInputs = (data) => {
  const { displayName, username, password } = data;

  if (!displayName || !username || !password) {
    return {
      valid: false,
      message: MESSAGES.fields,
    };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: MESSAGES.password_length,
    };
  }

  return { valid: true };
};

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
    console.error("Database Connection Error:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const requestBody = await req.json();
    console.log(requestBody);
    const validation = validateInputs(requestBody);
    if (!validation.valid) {
      return NextResponse.json(
        { msg: validation.message, success: false },
        { status: STATUS_CODES.badRequest }
      );
    }

    const { displayName, username, password } = requestBody;

    const existingUser = await ZedkalaUser.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { msg: MESSAGES.user_exist, success: false },
        { status: STATUS_CODES.exist }
      );
    }

    const hashPassword = await hashedPassword(password);
    await ZedkalaUser.create({
      displayName,
      username,
      password: hashPassword,
    });

    revalidatePath("/account");

    const response = NextResponse.json(
      { msg: MESSAGES.register, success: true },
      { status: STATUS_CODES.created }
    );

    response.headers.set(
      "Access-Control-Allow-Origin",
      "http://localhost:3000"
    );
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  } catch (error) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

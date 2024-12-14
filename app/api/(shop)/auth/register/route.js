import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { hashedPassword } from "@/utils/fun";
import connectDB from "@/utils/connectDB";

const jsonResponse = (data, status) => {
  const response = NextResponse.json(data, { status });
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000/");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
};

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

export async function POST(req) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      status: 204,
    });
  }

  try {
    await connectDB();
  } catch (error) {
    console.error("Database Connection Error:", error);
    return jsonResponse(
      { msg: MESSAGES.server, success: false },
      STATUS_CODES.server
    );
  }

  try {
    const requestBody = await req.json();

    const validation = validateInputs(requestBody);
    if (!validation.valid) {
      return jsonResponse(
        { msg: validation.message, success: false },
        STATUS_CODES.failed
      );
    }

    const { displayName, username, password } = requestBody;

    const existingUser = await ZedkalaUser.findOne({ username });
    if (existingUser) {
      return jsonResponse(
        { msg: MESSAGES.user_exist, success: false },
        STATUS_CODES.exist
      );
    }

    const hashPassword = await hashedPassword(password);
    await ZedkalaUser.create({
      displayName,
      username,
      password: hashPassword,
    });

    revalidatePath("/account");
    return jsonResponse(
      { msg: MESSAGES.register, success: true },
      STATUS_CODES.created
    );
  } catch (error) {
    console.error("Server Error:", error);
    return jsonResponse(
      { msg: MESSAGES.server, success: false },
      STATUS_CODES.server
    );
  }
}

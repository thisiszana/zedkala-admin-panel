import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { hashedPassword } from "@/utils/fun";
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
    const { displayName, username, password } = await req.json();

    if (!displayName || !username || !password)
      return NextResponse.json(
        { msg: MESSAGES.fields, success: false },
        { status: STATUS_CODES.failed }
      );

    const existingUser = await ZedkalaUser.findOne({ username });

    if (existingUser)
      return NextResponse.json(
        {
          msg: MESSAGES.user_exist,
          success: false,
        },
        { status: STATUS_CODES.exist }
      );

    const hashPassword = await hashedPassword(password);

    await ZedkalaUser.create({
      displayName,
      username,
      password: hashPassword,
    });

    revalidatePath("/account");
    const response = NextResponse.json(
      {
        msg: MESSAGES.register,
        status: true,
      },
      { status: STATUS_CODES.created }
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

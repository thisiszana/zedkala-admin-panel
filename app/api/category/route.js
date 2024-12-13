import { ZedkalaCategory } from "@/models/zedkalaCategory";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { NextResponse } from "next/server";

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
    const category = await ZedkalaCategory.find();

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: false, category },
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

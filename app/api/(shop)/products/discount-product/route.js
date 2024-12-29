import { ZedkalaProducts } from "@/models/zedkalaProducts";
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
    const productsDiscount = await ZedkalaProducts.find()
      .sort({ discount: -1 }, { createdAt: -1 })
      .limit(10)
      .lean();
    const response = NextResponse.json(
      {
        msg: MESSAGES.success,
        success: true,
        productsDiscount,
      },
      { status: STATUS_CODES.success }
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.log("err in get product-discount", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

import { NextResponse } from "next/server";

import { ZedkalaProducts } from "@/models/zedkalaProducts";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import connectDB from "@/utils/connectDB";

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
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const products = await ZedkalaProducts.find({ published: true })
      .skip((page - 1) * 10)
      .limit(limit)
      .lean();

    if (!products)
      return NextResponse.json(
        { msg: MESSAGES.productNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );

    const totalProducts = await ZedkalaProducts.countDocuments({
      published: true,
    });

    const totalPages = Math.ceil(totalProducts / limit);

    const response = NextResponse.json(
      {
        msg: MESSAGES.success,
        success: true,
        products,
        totalPages,
        totalProducts,
      },
      { status: STATUS_CODES.success }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.log("err in get products", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

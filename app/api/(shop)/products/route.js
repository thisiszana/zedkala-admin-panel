import { NextResponse } from "next/server";
import { ZedkalaProducts } from "@/models/zedkalaProducts";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import connectDB from "@/utils/connectDB";

const sortMapping = {
  1: { views: -1 },
  2: { discount: -1 },
  3: { createdAt: -1 },
  4: { price: 1 },
  5: { price: -1 },
  6: { category: 1 },
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
    const sort = parseInt(url.searchParams.get("sort") || "1", 10);

    const sortOption = sortMapping[sort] || { createdAt: -1 };

    let filter = {};
    if (sort === 6) {
      filter = { "isGrocery.value": true };
    }

    const products = await ZedkalaProducts.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sortOption)
      .lean();

    if (!products)
      return NextResponse.json(
        { msg: MESSAGES.productNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );

    const totalProducts = await ZedkalaProducts.countDocuments({
      ...filter,
      published: true,
    });

    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;

    const response = NextResponse.json(
      {
        msg: MESSAGES.success,
        success: true,
        products,
        currentPage: page,
        totalPages,
        hasNextPage,
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

import { ZedkalaProducts } from "@/models/zedkalaProducts";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  console.log("oaramssss", id);
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    if (!id)
      return NextResponse.json(
        { msg: MESSAGES.invalidId, success: false },
        { status: STATUS_CODES.not_found }
      );

    const objectId = new mongoose.Types.ObjectId(id);

    const product = await ZedkalaProducts.findById(objectId).lean();

    if (!product) {
      return NextResponse.json(
        { msg: MESSAGES.productNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const response = NextResponse.json(
      {
        msg: MESSAGES.success,
        success: true,
        product,
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
    console.log("err in product route", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

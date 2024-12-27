import { ZedkalaBanner } from "@/models/zedkalaBanner";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const banner = await ZedkalaBanner.find();

    if (!banner) {
      return NextResponse.json(
        { msg: MESSAGES.bannerNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, banner },
      { status: STATUS_CODES.success }
    );
    
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error in API:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

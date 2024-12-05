import ZedkalaAdmin from "@/models/zedkalaAdmin";
import { ZedkalaBoard } from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const session = getServerSession();

    if (!session || session.userId === "USER") {
      return NextResponse.json(
        { msg: MESSAGES.forbidden, success: false },
        { status: STATUS_CODES.forbidden }
      );
    }

    const board = await ZedkalaBoard.findById(id)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images",
      })
      .lean();

    if (!board) {
      return NextResponse.json(
        { msg: MESSAGES.notFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, board },
      { status: STATUS_CODES.success }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

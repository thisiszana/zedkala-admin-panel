import { NextResponse } from "next/server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import ZedkalaTask from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";

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

    if (!session || session.userId === "USER")
      return NextResponse.json(
        { msg: MESSAGES.forbidden, success: false },
        { status: STATUS_CODES.forbidden }
      );

    const task = await ZedkalaTask.findById(id)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images",
      })
      .lean();

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: false, task },
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

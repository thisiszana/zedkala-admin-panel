import { ZedkalaBoard } from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET(req, res) {
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

    const userBoards = await ZedkalaBoard.find({ createdBy: session.userId });

    const response = NextResponse.json(
      {
        msg: MESSAGES.success,
        success: true,
        userBoards,
      },
      { status: STATUS_CODES.success }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("Error fetching boards:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

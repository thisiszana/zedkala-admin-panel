import { NextResponse } from "next/server";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";

export async function GET() {
  try {
    const session = getServerSession();

    if (!session)
      return NextResponse.json(
        { msg: MESSAGES.unAuthorized, success: false },
        { status: STATUS_CODES.unAuthorized }
      );

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, session },
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

import { NextResponse } from "next/server";

import { getServerSession } from "@/utils/session";

export async function GET() {
  try {
    const session = getServerSession();

    if (!session)
      return NextResponse.json(
        { msg: "UnAuthorized!", success: false },
        { status: 401 }
      );

    const response = NextResponse.json(
      { msg: "Success", success: true, session },
      { status: 200 }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}

import { ZedkalaTask } from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function POST(req, { params: { id } }) {
  console.log(req, id);
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const { content } = await req.json();

    const session = getServerSession();
    if (!session || session.userId === "USER") {
      return NextResponse.json(
        { msg: MESSAGES.forbidden, success: false },
        { status: STATUS_CODES.forbidden }
      );
    }

    const task = await ZedkalaTask.findById(id);
    if (!task) {
      return NextResponse.json(
        { msg: MESSAGES.taskNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const newAttachFile = {
      uploadedBy: session.userId,
      fileUrl: content.fileUrl,
      content: content.content,
      createdAt: new Date(),
    };

    task.attachFiles.push(newAttachFile);
    await task.save();

    return NextResponse.json(
      { msg: MESSAGES.success, success: true, attachFile: newAttachFile },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error posting attach comment:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

export async function DELETE(req, { params: { id } }) {
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
    if (!session || !session.userId) {
      return NextResponse.json(
        { msg: MESSAGES.forbidden, success: false },
        { status: STATUS_CODES.forbidden }
      );
    }

    const { fileId } = await req.json();
    console.log(fileId);

    const task = await ZedkalaTask.findById(id);
    if (!task) {
      return NextResponse.json(
        { msg: MESSAGES.taskNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const fileIndex = task.attachFiles.findIndex(
      (file) => file._id.toString() === fileId
    );
    if (fileIndex === -1) {
      return NextResponse.json(
        { msg: MESSAGES.fileNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const file = task.attachFiles[fileIndex];
    if (
      file.uploadedBy.toString() !== session.userId &&
      session.role !== "admin"
    ) {
      return NextResponse.json(
        { msg: MESSAGES.unauthorized, success: false },
        { status: STATUS_CODES.unauthorized }
      );
    }

    task.attachFiles.splice(fileIndex, 1);
    await task.save();

    return NextResponse.json(
      { msg: MESSAGES.fileDeleted, success: true },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error deleting attach file:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

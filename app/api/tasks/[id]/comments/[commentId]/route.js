import { ZedkalaTask } from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";



export async function PATCH(req, { params: { id, commentId } }) {
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


    const task = await ZedkalaTask.findById(id);

    if (!task) {
      return NextResponse.json(
        { msg: MESSAGES.taskNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const comment = task.comments.id(commentId);

    if (!comment) {
      return NextResponse.json(
        { msg: MESSAGES.commentNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const isLiked = comment.likes.includes(session.userId);

    if (isLiked) {
      comment.likes.pull(session.userId);
    } else {
      comment.likes.push(session.userId);
    }

    await task.save();

    return NextResponse.json(
      {
        msg: isLiked ? MESSAGES.likeRemoved : MESSAGES.likeAdded,
        success: true,
        likes: comment.likes,
      },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

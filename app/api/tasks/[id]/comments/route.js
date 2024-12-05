import ZedkalaAdmin from "@/models/zedkalaAdmin";
import { ZedkalaTask } from "@/models/zedkalaTask";
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

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const task = await ZedkalaTask.findById(id)
      .populate({
        path: "comments.createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images _id",
      })
      .populate({
        path: "comments.replies.createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images _id",
      })
      .lean();

    if (!task) {
      return NextResponse.json(
        { msg: MESSAGES.taskNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const totalCommentsCount = task.comments.length;

    const paginatedComments = task.comments
      .slice(skip, skip + limit)
      .map((comment) => ({
        ...comment,
        createdBy: comment.createdBy
          ? {
              username: comment.createdBy.username,
              firstName: comment.createdBy.firstName,
              images: comment.createdBy.images,
              _id: comment.createdBy._id,
            }
          : null,
        replies: comment.replies.map((reply) => ({
          ...reply,
          createdBy: reply.createdBy
            ? {
                username: reply.createdBy.username,
                firstName: reply.createdBy.firstName,
                images: reply.createdBy.images,
                _id: reply.createdBy._id,
              }
            : null,
        })),
      }));

    return NextResponse.json(
      {
        msg: MESSAGES.success,
        success: true,
        comments: paginatedComments,
        currentPage: page,
        totalPages: Math.ceil(totalCommentsCount / limit),
      },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error in get task comments:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

export async function POST(req, { params: { id } }) {
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

    const newComment = {
      createdBy: session.userId,
      content,
      createdAt: new Date(),
    };

    task.comments.push(newComment);
    await task.save();

    return NextResponse.json(
      { msg: MESSAGES.success, success: true, comment: newComment },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

export async function PATCH(req, { params: { id } }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const { content, commentId } = await req.json();

    const session = getServerSession();

    if (!session || session.userId === "USER") {
      return NextResponse.json(
        { msg: MESSAGES.forbidden, success: false },
        { status: STATUS_CODES.forbidden }
      );
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { msg: MESSAGES.invalidData, success: false },
        { status: STATUS_CODES.badRequest }
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

    const newReply = {
      createdBy: session.userId,
      content: content.trim(),
      createdAt: new Date(),
    };

    comment.replies.push(newReply);

    await task.save();

    return NextResponse.json(
      { msg: MESSAGES.replyAdded, success: true, reply: newReply },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.error("Error adding reply:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}
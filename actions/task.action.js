"use server";

import { revalidatePath } from "next/cache";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { ZedkalaTask } from "@/models/zedkalaTask";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";

export const createTask = async (data) => {
  try {
    await connectDB();

    const session = getServerSession();
    const {
      title,
      description,
      status,
      dueDate,
      taskOwner,
      taskAssistants,
      background,
    } = data;

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    await ZedkalaTask.create({
      title,
      description,
      status,
      createdBy: session.userId,
      dueDate,
      taskOwner: taskOwner || null,
      taskAssistants,
      background,
    });

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("err in creat task", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getTasks = async (searchParams) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    let query = {};

    if (searchParams?.viewType) {
      if (searchParams?.viewType === "personal") {
        query = {
          $or: [
            { "taskOwner.username": session.username },
            { createdBy: session.userId },
          ],
        };
      } else if (searchParams.viewType === "public") {
        query = { taskOwner: null };
      }
    }

    const tasks = await ZedkalaTask.find(query)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images roll",
      })
      .populate({
        path: "taskAssistants.userId",
        model: ZedkalaAdmin,
        select: "images",
      })
      .lean();

    return {
      tasks: {
        todo: tasks?.filter((task) => task.status === "Todo"),
        progress: tasks?.filter((task) => task.status === "Progress"),
        preview: tasks?.filter((task) => task.status === "Preview"),
        done: tasks?.filter((task) => task.status === "Done"),
      },
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("err in get tasks", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const updateStatusTask = async (data) => {
  try {
    await connectDB();

    const { id, status } = data;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const task = await ZedkalaTask.findById(id);

    if (!task)
      return {
        message: MESSAGES.taskNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (session.roll === "ADMIN") {
      if (task.taskOwner) {
        if (task.taskOwner.username !== session.username) {
          return {
            message: MESSAGES.forbidden,
            status: MESSAGES.failed,
            code: STATUS_CODES.forbidden,
          };
        }
      } else {
        if (session.userId !== task.createdBy.toString()) {
          return {
            message: MESSAGES.forbidden,
            status: MESSAGES.failed,
            code: STATUS_CODES.forbidden,
          };
        }
      }
    }

    if (status === "Done" && session.roll === "ADMIN")
      return {
        message: MESSAGES.taskForbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    task.status = status;
    await task.save();

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskUpdated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("err in update task", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const deleteTask = async (data) => {
  try {
    await connectDB();

    const { id } = data;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const task = await ZedkalaTask.findById(id);

    if (!task)
      return {
        message: MESSAGES.taskNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.roll === "ADMIN" &&
      session.userId !== task.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    await ZedkalaTask.findByIdAndDelete(id);

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskDeleted,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const editTask = async (data) => {
  try {
    await connectDB();

    const {
      title,
      description,
      status,
      dueDate,
      id,
      taskOwner,
      background,
      taskAssistants,
    } = data;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const task = await ZedkalaTask.findById(id);

    if (!task)
      return {
        message: MESSAGES.taskNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.roll === "ADMIN" &&
      session.userId !== task.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;
    task.taskAssistants = taskAssistants || null;
    task.background = background;
    task.taskOwner = taskOwner || null;
    await task.save();

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskEdited,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const editComment = async (data) => {
  try {
    await connectDB();
    const { taskID, commentId, newContent, tag } = data;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const task = await ZedkalaTask.findById(taskID);

    if (!task)
      return {
        message: MESSAGES.taskNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const comment = task.comments.id(commentId);

    if (!comment)
      return {
        message: MESSAGES.commentNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.role !== "ADMIN" &&
      session.userId !== comment.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    if (!newContent || newContent.trim().length === 0) {
      return {
        message: MESSAGES.invalidData,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    }

    if (tag) {
      comment.tags = [
        {
          tagName: tag.label,
          tagSlug: tag.value,
          bgc: tag.color,
        },
      ];
    }

    comment.content = newContent.trim();
    comment.updatedAt = new Date();

    await task.save();

    revalidatePath(`/tasks`);

    return {
      message: MESSAGES.commentUpdated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.error("Error editing comment:", error);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const deleteComment = async (data) => {
  try {
    await connectDB();
    const { taskID, commentId } = data;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const task = await ZedkalaTask.findById(taskID);

    if (!task)
      return {
        message: MESSAGES.taskNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const comment = task.comments.id(commentId);

    if (!comment)
      return {
        message: MESSAGES.commentNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.role !== "ADMIN" &&
      session.userId !== comment.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    task.comments = task.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await task.save();

    revalidatePath(`/tasks`);

    return {
      message: MESSAGES.commentDeleted,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

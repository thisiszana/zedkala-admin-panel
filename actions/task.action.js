"use server";

import { revalidatePath } from "next/cache";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import ZedkalaTask from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";

export const createTask = async (data) => {
  try {
    await connectDB();

    const session = getServerSession();
    const { title, description, status, dueDate, taskOwner } = data;

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

export const getTasks = async () => {
  try {
    await connectDB();

    const tasks = await ZedkalaTask.find()
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName image roll",
      })
      .lean();

    return {
      tasks: {
        todo: tasks?.filter((task) => task.status === "Todo"),
        progress: tasks?.filter((task) => task.status === "Progress"),
        done: tasks?.filter((task) => task.status === "Done"),
      },
      message: MESSAGES.success,
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

    const { title, description, status, dueDate, id, taskOwner } = data;

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

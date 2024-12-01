"use server";

import { revalidatePath } from "next/cache";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import ZedkalaTask from "@/models/zedkalaTask";
import connectDB from "@/utils/connectDB";
import ZedkalaAdmin from "@/models/zedkalaAdmin";

export const createTask = async (data) => {
  try {
    await connectDB();

    const session = getServerSession();

    const { title, description, status, dueDate } = data;

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

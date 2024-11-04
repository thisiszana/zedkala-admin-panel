"use server";

import { revalidatePath } from "next/cache";

import ZedkalaAdmin from "@/models/zedkalaAdmin";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { ZedkalaCategory } from "@/models/zedkalaCategory";

export const createCategory = async (data) => {
  try {
    await connectDB();

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

    const admin = await ZedkalaAdmin.findById(session.userId);

    const {
      name,
      slug,
      isFeatured,
      brands,
      order,
      subcategories,
      image,
      published,
    } = data;

    if (!name)
      return {
        message: MESSAGES.nameRequired,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };

    if (!slug)
      return {
        message: MESSAGES.slugRequired,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };

    const existingSlug = await ZedkalaCategory.findOne({ slug });
    if (existingSlug)
      return {
        message: MESSAGES.slugAlreadyExists,
        status: MESSAGES.failed,
        code: STATUS_CODES.conflict,
      };

    const existingCategory = await ZedkalaCategory.findOne({ name });
    if (existingCategory)
      return {
        message: MESSAGES.categoryAlreadyExists,
        status: MESSAGES.failed,
        code: STATUS_CODES.conflict,
      };

    const newCategory = await ZedkalaCategory.create({
      name,
      slug,
      isFeatured,
      brands,
      order,
      subcategories,
      image,
      published,
      createdBy: session.userId,
    });

    admin.categoryCreated.push(newCategory._id);
    await admin.save();

    revalidatePath("/categories");

    return {
      message: MESSAGES.categoryCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in create category:", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getCategories = async () => {
  try {
    await connectDB();

    const categories = await ZedkalaCategory.find()
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName image",
      })
      .lean();

    const sanitizedCategories = categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
      createdBy: {
        ...category.createdBy,
        _id: category.createdBy?._id?.toString(),
      },
    }));

    return {
      category: sanitizedCategories,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in get category:", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getCategory = async (id) => {
  try {
    await connectDB();

    const category = await ZedkalaCategory.findById(id)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName image",
      })
      .lean();

    return {
      category,
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

export const changeCategoryStatus = async (data) => {
  try {
    await connectDB();

    const { id, action } = data;

    const session = getServerSession();

    const category = await ZedkalaCategory.findById(id);

    if (
      session.role !== "owner" &&
      session.userId !== category.createdBy.toString()
    )
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    if (action === "publish") {
      category.published = true;
      await category.save();
    } else if (action === "draft") {
      category.published = false;
      await category.save();
    }

    revalidatePath("/categories");

    return {
      message: MESSAGES.update,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in change status category:", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const editCategory = async (data) => {
  try {
    await connectDB();

    const { categoryName, subCategories, image, published, id } = data;

    if (!name || !subCategories || !id)
      return {
        message: MESSAGES.fields,
        status: MESSAGES.update,
        code: STATUS_CODES.updated,
      };

    const session = getServerSession();

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const category = await ZedkalaCategory.findById(id);

    if (session.userId !== category.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    let newImage;

    if (!category.image && !image) {
      return {
        message: MESSAGES.putImage,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    } else if (image) {
      newImage = image;
    } else {
      newImage = category.image;
    }

    category.categoryName = categoryName;
    category.subCategories = subCategories;
    category.image = newImage;
    category.published = published;

    await category.save();

    revalidatePath("/categories");

    return {
      message: MESSAGES.categoryEdited,
      status: MESSAGES.success,
      code: STATUS_CODES.updated,
    };
  } catch (error) {
    console.log("categories edit error", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const deleteCategory = async (data) => {
  try {
    await connectDB();

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

    const category = await ZedkalaCategory.findById(data.id);

    if (!category)
      return {
        message: MESSAGES.categoryNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.role !== "owner" &&
      session.userId !== category.createdBy.toString()
    )
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    await ZedkalaCategory.findByIdAndDelete(data.id);

    revalidatePath("/categories");

    return {
      message: MESSAGES.categoryDeleted,
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

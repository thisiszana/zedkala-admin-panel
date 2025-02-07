"use server";

import { revalidatePath } from "next/cache";

import { ZedkalaProducts } from "@/models/zedkalaProducts";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import ZedkalaAdmin from "@/models/zedkalaAdmin";
import { sanitizeData } from "@/utils/fun";
import connectDB from "@/utils/connectDB";

export const createProduct = async (data) => {
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
      title,
      description,
      expertReview,
      weight,
      vendor,
      introduction,
      images,
      price,
      stock,
      discount,
      categoryName,
      subCategories,
      specifications,
      colors,
      sizes,
      brand,
      keywords,
      returnPolicy,
      warranty,
      published,
      deliveryOptions,
      insurance,
      slug,
      isGrocery,
    } = data;

    const newProduct = await ZedkalaProducts.create({
      title,
      description,
      expertReview,
      weight,
      vendor,
      introduction,
      images,
      price,
      stock,
      discount,
      categoryName: categoryName.toLowerCase(),
      subCategories,
      slug,
      specifications,
      colors,
      sizes,
      brand,
      keywords,
      returnPolicy,
      warranty,
      published,
      insurance,
      deliveryOptions,
      isGrocery,
      createdBy: session.userId,
    });

    admin.productsCreated.push(newProduct._id);
    await admin.save();

    revalidatePath("/products");

    return {
      message: MESSAGES.productCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in add product", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getProducts = async (searchParams) => {
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

    const { page, search, stock, discount, sort, category, published } =
      searchParams;

    let query = {};
    let filters = {};

    if (search && search.trim() !== "") query = { $text: { $search: search } };

    if (stock) filters.stock = stock === "in-stock" ? { $gt: 0 } : { $eq: 0 };

    if (discount)
      filters["discount.value"] =
        discount === "has-discount" ? { $gt: 0 } : { $eq: 0 };

    if (category) filters.slug = category.toLowerCase();

    if (published)
      published === "true"
        ? (filters.published = true)
        : (filters.published = false);

    const pageNumber = page || 1;
    const perPage = 5;
    const totalProductsWithoutFilter = await ZedkalaProducts.countDocuments();
    const totalProducts = await ZedkalaProducts.countDocuments({
      ...query,
      ...filters,
    });
    const totalPages = Math.ceil(totalProducts / perPage);

    const products = await ZedkalaProducts.find({ ...filters, ...query })
      .sort({
        ...(sort == 1
          ? { createdAt: -1 }
          : sort == 2
          ? { createdAt: 1 }
          : sort == 3
          ? { price: -1 }
          : sort == 4
          ? { price: 1 }
          : sort == 5
          ? { orders: -1 }
          : {}),
      })
      .skip((pageNumber - 1) * perPage)
      .limit(perPage)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName image",
      })
      .lean();

    return {
      products,
      totalPages,
      totalProducts,
      totalProductsWithoutFilter,
      status: MESSAGES.success,
      code: 200,
    };
  } catch (error) {
    console.log("error in get products", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getProduct = async (id) => {
  try {
    await connectDB();

    const product = await ZedkalaProducts.findById(id)
      .populate({
        path: "createdBy",
        model: ZedkalaAdmin,
        select: "username firstName images",
      })
      .lean();

    const sanitizedProduct = sanitizeData(product);

    return {
      product: sanitizedProduct,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in get product", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const changeProductStatus = async (data) => {
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

    const product = await ZedkalaProducts.findById(data.id);

    if (!product)
      return {
        message: MESSAGES.productNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.roll === "ADMIN" &&
      session.userId !== product.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    if (data.action === "publish") {
      product.published = true;
      await product.save();
    } else if (data.action === "draft") {
      product.published = false;
      await product.save();
    }

    revalidatePath("/products");

    return {
      message: MESSAGES.update,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error in change product status", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const deleteProduct = async (data) => {
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

    const product = await ZedkalaProducts.findById(data.id);

    if (!product)
      return {
        message: MESSAGES.productNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.roll === "ADMIN" &&
      session.userId !== product.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    await ZedkalaProducts.findByIdAndDelete(data.id);

    await ZedkalaAdmin.findOneAndUpdate(
      { _id: product.createdBy },
      { $pull: { productsCreated: product._id } }
    );

    revalidatePath("/products");

    return {
      message: MESSAGES.productDeleted,
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

export const editProduct = async (data) => {
  try {
    await connectDB();

    const {
      title,
      slug,
      description,
      expertReview,
      weight,
      vendor,
      introduction,
      images,
      price,
      stock,
      discount,
      categoryName,
      subCategories,
      specifications,
      colors,
      sizes,
      brand,
      keywords,
      returnPolicy,
      warranty,
      published,
      insurance,
      deliveryOptions,
      isGrocery,
      id,
    } = data;

    if (!title || !price || !stock || !categoryName || !brand || !id)
      return {
        message: MESSAGES.fields,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };

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

    const product = await ZedkalaProducts.findById(id);

    if (!product)
      return {
        message: MESSAGES.productNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (
      session.roll === "ADMIN" &&
      session.userId !== product.createdBy.toString()
    ) {
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };
    }

    let newImage;

    if (product.images.length <= 0 && images.length <= 0) {
      return {
        message: MESSAGES.imageNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    } else if (images.length > 0) {
      newImage = [...images, ...product.images];
    } else if (images.length <= 0 && product.images) {
      newImage = product.images;
    }

    let newKeywords;

    if (keywords.length > 0) {
      newKeywords = [...new Set([...product.keywords, ...keywords])];
    } else {
      newKeywords = product.keywords;
    }

    product.title = title;
    product.slug = slug;
    product.description = description;
    product.expertReview = expertReview;
    product.weight = weight;
    product.vendor = vendor;
    product.introduction = introduction;
    product.images = newImage;
    product.price = price;
    product.stock = stock;
    product.discount = discount;
    product.categoryName = categoryName;
    product.subCategories = subCategories;
    product.specifications = specifications;
    product.colors = colors;
    product.sizes = sizes;
    product.brand = brand;
    product.keywords = newKeywords;
    product.returnPolicy = returnPolicy;
    product.warranty = warranty;
    product.published = published;
    product.insurance = insurance;
    product.deliveryOptions = deliveryOptions;
    product.isGrocery = isGrocery;

    await product.save();

    revalidatePath("/products");

    return {
      message: MESSAGES.productEdited,
      status: MESSAGES.success,
      code: STATUS_CODES.updated,
    };
  } catch (error) {
    console.log("error in edit product ... ", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

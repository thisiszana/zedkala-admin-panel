import { NextResponse } from "next/server";

import { verify } from "jsonwebtoken";

import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import connectDB from "@/utils/connectDB";
import { SECRET_KEY } from "@/utils/var";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

export async function GET(req) {
  console.log(req);
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }

  try {
    const authorization = req.headers.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { msg: MESSAGES.unAuthorized, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const accessToken = authorization.split(" ")[1];

    let decode;
    try {
      decode = verify(accessToken, SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const userId = decode?.userId;

    if (!userId) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.invalidToken }
      );
    }

    const userCart = await ZedkalaUser.findOne({ _id: userId }).select("cart");

    if (!userCart)
      return NextResponse.json(
        { msg: MESSAGES.aUserNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, userCart },
      { status: STATUS_CODES.success }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.log("err in user/cart api", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const authorization = req.headers.get("Authorization");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { msg: MESSAGES.unAuthorized, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const accessToken = authorization.split(" ")[1];
    let decode;
    try {
      decode = verify(accessToken, SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const userId = decode?.userId;
    if (!userId) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const user = await ZedkalaUser.findById(userId);
    if (!user) {
      return NextResponse.json(
        { msg: MESSAGES.userNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const body = await req.json();
    const { action, productId } = body;

    if (!action || !productId) {
      return NextResponse.json(
        { msg: MESSAGES.fillInp, success: false },
        { status: STATUS_CODES.badRequest }
      );
    }

    const existingCartItemIndex = user.cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    let message = "";

    switch (action) {
      case "add":
        if (existingCartItemIndex !== -1) {
          user.cart.items[existingCartItemIndex].quantity += 1;
          message = `تعداد محصول به‌روزرسانی شد.`;
        } else {
          user.cart.items.push({ productId, quantity: 1 });
          message = `محصول به سبد خرید اضافه شد.`;
        }
        break;

      case "decrease":
        if (existingCartItemIndex !== -1) {
          const currentQuantity =
            user.cart.items[existingCartItemIndex].quantity;
          if (currentQuantity > 1) {
            user.cart.items[existingCartItemIndex].quantity -= 1;
            message = `تعداد محصول کاهش یافت.`;
          } else {
            user.cart.items.splice(existingCartItemIndex, 1);
            message = `محصول از سبد خرید حذف شد.`;
          }
        } else {
          message = `محصول مورد نظر در سبد خرید یافت نشد.`;
        }
        break;

      case "delete":
        if (existingCartItemIndex !== -1) {
          user.cart.items.splice(existingCartItemIndex, 1);
          message = `محصول از سبد خرید حذف شد.`;
        } else {
          message = `محصول مورد نظر در سبد خرید یافت نشد.`;
        }
        break;

      default:
        return NextResponse.json(
          { msg: MESSAGES.invalidAction, success: false },
          { status: STATUS_CODES.badRequest }
        );
    }

    user.cart.selectedItems = user.cart.items.map((item) => item.productId);
    user.cart.totalProductsCount = user.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    await user.save();

    return NextResponse.json(
      { msg: message, success: true, cart: user.cart },
      { status: STATUS_CODES.success }
    );
  } catch (error) {
    console.log("err in user/cart api", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

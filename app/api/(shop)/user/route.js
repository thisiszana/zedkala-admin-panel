import { NextResponse } from "next/server";

import { SECRET_KEY } from "@/utils/var";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import ZedkalaUser from "@/models/shop/zedkalaUser";
import { verify } from "jsonwebtoken";
import { hashedPassword, verifyPassword } from "@/utils/fun";
import { ZedkalaProducts } from "@/models/zedkalaProducts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req) {
  return new Response(null, {
    headers: corsHeaders,
    status: 204,
  });
}

export async function GET(req) {
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

    let decoded;
    try {
      decoded = verify(accessToken, SECRET_KEY);
    } catch (err) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const userId = decoded?.userId;
    if (!userId) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.invalidToken }
      );
    }

    const user = await ZedkalaUser.findById(userId).lean();

    if (!user) {
      return NextResponse.json(
        { msg: MESSAGES.aUserNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, user },
      { status: STATUS_CODES.success }
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

export async function PATCH(req) {
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

    let decoded;
    try {
      decoded = verify(accessToken, SECRET_KEY);
    } catch (err) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.unAuthorized }
      );
    }

    const userId = decoded?.userId;
    if (!userId) {
      return NextResponse.json(
        { msg: MESSAGES.invalidToken, success: false },
        { status: STATUS_CODES.invalidToken }
      );
    }

    const user = await ZedkalaUser.findById(userId).populate(
      "favoriteProducts",
      "title images stock price discount"
    );

    if (!user) {
      return NextResponse.json(
        { msg: MESSAGES.aUserNotFound, success: false },
        { status: STATUS_CODES.not_found }
      );
    }

    const body = await req.json();

    if (body.currentPassword) {
      const isPasswordValid = await verifyPassword(
        body.currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { msg: MESSAGES.noMatchPassword, success: false },
          { status: STATUS_CODES.badRequest }
        );
      }

      if (!body.newPassword) {
        return NextResponse.json(
          { msg: MESSAGES.newPasswordNotFound, success: false },
          { status: STATUS_CODES.badRequest }
        );
      }

      if (body.newPassword) {
        const hashPass = await hashedPassword(body.newPassword);
        user.password = hashPass;
      }
    }

    if (body.productId) {
      const product = await ZedkalaProducts.findById(body.productId);
      if (!product) {
        return NextResponse.json(
          { msg: MESSAGES.productNotFound, success: false },
          { status: STATUS_CODES.not_found }
        );
      }

      const isAlreadyAdded = user.favoriteProducts.some(
        (favProduct) => favProduct._id.toString() === product._id.toString()
      );

      if (body.action === "add" && !isAlreadyAdded) {
        user.favoriteProducts.push(product);
        await user.save();
      } else if (body.action === "remove" && isAlreadyAdded) {
        user.favoriteProducts = user.favoriteProducts.filter(
          (favProduct) => favProduct._id.toString() !== product._id.toString()
        );
        await user.save();
      } else {
        return NextResponse.json(
          {
            msg: isAlreadyAdded
              ? MESSAGES.alreadyAdded
              : MESSAGES.notInFavorites,
            success: false,
          },
          { status: STATUS_CODES.badRequest }
        );
      }
    }

    Object.keys(body).forEach((key) => {
      if (!["currentPassword", "newPassword", "productId"].includes(key)) {
        user[key] = body[key];
      }
    });

    await user.save();

    const response = NextResponse.json(
      { msg: MESSAGES.success, success: true, user },
      { status: STATUS_CODES.success }
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  } catch (error) {
    console.error("Error in PATCH API:", error.message);
    return NextResponse.json(
      { msg: MESSAGES.server, success: false },
      { status: STATUS_CODES.server }
    );
  }
}

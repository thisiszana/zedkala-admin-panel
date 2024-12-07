import { Schema, models, model } from "mongoose";

const zedkalaUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["man", "female", "etc"],
      default: "etc",
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
    cart: {
      items: [
        {
          productId: { type: Schema.Types.ObjectId, ref: "Products" },
          quantity: { type: Number, default: 0 },
          productDetails: { type: Object, default: {} },
        },
      ],
      selectedItems: [{ type: Schema.Types.ObjectId, ref: "Products" }],
      totalProductsCount: { type: Number, default: 0 },
      checkoutStatus: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

zedkalaUserSchema.index(
  { username: "text", firstName: "text" },
  {
    default_language: "persian",
  }
);

const ZedkalaUser =
  models?.ZedkalaUser || model("ZedkalaUser", zedkalaUserSchema);
export default ZedkalaUser;

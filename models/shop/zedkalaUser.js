import { Schema, models, model } from "mongoose";

const zedkalaUserSchema = new Schema(
  {
    images: { type: String, default: "" },
    imageType: {
      type: String,
      enum: ["default", "custom"],
      default: "custom",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: "",
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
    job: {
      type: String,
      default: "",
    },
    nationalcode: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "etc"],
      default: "etc",
    },
    birthDate: {
      type: Date,
      required: false,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "تاریخ تولد نمی‌تواند در آینده باشد!",
      },
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

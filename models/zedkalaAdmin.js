import { Schema, models, model } from "mongoose";

const zedkalaAdminSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    images: { type: String, default: "" },
    roll: { type: String, default: "USER" },
    productsCreated: [{ type: Schema.Types.ObjectId, ref: "ZedkalaProducts" }],
    categoryCreated: [{ type: Schema.Types.ObjectId, ref: "ZedkalaCategory" }],
    blogsCreated: [{ type: Schema.Types.ObjectId, ref: "ZedkalaBlog" }],
    isOnline: { type: Boolean, default: false },
    gender: {
      type: String,
      enum: ["آقا", "خانم", "سایر", ""],
      default: "",
    },
  },
  { timestamps: true }
);

zedkalaAdminSchema.index({ username: "text", firstName: "text" });

const ZedkalaAdmin =
  models?.ZedkalaAdmin || model("ZedkalaAdmin", zedkalaAdminSchema);
export default ZedkalaAdmin;

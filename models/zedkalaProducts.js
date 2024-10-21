import { Schema, models, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  images: { type: [String], required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: [
    {
      value: { type: Number, default: 0 },
      title: { type: String },
      expiresAt: { type: Date },
    },
  ],
  categoryName: {
    type: String,
    ref: "ZedkalaCategory",
    required: true,
  },
  subCategories: { type: String, ref: "ZedkalaCategory" },
  keywords: { type: [String], default: [] },
  brand: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "Like", default: [] }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 0, max: 5, required: true },
      review: { type: String, required: true },
      createdAt: { type: Date, default: () => Date.now() },
    },
  ],
  colors: { type: [String], default: ["#ffffff"] },
  returnPolicy: { type: String },
  warranty: { type: String },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  published: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
  specifications: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  orders: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: "Order" },
      quantity: { type: Number },
    },
  ],
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: "ZedkalProducts" }],
  deliveryOptions: {
    fastDelivery: { type: Boolean, default: false },
    freeDelivery: { type: Boolean, default: false },
  },
  insurance: [
    {
      insuranceType: { type: String },
      insuranceDuration: { type: Number },
      insuranceCost: { type: Number },
      insuranceTerms: { type: String },
      optionalInsurance: { type: Boolean, default: true },
      mandatoryInsurance: { type: Boolean, default: false },
    },
  ],
});

productSchema.index({ title: "text", description: "text", brand: "text" });

export const ZedkalProducts =
  models?.ZedkalProducts || model("ZedkalProducts", productSchema);

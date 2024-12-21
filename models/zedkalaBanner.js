import { Schema, models, model } from "mongoose";

const bannerSchema = new Schema({
  title: { type: String, required: true },
  images: { type: [String], required: true },
  time: {
    expiresAt: { type: Date, required: true },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    startAt: { type: Date, default: () => Date.now() },
  },
  published: { type: Boolean, default: false },
  order: {
    type: Number,
    default: 0,
  },
});

export const ZedkalaBanner =
  models?.ZedkalaBanner || model("ZedkalaBanner", bannerSchema);

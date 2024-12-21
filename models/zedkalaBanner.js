import { Schema, models, model } from "mongoose";

const bannerSchema = new Schema({
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
});

export const zedkalaBanner =
  models?.zedkalaBanner || model("zedkalaBanner", bannerSchema);

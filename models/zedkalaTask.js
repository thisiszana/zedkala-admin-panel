import { Schema, models, model } from "mongoose";

const zedkalaTaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  background: { type: String, default: "" },
  status: { type: String, default: "todo" },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "ZedkalaAdmin",
    required: true,
  },
  dueDate: {
    startAt: { type: Date, default: () => Date.now() },
    expiresAt: { type: Date, required: true },
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  taskOwner: {
    userId: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
    username: { type: String },
  },
  taskAssistants: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
      username: { type: String },
    },
  ],
  tags: [
    {
      tagName: { type: String },
      tagSlug: { type: String },
      bgc: { type: String },
    },
  ],
  comments: [
    {
      createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: () => Date.now() },
      updatedAt: { type: Date, default: () => Date.now() },
      replies: [
        {
          createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
          content: { type: String, required: true },
          createdAt: { type: Date, default: () => Date.now() },
        },
      ],
      likes: [{ type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" }],
      tags: [
        {
          tagName: { type: String },
          tagSlug: { type: String },
          bgc: { type: String },
        },
      ],
    },
  ],
});

zedkalaTaskSchema.index({ title: "text", description: "text" });

export const ZedkalaTask =
  models?.ZedkalaTask || model("ZedkalaTask", zedkalaTaskSchema);

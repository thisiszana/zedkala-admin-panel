import { Schema, models, model } from "mongoose";

const zedkalaTaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "todo" },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "ZedkalaAdmin",
    required: true,
  },
  boardId: { type: Schema.Types.ObjectId, ref: "ZedkalaBoard", required: true },
  listId: { type: Schema.Types.ObjectId, ref: "ZedkalaList", required: true },
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
  tags: [{ type: String }],
  comments: [
    {
      createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
      content: { type: String, required: true },
      createdAt: { type: Date, default: () => Date.now() },
    },
  ],
});

zedkalaTaskSchema.index({ title: "text", description: "text" });

const ZedkalaTask =
  models?.ZedkalaTask || model("ZedkalaTask", zedkalaTaskSchema);

const zedkalaBoardSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "ZedkalaAdmin",
    required: true,
  },
  lists: [{ type: Schema.Types.ObjectId, ref: "ZedkalaList" }],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const ZedkalaBoard =
  models?.ZedkalaBoard || model("ZedkalaBoard", zedkalaBoardSchema);

const zedkalaListSchema = new Schema({
  name: { type: String, required: true },
  boardId: { type: Schema.Types.ObjectId, ref: "ZedkalaBoard", required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "ZedkalaTask" }],
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

const ZedkalaList =
  models?.ZedkalaList || model("ZedkalaList", zedkalaListSchema);

export { ZedkalaTask, ZedkalaBoard, ZedkalaList };

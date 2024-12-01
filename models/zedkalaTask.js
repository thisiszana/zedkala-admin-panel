import { Schema, models, model } from "mongoose";

const zedkalaTaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, default: "todo" },
  createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
  dueDate: { type: Date, required: true, default: () => Date.now() },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutabale: true,
  },
});

zedkalaTaskSchema.index({ title: "text", description: "text" });

const ZedkalaTask =
  models?.ZedkalaTask || model("ZedkalaTask", zedkalaTaskSchema);

export default ZedkalaTask;

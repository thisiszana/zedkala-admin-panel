import { Schema, models, model } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subCategories: [
      {
        name: { type: String, trim: true }, 
        image: { type: String, trim: true }, 
      },
    ],
    image: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
  },
  { timestamps: true }
);

const ZedkalaCategory =
  models.ZedkalaCategory || model("ZedkalaCategory", categorySchema);

export default ZedkalaCategory;

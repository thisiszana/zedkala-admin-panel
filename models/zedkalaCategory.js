import { Schema, models, model } from "mongoose";

import slugify from "slugify";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    subCategories: { type: [String], default: [] },
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


categorySchema.pre("validate", function (next) {
  if (this.categoryName && !this.slug) {
    this.slug = slugify(this.categoryName, { lower: true, strict: true });
  }
  next();
});

const ZedkalaCategory =
  models.ZedkalaCategory || model("ZedkalaCategory", categorySchema);

export default ZedkalaCategory;

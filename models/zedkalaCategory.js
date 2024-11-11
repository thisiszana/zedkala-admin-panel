import { Schema, models, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  images: [String],
  parent: {
    type: Schema.Types.ObjectId,
    ref: "ZedkalaCategory",
    default: null,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "ZedkalaCategory",
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  brands: [
    {
      name: String,
      logo: String,
    },
  ],
  order: {
    type: Number,
    default: 0,
  },
  subcategories: [
    {
      name: String,
      items: [
        {
          name: String,
          image: String,
        },
      ],
      image: String,
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "ZedkalaAdmin" },
  published: { type: Boolean, default: false },
});

categorySchema.pre("save", async function (next) {
  if (this.parent) {
    const parentCategory = await this.model("ZedkalaCategory").findById(
      this.parent
    );
    if (parentCategory) {
      parentCategory.children.push(this._id);
      await parentCategory.save();
    }
  }
  next();
});

export const ZedkalaCategory =
  models.ZedkalaCategory || model("ZedkalaCategory", categorySchema);

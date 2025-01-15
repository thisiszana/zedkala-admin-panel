import { Schema, models, model } from "mongoose";
import slugify from "slugify";

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
      slug: {
        type: String,
        unique: true,
      },
    },
  ],
  order: {
    type: Number,
    default: 0,
  },
  subcategories: [
    {
      name: String,
      slug: {
        type: String,
        unique: true,
      },
      items: [
        {
          name: String,
          slug: {
            type: String,
            unique: true,
          },
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

categorySchema.index(
  {
    name: "text",
    slug: "text",
  },
  {
    default_language: "persian",
  }
);

categorySchema.index(
  {
    name: "text",
    slug: "text",
  },
  {
    default_language: "persian",
  }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (this.brands) {
    this.brands.forEach((brand) => {
      if (brand.name && !brand.slug) {
        brand.slug = slugify(brand.name, { lower: true, strict: true });
      }
    });
  }

  if (this.subcategories) {
    this.subcategories.forEach((subcategory) => {
      if (!subcategory.slug) {
        subcategory.slug = slugify(subcategory.name, {
          lower: true,
          strict: true,
        });
      }

      if (subcategory.items) {
        subcategory.items.forEach((item) => {
          if (!item.slug) {
            item.slug = slugify(item.name, { lower: true, strict: true });
          }
        });
      }
    });
  }

  next();
});

categorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }

  if (update.brands) {
    update.brands = update.brands.map((brand) => {
      if (brand.name && !brand.slug) {
        brand.slug = slugify(brand.name, { lower: true, strict: true });
      }
      return brand;
    });
  }

  if (update.subcategories) {
    update.subcategories = update.subcategories.map((subcategory) => {
      if (subcategory.name && !subcategory.slug) {
        subcategory.slug = slugify(subcategory.name, {
          lower: true,
          strict: true,
        });
      }

      if (subcategory.items) {
        subcategory.items = subcategory.items.map((item) => {
          if (item.name && !item.slug) {
            item.slug = slugify(item.name, { lower: true, strict: true });
          }
          return item;
        });
      }
      return subcategory;
    });
  }

  next();
});

export const ZedkalaCategory =
  models.ZedkalaCategory || model("ZedkalaCategory", categorySchema);

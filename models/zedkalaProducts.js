import { Schema, models, model } from "mongoose";

const deliverySchema = new Schema({
  deliveryOptions: {
    fastDelivery: { type: Boolean, default: false },
    freeDelivery: { type: Boolean, default: false },
    shippingToday: { type: Boolean, default: false },
    deliveryFee: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return this.freeDelivery ? value === 0 : value >= 0;
        },
        message: "اگر ارسال رایگان باشد، هزینه ارسال باید ۰ باشد.",
      },
    },
    estimatedDeliveryTime: {
      type: [
        {
          day: {
            type: String,
            enum: [
              "شنبه",
              "یکشنبه",
              "دوشنبه",
              "سه‌شنبه",
              "چهارشنبه",
              "پنجشنبه",
              "جمعه",
            ],
            required: true,
          },
          timeSlots: {
            type: [
              {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
              },
            ],
            validate: {
              validator: function (value) {
                return value.length > 0;
              },
              message: "هر روز باید حداقل یک بازه زمانی داشته باشد.",
            },
          },
        },
      ],
    },
    courierService: { type: String },
    deliveryNotes: { type: String },
  },
});

const WeightSchema = new Schema({
  weight: {
    value: {
      type: Number,
      required: true,
      min: [0, "وزن نمی‌تواند کمتر از صفر باشد"],
      validate: {
        validator: (v) => v < 1000,
        message: "وزن نباید بیش از 1000 باشد",
      },
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["g", "kg", "lb", "oz"], 
        message:
          "واحد وارد شده معتبر نیست. از واحدهای g، kg، lb، یا oz استفاده کنید.",
      },
      default: "kg",
    },
    range: {
      type: {
        min: { type: Number, required: false },
        max: { type: Number, required: false },
      },
      validate: {
        validator: function (v) {
          if (v.min != null && v.max != null) {
            return v.min <= v.max;
          }
          return true;
        },
        message: "حداقل وزن نمی‌تواند بیشتر از حداکثر وزن باشد.",
      },
    },
  },
});

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  images: { type: [String] },
  introduction: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  expertReview: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: {
    value: { type: Number, default: 0 },
    title: { type: String },
    expiresAt: { type: Date },
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    startAt: { type: Date, default: () => Date.now() },
  },
  weight: WeightSchema,
  categoryName: { type: String, required: true },
  subCategories: [
    {
      name: { type: String, required: true },
      slug: { type: String, required: true },
      items: {
        type: [
          {
            name: { type: String, required: true },
            slug: { type: String, required: true },
          },
        ],
        default: [],
      },
    },
  ],
  isGrocery: {
    type: Object,
    default: {
      value: false,
      slug: "grocery-product",
    },
  },
  slug: { type: String },
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
  sizes: { type: [String], default: [] },
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
      title: { type: String, required: true },
      items: [
        {
          label: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
  ],
  orders: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: "Order" },
      quantity: { type: Number },
    },
  ],
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: "ZedkalaProducts" }],
  deliveryOptions: deliverySchema,
  insurance: {
    insuranceType: { type: String },
    insuranceDuration: { type: Number },
    insuranceCost: { type: Number },
    insuranceTerms: { type: String },
    optionalInsurance: { type: Boolean, default: true },
    mandatoryInsurance: { type: Boolean, default: false },
  },
});

productSchema.index(
  {
    title: "text",
    description: "text",
    brand: "text",
    keywords: "text",
    discount: "text",
  },
  {
    default_language: "persian",
  }
);

export const ZedkalaProducts =
  models?.ZedkalaProducts || model("ZedkalaProducts", productSchema);

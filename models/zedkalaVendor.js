import { Schema, models, model } from "mongoose";

const zedkalaVendorSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, default: "" },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    country: { type: String, default: "" },
    avatar: { type: String, default: "" },
    images: { type: [String], default: "", required: true },
    taxCode: { type: String, default: "", required: true },
    businessLicense: { type: String, default: "", required: true },
    storeInfo: {
      storeName: { type: String, default: "", required: true },
      storeAddress: { type: String, default: "", required: true }, 
      images: { type: [String], default: [] }, 
    },
    productCategory: { type: String, default: "", required: true },
    roll: { type: String, default: "VENDOR" },
    terms: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: false },
    productsCreated: [{ type: Schema.Types.ObjectId, ref: "ZedkalaProducts" }],
  },
  { timestamps: true }
);

zedkalaVendorSchema.index({ username: "text", firstName: "text" });

const ZedkalaVendor =
  models?.ZedkalaVendor || model("ZedkalaVendor", zedkalaVendorSchema);
export default ZedkalaVendor;

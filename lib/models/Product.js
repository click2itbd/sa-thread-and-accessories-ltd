import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  images: [{ type: String }],
  keyFeatures: [{ type: String }],
  specifications: [{ label: String, value: String }],
  availableColors: [{ type: String }],
  extraColors: { type: Number, default: 0 },
  applications: [{ type: String }],
  packaging: [{ type: String }],
  packagingDetails: {
    type: { type: String },
    netWeight: { type: String },
    packing: { type: String },
  },
  productionCapacity: {
    perDay: { type: String },
    perMonth: { type: String },
  },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

productSchema.index({ isActive: 1, displayOrder: 1, createdAt: -1 });
productSchema.index({ category: 1, isActive: 1 });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;

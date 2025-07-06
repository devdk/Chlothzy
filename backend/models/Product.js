// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }, // URL to product image
    category: { type: String },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

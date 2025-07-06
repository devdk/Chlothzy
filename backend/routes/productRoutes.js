// backend/routes/productRoutes.js
import express from "express";
import { getAllProducts, createProduct } from "../controllers/productController.js";

const router = express.Router();

// Route: POST /api/products - Add a new product
router.post("/", createProduct);

// Route: GET /api/products - Get all products
router.get("/", getAllProducts);

export default router;

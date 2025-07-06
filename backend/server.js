// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config(); // ✅ Load env variables first

const app = express(); // ✅ Initialize app before using it
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());           // ✅ Now safe to use
app.use(express.json());   // Parse JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Chlothzy Backend is Running ✅");
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

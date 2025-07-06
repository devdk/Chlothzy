// backend/controllers/productController.js
import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let products;

    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, inStock } = req.body;
    const newProduct = new Product({ name, description, price, image, category, inStock });
    await newProduct.save();
    res.status(201).json({ msg: "Product created", product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create product" });
  }
};
export const getProductsGroupedByCategory = async (req, res) => {
  try {
    const products = await Product.find();

    const grouped = products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(product);
      return acc;
    }, {});

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

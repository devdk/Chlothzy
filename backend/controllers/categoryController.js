// controllers/categoryController.js
import Category from '../models/Category.js';

// GET /api/categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};



// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { title, image } = req.body;
    const newCategory = new Category({ title, image });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

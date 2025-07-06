// routes/categoryRoutes.js
import express from 'express';
import { getAllCategories, createCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory); // ✅ This line enables POST

export default router;

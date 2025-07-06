import express from "express";
import { register, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ✅ Add this protected test route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You accessed a protected route",
    user: req.user, // This is populated from the JWT
  });
});

export default router;

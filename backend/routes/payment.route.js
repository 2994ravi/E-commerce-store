import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-order", protectRoute, createRazorpayOrder);
router.post("/verify-payment", protectRoute, verifyPayment);

export default router;

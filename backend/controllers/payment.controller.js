import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/order.model.js";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const createRazorpayOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    products.forEach((product) => {
      const amount = Math.round(product.price * 100); // Convert to paise
      totalAmount += amount * (product.quantity || 1);
    });

    const options = {
      amount: totalAmount,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      notes: {
        userId: req.user._id.toString(),
        products: JSON.stringify(products.map(p => ({
          id: p._id,
          quantity: p.quantity,
          price: p.price
        })))
      }
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      razorpayOrderId: order.id,
      amount: totalAmount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      products,
      totalAmount,
    } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const newOrder = new Order({
      user: req.user._id,
      products: products.map((product) => ({
        product: product.id || product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: totalAmount / 100,
      razorpayOrderId: razorpay_order_id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified and order created.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};

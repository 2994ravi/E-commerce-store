import express from "express"
import dotenv from "dotenv"
dotenv.config();

import authRoute from "./routes/auth.route.js"
import productRoutes from './routes/product.route.js';
import cartRoutes from "./routes/cart.route.js"
import analyticsRoutes from "./routes/analytics.route.js"
import paymentRoutes from "./routes/payment.route.js"


import cors from "cors";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";





const app=express();
const PORT = process.env.PORT ;


app.use(
  cors({
    origin: "http://localhost:5173",  // React frontend URL
    credentials: true,                // Allow cookies to be sent
  })
);


app.use(express.json({limit:"10mb"})); //allows to parse the body of the request
app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/analytics",analyticsRoutes)
app.use("/api/payments",paymentRoutes);


app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
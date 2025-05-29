import express from "express"
import dotenv from "dotenv"

import authRoute from "./routes/auth.route.js"
import productRoutes from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import analyticsRoutes from "./routes/analytics.route.js"



import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";




dotenv.config();

const app=express();
const PORT=process.env.PORT ;


app.use(express.json()); //allows to parse the body of the request
app.use(cookieParser());

app.use("/api/auth",authRoute)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/analytics",analyticsRoutes)


app.listen (5000,()=>{
    console.log("server is running on http://localhost:"+PORT);
    connectDB();
})
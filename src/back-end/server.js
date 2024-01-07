import express from "express";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import uploadImageRoutes from "./routes/uploadImageRoutes.js";
dotenv.config();

import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;
connectDB(); // This will connect to the database
const app = express();

//body parser middleware
app.use(express.json()); //this will allow us to accept json data in the body
app.use(express.urlencoded({ extended: true })); //this will allow us to accept form data in the body

app.use(cookieParser()); //this will allow us to accept cookies in the body

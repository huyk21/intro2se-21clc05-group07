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
app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadImageRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "front-end/build")));

  // Serve the 'images' folder from the 'build' directory
  app.use(
    "/images",
    express.static(path.join(__dirname, "front-end/build/images"))
  );

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "front-end/public")));

  // Serve the 'images' folder from the 'build' directory
  app.use(
    "/images",
    express.static(path.join(__dirname, "front-end/public/images"))
  );

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"))
  );
}
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

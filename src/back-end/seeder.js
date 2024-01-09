import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";
// Load environment variables from the .env file.
dotenv.config();
connectDB();
// Function to import sample data into the database.
const importData = async () => {
  try {
    // Clear existing data in the Order, Product, and User collections.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    // Create an array of sample products with the adminUser assigned as the owner.
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    // Insert the sample products into the Product collection.
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // This will add the adminUser to each product, ...product will add all the other properties of the product
    });
    await Product.insertMany(sampleProducts);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
// Function to destroy all data in the Order, Product, and User collections.
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

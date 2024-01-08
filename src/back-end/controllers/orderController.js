import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calculatePrices } from "../utils/calculatePrices.js";
import {
  verifyPayPalPayment,
  checkIfNewTransaction,
} from "../utils/paypalHandler.js";
//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    // check if the transaction is new
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // check if all items are in stock
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calculatePrices(dbOrderItems);
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item, //spread operator, we will take all the properties of the item object except the _id
        product: item._id, //product is the id of the product
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      itemsPrice,
    });
    const createdOrder = await order.save(); //we have to do this because we have to save the order to the database, the order is not saved yet because we just created it
    res.status(201).json(createdOrder);
  }
});
//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }); //find all the orders that belong to the user
  res.status(200).json(orders);
});

//@desc Update order to paid
//@route PUT /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) {
    res.status(400);
    throw new Error("Payment not verified");
  }
  const isTransactionNew = await checkIfNewTransaction(Order, req.body.id);
  if (!isTransactionNew) {
    res.status(400);
    throw new Error("Transaction already processed");
  }

  const order = await Order.findById(req.params.id); //find the order by id
  if (order) {
    //check the correct amount is paid
    const correctPaidAmount = order.totalPrice.toString() === value;
    if (!correctPaidAmount) {
      res.status(400);
      throw new Error("Incorrect amount was paid");
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      //this is the object that paypal sends us back
      id: req.body.id, //id is the id of the transaction
      status: req.body.status, //status is the status of the transaction
      update_time: req.body.update_time, //update_time is the time of the transaction
      email_address: req.body.payer.email_address, //email_address is the email of the user
    };
    const updatedOrder = await order.save(); //save the order
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//@desc Update order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id); //find the order by id

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save(); //save the order
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});
//@desc Get order by id
//@route GET /api/orders/:id
//@access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user", //populate user field with the user object
    "name email" //only show name and email, it also show _id by default
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
export {
  addOrderItems,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getOrderById,
};

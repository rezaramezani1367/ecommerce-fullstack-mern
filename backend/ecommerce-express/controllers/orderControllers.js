const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");
const Profile = require("../models/Profile");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");

exports.submitOrder = asyncHandler(async (req, res, next) => {
  const order = new Order({ ...req.body, userId: req.user._id });
  await order.save();
  res
    .status(201)
    .send(
      await Order.findOne({ _id: order._id }, { userId: 0 }).populate(
        "orderItems.product"
      )
    );
});
exports.getOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find(
    { userId: req.user._id },
    { userId: 0 }
  ).populate("orderItems.product");

  res.status(201).send(order);
});
exports.getOneOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findOne(
    { userId: req.user._id, _id: req.params.id },
    { userId: 0 }
  ).populate("orderItems.product");

  res.status(201).send(order);
});

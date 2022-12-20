const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true, min: 0 },
      },
    ],
    shippingAddress: {
      address: {
        type: String,
        required: true,
        minLength: [10, "{PATH} must be least 10 character"],
      },
      city: {
        type: String,
        required: true,
        minLength: [3, "{PATH} must be least 3 character"],
      },
      postalCode: {
        type: String,
        required: true,
        validate(value) {
          if (!/^[1-9][0-9]{9}$/.test(value)) {
            throw new Error(
              `The postalCode field must be number(10character) and Shouldn not begin with 0 example 123456789`
            );
          }
        },
      },
      phone: {
        type: "String",
        required: true,
        validate(value) {
          if (!/^[0][9][0-9]{9}$/.test(value)) {
            throw new Error(
              `The mobile field must be number(11character) and started by 09 example 09123456789`
            );
          }
        },
      },
    },
    paymentMethod: { type: String, required: true, default: "cash" },
    shippingPrice: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

const Order = mongoose.model("Order", orderSchema);
// Apply the uniqueValidator plugin to orderSchema.
orderSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists(must be unique)",
});
module.exports = Order;

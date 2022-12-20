const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5,"{PATH} must be least 5 character"],
  },
  color: {
    type: String,
    required: true,
    default: "black",
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min:0
  },
  rating: {
    type: Number,
    required: true,
    min:0,
    max:5
  },
  brand: {
    type: String,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min:0,
    default:0,
  },
  image: {
    type: String,
    required: true,
  },
  numReviews: {
    type: Number,
    required: true,
    min:0,
    default:0
  },
  description: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const Product = mongoose.model("Product", productSchema);
// Apply the uniqueValidator plugin to productSchema.
productSchema.plugin(uniqueValidator, {
  message: "{PATH} already exists(must be unique)",
});
module.exports = Product;

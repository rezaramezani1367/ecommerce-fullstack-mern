const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const path = require("path");
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.find({}, { numReviews: 0 });
  // all category color brand without repeat

  const CategoriesRepeat = { category: [], color: [], brand: [], maxPrice: [] };
  product.forEach((item) => {
    CategoriesRepeat.category.push(item.category);
    CategoriesRepeat.color.push(item.color);
    CategoriesRepeat.brand.push(item.brand);
    CategoriesRepeat.maxPrice.push(item.price);
  });
  // console.log(CategoriesRepeat.maxPrice);
  // min and max price

  res.status(200).send({
    data: product,
    categories: [...new Set(CategoriesRepeat.category)],
    colors: [...new Set(CategoriesRepeat.color)],
    brands: [...new Set(CategoriesRepeat.brand)],
    maxPrice: Math.ceil(Math.max(...CategoriesRepeat.maxPrice)),
  });

  /*res.render("products/allProducts", {
    message: req.flash("success1"),
    path: "/api/v1/products",
    pageTitle: "All Products",
    product,
  });*/
});
exports.getOneProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: product,
  });
});

exports.createNewProductForm = asyncHandler(async (req, res, next) => {
  res.render("products/createProducts", {
    path: "/api/v1/products/create",
    pageTitle: "Add Product",
    message: req.flash("success1"),
    form: req.flash("form"),
  });
});
exports.createNewProduct = asyncHandler(async (req, res, next) => {
  // console.log(req.body);
  const product = await Product.create(req.body);
  req.flash("success1", "product created successfully");
  res.status(201).json({
    success: true,
    data: product,
  });

  // res.redirect("/api/v1/Products/");
});

exports.updateProductById = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: product,
  });
});

exports.deleteProductById = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  // const directoryPath = __basedir + "/public/";

  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${req.params.id} was not found`, 404)
    );
  }

  fs.unlink(path.join(__basedir, "/public", product.image), (err) => {
    if (err) {
      new ErrorResponse(err, 404);
    }
  });
  await product.remove();
  product = await Product.find({});
  /* req.flash("success1", "product deleted successfully"),
    res.redirect("/api/v1/Products/");*/
  res.status(200).json({
    success: true,
    data: product,
  });
});
exports.filterProducts = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const option = {
    page: req.body.page,
  };
  const filter = {};
  if (req.body.categories && req.body.categories.length) {
    filter["category"] = { $in: req.body.categories };
  }
  if (req.body.colors && req.body.colors.length) {
    filter["color"] = { $in: req.body.colors };
  }
  if (req.body.brands && req.body.brands.length) {
    filter["brand"] = { $in: req.body.brands };
  }
  if (req.body.min_price || req.body.max_price) {
    filter["price"] = { $gte: req.body.min_price, $lte: req.body.max_price };
  }
  console.log({ option ,filter});
  const product = await Product.paginate(filter, option);
  res.status(200).json({
    success: true,
    data: product,
  });
});

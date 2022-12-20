const express = require("express");
const productControllers = require("../controllers/productControllers");
const uploadImage = require("../upload/uploadImage");
const router = express.Router();

router.route("/").get(productControllers.getAllProducts);
// @route - /api/v1/Products/
// @route - /api/v1/Products/create
router
  .route("/create/")
  .get(productControllers.createNewProductForm)
  .post(
    uploadImage.single("image"),
    (req, res, next) => {
      if (!req.file) {
        req.body.image = null;
      } else {
        // req.body.image = req.file.filename;
        req.body.image = req.file.path.replace(/\\/g,'/').substring(6);
      }
      next();
    },
    productControllers.createNewProduct
  );

// @route - /api/v1/Products/someid
router
  .route("/:id")
  .get(productControllers.getOneProduct)
  .put(productControllers.updateProductById)
  .delete(productControllers.deleteProductById);

module.exports = router;

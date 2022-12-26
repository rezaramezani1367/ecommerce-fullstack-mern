const express = require("express");
const productControllers = require("../controllers/productControllers");
const uploadImage = require("../upload/uploadImage");
const router = express.Router();
const download = require("image-downloader");

router.route("/").get(productControllers.getAllProducts);
// @route - /api/v1/Products/
// @route - /api/v1/Products/create
router
  .route("/create/")
  .get(productControllers.createNewProductForm)
  .post(
    uploadImage.single("image"),
    async (req, res, next) => {
      if (!req.file) {
        // save image with link
        if (req.body.image) {
          const options = {
            url: req.body.image,
            dest: __basedir + "/public/products/images", // will be saved to /path/to/dest/image.jpg
          };
          await download
            .image(options)
            .then(({ filename }) => {
              const getFullName = req.body.image.split("/");
              req.body.image = `/products/images/${
                getFullName[getFullName.length - 1]
              }`;
            })
            .catch((err) => {
              req.body.image = null;
            });
        } else {
          req.body.image = null;
        }
      } else {
        // req.body.image = req.file.filename;
        req.body.image = req.file.path.replace(/\\/g, "/").substring(6);
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
  router
  .route("/filter")
  .post(productControllers.filterProducts)
module.exports = router;

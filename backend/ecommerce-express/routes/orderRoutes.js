const express = require("express");
const {
  submitOrder,
  getOrders,
  getOneOrder,
} = require("../controllers/orderControllers");
const router = express.Router();

router.route("/submit").post(submitOrder);
router.route("/").get(getOrders);
router.route("/:id").get(getOneOrder);

module.exports = router;

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order.controller");

const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../validators/order.validator");

router.post("/", authMiddleware, validate(createOrderSchema), createOrder);

router.get("/", authMiddleware, getOrders);

router.get("/:id", authMiddleware, getOrderById);

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);

module.exports = router;

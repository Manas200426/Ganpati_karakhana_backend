const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getWhatsAppMessage,
} = require("../controllers/order.controller");

const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../validators/order.validator");

router.post("/", authMiddleware, validate(createOrderSchema), createOrder);

router.get("/", authMiddleware, getOrders);

router.get("/:id", authMiddleware, getOrderById);

router.get("/:id/whatsapp-message", authMiddleware, getWhatsAppMessage);

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);

module.exports = router;
const {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} = require("../services/order.service");

const { buildOrderConfirmationMessage } = require("../utils/whatsappMessageBuilder");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/db");

const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.admin.id, req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersService(req.admin.id);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.admin.id, req.params.id);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await updateOrderStatusService(
      req.admin.id,
      req.params.id,
      req.body.status,
      req.body.notes,
    );

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getWhatsAppMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Fetch order with all required relations
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      workshop: true,
      murtiItems: true,
      admin: true,
    },
  });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  // Verify the order belongs to the current admin's workshop
  const admin = await prisma.admin.findUnique({
    where: { id: req.admin.id },
  });

  if (order.workshopId !== admin.workshopId) {
    throw new AppError("Unauthorized access to this order", 403);
  }

  // Check if customer has phone number
  if (!order.customer.phone) {
    throw new AppError("Customer phone number not available", 400);
  }

  // Generate message
  const message = buildOrderConfirmationMessage(order);

  res.status(200).json({
    success: true,
    data: {
      customerPhone: order.customer.phone,
      message,
    },
  });
});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getWhatsAppMessage,
};
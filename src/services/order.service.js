const prisma = require("../config/db");
const AppError = require("../utils/appError");

const {
  createOrderRepo,
  getOrdersRepo,
  getOrderByIdRepo,
  updateOrderStatusRepo,
  createStatusLogRepo,
} = require("../repositories/order.repository");

const createOrderService = async (
  adminId,
  data
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  if (!admin) {
    throw new AppError("Admin not found");
  }

  const customer =
    await prisma.customer.findFirst({
      where: {
        id: data.customerId,
        workshopId: admin.workshopId,
      },
    });

  if (!customer) {
    throw new AppError(
      "Customer not found in your workshop"
    );
  }

  const order = await createOrderRepo({
    workshopId: admin.workshopId,

    customerId: data.customerId,

    adminId,

    billNo: data.billNo,

    totalPrice: data.totalPrice,

    advancePaid: data.advancePaid,

    notes: data.notes,

    expectedDelivery: data.expectedDelivery,

    murtiItems: {
      create: data.murtiItems,
    },
  });

  return order;
};

const getOrdersService = async (
  adminId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  return getOrdersRepo(admin.workshopId);
};

const getOrderByIdService = async (
  adminId,
  orderId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  const order = await getOrderByIdRepo(
    orderId,
    admin.workshopId
  );

  if (!order) {
    throw new AppError("Order not found");
  }

  return order;
};

const updateOrderStatusService =
  async (
    adminId,
    orderId,
    newStatus,
    notes
  ) => {
    const admin =
      await prisma.admin.findUnique({
        where: {
          id: adminId,
        },
      });

    const order =
      await getOrderByIdRepo(
        orderId,
        admin.workshopId
      );

    if (!order) {
      throw new AppError("Order not found");
    }

    const updatedOrder =
      await updateOrderStatusRepo(
        orderId,
        newStatus
      );

    await createStatusLogRepo({
      orderId,

      adminId,

      oldStatus: order.status,

      newStatus,

      notes,
    });

    return updatedOrder;
  };

module.exports = {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
};
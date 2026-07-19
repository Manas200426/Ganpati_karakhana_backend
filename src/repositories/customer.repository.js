const prisma = require("../config/db");

const createCustomerRepo = async (data) => {
  return prisma.customer.create({
    data,
  });
};

const getCustomersRepo = async (workshopId) => {
  return prisma.customer.findMany({
    where: {
      workshopId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getCustomerByIdRepo = async (
  id,
  workshopId
) => {
  return prisma.customer.findFirst({
    where: {
      id,
      workshopId,
    },
  });
};

const updateCustomerRepo = async (
  id,
  data
) => {
  return prisma.customer.update({
    where: {
      id,
    },
    data,
  });
};

const getCustomerOrdersWithPhotosRepo = async (
  customerId
) => {
  return prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      murtiItems: {
        include: {
          photos: true,
        },
      },
    },
  });
};

const deleteCustomerCascadeRepo = async (
  customerId,
  orderIds
) => {
  return prisma.$transaction([
    prisma.statusLog.deleteMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
    }),
    prisma.murtiItem.deleteMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
    }),
    prisma.order.deleteMany({
      where: {
        customerId,
      },
    }),
    prisma.customer.delete({
      where: {
        id: customerId,
      },
    }),
  ]);
};

module.exports = {
  createCustomerRepo,
  getCustomersRepo,
  getCustomerByIdRepo,
  updateCustomerRepo,
  getCustomerOrdersWithPhotosRepo,
  deleteCustomerCascadeRepo,
};
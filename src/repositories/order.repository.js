const prisma = require("../config/db");

const createOrderRepo = async (data) => {
  return prisma.order.create({
    data,
    include: {
    customer: true,
    murtiItems: {
        include: {
            photos: true,
        },
    },
}
  });
};

const getOrdersRepo = async (workshopId) => {
  return prisma.order.findMany({
    where: {
      workshopId,
    },

    include: {
      customer: true,
      murtiItems: {
  include: {
    photos: {
      orderBy: {
        createdAt: "asc",
      },
    },
  },
},
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getOrderByIdRepo = async (id, workshopId) => {
  return prisma.order.findFirst({
    where: {
      id,
      workshopId,
    },

    include: {
      customer: true,
      murtiItems: {
        include: {
          photos: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      statusLogs: true,
    },
  });
};

const updateOrderStatusRepo = async (orderId, status) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },

    data: {
      status,
    },
  });
};

const createStatusLogRepo = async (data) => {
  return prisma.statusLog.create({
    data,
  });
};

module.exports = {
  createOrderRepo,
  getOrdersRepo,
  getOrderByIdRepo,
  updateOrderStatusRepo,
  createStatusLogRepo,
};

const prisma = require("../config/db");

const createWorkshopRepo = async (data) => {
  return prisma.workshop.create({
    data,
  });
};

const getWorkshopByIdRepo = async (id) => {
  return prisma.workshop.findUnique({
    where: {
      id,
    },
  });
};

const updateWorkshopRepo = async (
  id,
  data
) => {
  return prisma.workshop.update({
    where: {
      id,
    },
    data,
  });
};

const getWorkshopOrdersWithPhotosRepo = async (
  workshopId
) => {
  return prisma.order.findMany({
    where: {
      workshopId,
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

const deleteWorkshopCascadeRepo = async (
  workshopId,
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
        workshopId,
      },
    }),
    prisma.customer.deleteMany({
      where: {
        workshopId,
      },
    }),
    prisma.admin.deleteMany({
      where: {
        workshopId,
      },
    }),
    prisma.workshop.delete({
      where: {
        id: workshopId,
      },
    }),
  ]);
};

module.exports = {
  createWorkshopRepo,
  getWorkshopByIdRepo,
  updateWorkshopRepo,
  getWorkshopOrdersWithPhotosRepo,
  deleteWorkshopCascadeRepo,
};

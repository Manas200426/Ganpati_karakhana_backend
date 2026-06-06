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

module.exports = {
  createCustomerRepo,
  getCustomersRepo,
  getCustomerByIdRepo,
  updateCustomerRepo,
};
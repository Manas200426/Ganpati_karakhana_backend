const prisma = require("../config/db");

const findAdminByEmail = async (email) => {
  return prisma.admin.findUnique({
    where: {
      email,
    },
  });
};

const createAdmin = async (data) => {
  return prisma.admin.create({
    data,
  });
};

const findAdminById = async (id) => {
  return prisma.admin.findUnique({
    where: {
      id,
    },
  });
};

module.exports = {
  findAdminByEmail,
  createAdmin,
  findAdminById,
};
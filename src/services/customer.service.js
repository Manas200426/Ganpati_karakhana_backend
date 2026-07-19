const prisma = require("../config/db");
const AppError = require("../utils/appError");

const {
  createCustomerRepo,
  getCustomersRepo,
  getCustomerByIdRepo,
  updateCustomerRepo,
  getCustomerOrdersWithPhotosRepo,
  deleteCustomerCascadeRepo,
} = require("../repositories/customer.repository");
const { deleteImage } = require("./cloudinary.service");

const createCustomerService = async (
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

  const customer = await createCustomerRepo({
    ...data,
    workshopId: admin.workshopId,
  });

  return customer;
};

const getCustomersService = async (
  adminId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  return getCustomersRepo(admin.workshopId);
};

const getCustomerByIdService = async (
  adminId,
  customerId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  const customer = await getCustomerByIdRepo(
    customerId,
    admin.workshopId
  );

  if (!customer) {
    throw new AppError("Customer not found");
  }

  return customer;
};

const updateCustomerService = async (
  adminId,
  customerId,
  data
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  const existingCustomer =
    await getCustomerByIdRepo(
      customerId,
      admin.workshopId
    );

  if (!existingCustomer) {
    throw new AppError("Customer not found");
  }

  return updateCustomerRepo(customerId, data);
};

const deleteCustomerService = async (
  adminId,
  customerId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  const existingCustomer =
    await getCustomerByIdRepo(
      customerId,
      admin.workshopId
    );

  if (!existingCustomer) {
    throw new AppError("Customer not found");
  }

  const orders = await getCustomerOrdersWithPhotosRepo(
    customerId
  );

  const photos = orders.flatMap((order) =>
    order.murtiItems.flatMap((item) => item.photos)
  );

  await Promise.all(
    photos.map((photo) => deleteImage(photo.publicId))
  );

  const orderIds = orders.map((order) => order.id);

  return deleteCustomerCascadeRepo(customerId, orderIds);
};

module.exports = {
  createCustomerService,
  getCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
};
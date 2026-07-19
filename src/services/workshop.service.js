const prisma = require("../config/db");
const AppError = require("../utils/appError");
const { deleteImage } = require("./cloudinary.service");

const {
  createWorkshopRepo,
  getWorkshopByIdRepo,
  updateWorkshopRepo,
  getWorkshopOrdersWithPhotosRepo,
  deleteWorkshopCascadeRepo,
} = require("../repositories/workshop.repository");

const createWorkshopService = async (data) => {
  return createWorkshopRepo(data);
};

const getWorkshopByIdService = async (
  adminId,
  workshopId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  if (!admin || admin.workshopId !== workshopId) {
    throw new AppError("Workshop not found");
  }

  const workshop = await getWorkshopByIdRepo(workshopId);

  if (!workshop) {
    throw new AppError("Workshop not found");
  }

  return workshop;
};

const updateWorkshopService = async (
  adminId,
  workshopId,
  data
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  if (!admin || admin.workshopId !== workshopId) {
    throw new AppError("Workshop not found");
  }

  const existingWorkshop = await getWorkshopByIdRepo(
    workshopId
  );

  if (!existingWorkshop) {
    throw new AppError("Workshop not found");
  }

  return updateWorkshopRepo(workshopId, data);
};

const deleteWorkshopService = async (
  adminId,
  workshopId
) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  if (!admin || admin.workshopId !== workshopId) {
    throw new AppError("Workshop not found");
  }

  const existingWorkshop = await getWorkshopByIdRepo(
    workshopId
  );

  if (!existingWorkshop) {
    throw new AppError("Workshop not found");
  }

  const orders = await getWorkshopOrdersWithPhotosRepo(
    workshopId
  );

  const photos = orders.flatMap((order) =>
    order.murtiItems.flatMap((item) => item.photos)
  );

  await Promise.all(
    photos.map((photo) => deleteImage(photo.publicId))
  );

  const orderIds = orders.map((order) => order.id);

  return deleteWorkshopCascadeRepo(workshopId, orderIds);
};

module.exports = {
  createWorkshopService,
  getWorkshopByIdService,
  updateWorkshopService,
  deleteWorkshopService,
};

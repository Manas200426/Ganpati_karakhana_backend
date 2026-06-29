const prisma = require("../config/db");

const createPhotoRepo = async (data) => {
  return prisma.murtiPhoto.create({
    data,
  });
};

const createManyPhotosRepo = async (photos) => {
  return prisma.$transaction(
    photos.map((photo) =>
      prisma.murtiPhoto.create({
        data: photo,
      }),
    ),
  );
};

const getPhotosByMurtiItemRepo = async (murtiItemId) => {
  return prisma.murtiPhoto.findMany({
    where: {
      murtiItemId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

const deletePhotoRepo = async (photoId) => {
  return prisma.murtiPhoto.delete({
    where: {
      id: photoId,
    },
  });
};

const findPhotoByIdRepo = async (photoId) => {
  return prisma.murtiPhoto.findUnique({
    where: {
      id: photoId,
    },
  });
};

const findMurtiItemRepo = async (murtiItemId) => {
  return prisma.murtiItem.findUnique({
    where: {
      id: murtiItemId,
    },
  });
};

module.exports = {
  createPhotoRepo,
  createManyPhotosRepo,
  getPhotosByMurtiItemRepo,
  deletePhotoRepo,
  findPhotoByIdRepo,
  findMurtiItemRepo,
};
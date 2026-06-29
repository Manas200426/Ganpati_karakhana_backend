const {
  createManyPhotosRepo,
  findMurtiItemRepo,
  findPhotoByIdRepo,
  deletePhotoRepo,
  getPhotosByMurtiItemRepo,
} = require("../repositories/photo.repository");

const { uploadImage, deleteImage } = require("./cloudinary.service");
const AppError = require("../utils/appError");

const uploadMurtiPhotosService = async (murtiItemId, files) => {
  const murtiItem = await findMurtiItemRepo(murtiItemId);

  if (!murtiItem) {
    throw new Error("Murti item not found.");
  }

  const uploadedImages = [];

  try {
    // Upload all images to Cloudinary
    for (const file of files) {
      const image = await uploadImage(
        file.buffer,
        "ganpati-management/murti-photos",
      );

      uploadedImages.push(image);
    }
    const existingPhotos = await getPhotosByMurtiItemRepo(murtiItemId);

    const isFirstPhoto = existingPhotos.length === 0;

    const photoRecords = uploadedImages.map((image, index) => ({
      murtiItemId,
      imageUrl: image.url,
      publicId: image.publicId,
      isPrimary: isFirstPhoto && index === 0,
    }));

    const createdPhotos = await createManyPhotosRepo(photoRecords);

    return createdPhotos;
  } catch (error) {
    // Cleanup Cloudinary uploads
    for (const image of uploadedImages) {
      try {
        await deleteImage(image.publicId);
      } catch (_) {
        // Ignore cleanup errors
      }
    }

    throw error;
  }
};
const deletePhotoService = async (photoId) => {
  const photo = await findPhotoByIdRepo(photoId);

  if (!photo) {
    throw new AppError("Photo not found.", 404);
  }

  await deleteImage(photo.publicId);

  await deletePhotoRepo(photoId);
};
const getMurtiPhotosService = async (murtiItemId) => {
  return getPhotosByMurtiItemRepo(murtiItemId);
};
module.exports = {
  uploadMurtiPhotosService,
  deletePhotoService,
  getMurtiPhotosService,
};

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/appError");

const {
  uploadMurtiPhotosService,
  deletePhotoService,
  getMurtiPhotosService,
} = require("../services/photo.service");

const uploadMurtiPhotos = asyncHandler(async (req, res) => {
  const { murtiItemId } = req.params;

  if (!req.files || req.files.length === 0) {
    throw new AppError("Please upload at least one image.", 400);
  }

  const photos = await uploadMurtiPhotosService(murtiItemId, req.files);

  res.status(201).json({
    success: true,
    message: "Photos uploaded successfully.",
    data: photos,
  });
});
const deleteMurtiPhoto = asyncHandler(async (req, res) => {
  await deletePhotoService(req.params.photoId);

  res.status(200).json({
    success: true,
    message: "Photo deleted successfully.",
  });
});
const getMurtiPhotos = asyncHandler(async (req, res) => {
  const photos = await getMurtiPhotosService(req.params.murtiItemId);

  res.json({
    success: true,
    data: photos,
  });
});
module.exports = {
  uploadMurtiPhotos,
  deleteMurtiPhoto,
  getMurtiPhotos,
};

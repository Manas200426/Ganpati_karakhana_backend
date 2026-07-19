const {
  createWorkshopService,
  getWorkshopByIdService,
  updateWorkshopService,
  deleteWorkshopService,
} = require("../services/workshop.service");

const createWorkshop = async (req, res) => {
  try {
    const workshop = await createWorkshopService(
      req.body
    );

    res.status(201).json({
      success: true,
      data: workshop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getWorkshopById = async (
  req,
  res
) => {
  try {
    const workshop = await getWorkshopByIdService(
      req.admin.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: workshop,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateWorkshop = async (
  req,
  res
) => {
  try {
    const workshop = await updateWorkshopService(
      req.admin.id,
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: workshop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteWorkshop = async (
  req,
  res
) => {
  try {
    await deleteWorkshopService(
      req.admin.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Workshop deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createWorkshop,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
};

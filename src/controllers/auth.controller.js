const {
  registerAdminService,
  loginAdminService,
  getCurrentAdminService,
} = require("../services/auth.service");

const asyncHandler = require("../utils/asyncHandler");

const registerAdmin = asyncHandler(async (req, res) => {
  const result = await registerAdminService(req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const result = await loginAdminService(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
  const admin = await getCurrentAdminService(req.admin.id);

  res.status(200).json({
    success: true,
    data: admin,
  });
});
module.exports = {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
};

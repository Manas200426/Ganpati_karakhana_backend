const asyncHandler = require("../utils/asyncHandler");

const { getDashboardStatsService } = require("../services/dashboard.service");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService(req.admin.id);

  res.status(200).json({
    success: true,
    data: stats,
  });
});

module.exports = {
  getDashboardStats,
};

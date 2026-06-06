const prisma = require("../config/db");

const {
  getDashboardStatsRepo,
} = require("../repositories/dashboard.repository");

const getDashboardStatsService = async (adminId) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id: adminId,
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  return getDashboardStatsRepo(admin.workshopId);
};

module.exports = {
  getDashboardStatsService,
};

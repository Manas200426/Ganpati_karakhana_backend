const prisma = require("../config/db");

const getDashboardStatsRepo = async (workshopId) => {
  const [
    totalOrders,
    pendingOrders,
    readyOrders,
    deliveredOrders,
    totalCustomers,
    revenueData,
    advanceData,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({ where: { workshopId } }),

    prisma.order.count({
      where: { workshopId, status: "PENDING" },
    }),

    prisma.order.count({
      where: {
        workshopId,
        status: "READY",
      },
    }),

    prisma.order.count({
      where: {
        workshopId,
        status: "DELIVERED",
      },
    }),

    prisma.customer.count({
      where: {
        workshopId,
      },
    }),

    prisma.order.aggregate({
      where: {
        workshopId,
      },

      _sum: {
        totalPrice: true,
      },
    }),

    prisma.order.aggregate({
      where: {
        workshopId,
      },

      _sum: {
        advancePaid: true,
      },
    }),

    prisma.order.findMany({
      where: {
        workshopId,
      },

      include: {
        customer: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),
  ]);

  return {
    totalOrders,

    pendingOrders,

    readyOrders,

    deliveredOrders,

    totalCustomers,

    totalRevenue: revenueData._sum.totalPrice || 0,

    advanceReceived: advanceData._sum.advancePaid || 0,

    recentOrders,
  };
};

module.exports = {
  getDashboardStatsRepo,
};

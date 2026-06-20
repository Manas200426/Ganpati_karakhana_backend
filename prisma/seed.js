const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Prevent duplicate seeding
  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email: "admin@test.com",
    },
  });

  if (existingAdmin) {
    console.log("Seed already exists. Skipping...");
    return;
  }

  const workshop = await prisma.workshop.create({
    data: {
      name: "Kumbhar Ganpati Workshop",
      phone: "9999999999",
      whatsappNumber: "9324273637",
      address: "Pune",
    },
  });

  const passwordHash = await bcrypt.hash("123456", 10);

  const admin = await prisma.admin.create({
    data: {
      name: "Hemansh",
      email: "admin@test.com",
      passwordHash,
      workshopId: workshop.id,
    },
  });

  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        name: "Rahul Patil",
        phone: "9876543211",
        address: "Pimpri, Pune",
        workshopId: workshop.id,
      },
    }),

    prisma.customer.create({
      data: {
        name: "Suresh Jadhav",
        phone: "9876543212",
        address: "Nigdi, Pune",
        workshopId: workshop.id,
      },
    }),

    prisma.customer.create({
      data: {
        name: "Vikas More",
        phone: "8828375432",
        address: "Chinchwad, Pune",
        workshopId: workshop.id,
      },
    }),

    prisma.customer.create({
      data: {
        name: "Amit Kulkarni",
        phone: "9876543214",
        address: "Akurdi, Pune",
        workshopId: workshop.id,
      },
    }),
  ]);

  await prisma.order.create({
    data: {
      workshopId: workshop.id,
      customerId: customers[0].id,
      adminId: admin.id,
      billNo: "GK-2026-001",
      totalPrice: 18000,
      advancePaid: 10000,
      status: "PENDING",

      murtiItems: {
        create: [
          {
            murtiName: "Eco Friendly Ganpati",
            murtiType: "Shadu Mati",
            heightInches: 18,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      workshopId: workshop.id,
      customerId: customers[1].id,
      adminId: admin.id,
      billNo: "GK-2026-002",
      totalPrice: 30000,
      advancePaid: 15000,
      status: "IN_PROGRESS",

      murtiItems: {
        create: [
          {
            murtiName: "Morya Ganpati",
            murtiType: "POP",
            heightInches: 36,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      workshopId: workshop.id,
      customerId: customers[2].id,
      adminId: admin.id,
      billNo: "GK-2026-003",
      totalPrice: 45000,
      advancePaid: 25000,
      status: "PAINTING",

      murtiItems: {
        create: [
          {
            murtiName: "Bal Ganesh",
            murtiType: "Shadu Mati",
            heightInches: 48,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      workshopId: workshop.id,
      customerId: customers[3].id,
      adminId: admin.id,
      billNo: "GK-2026-004",
      totalPrice: 60000,
      advancePaid: 30000,
      status: "READY",

      murtiItems: {
        create: [
          {
            murtiName: "Maharaja Ganpati",
            murtiType: "Fiber",
            heightInches: 72,
          },
        ],
      },
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
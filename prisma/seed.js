const { PrismaClient } = require("@prisma/client");

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const workshop = await prisma.workshop.create({
    data: {
      name: "Kumbhar Ganpati Workshop",

      phone: "9999999999",

      address: "Pune",
    },
  });

  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.admin.create({
    data: {
      name: "Hemansh",

      email: "admin@test.com",

      passwordHash: hashedPassword,

      workshopId: workshop.id,
    },
  });

  for (let i = 1; i <= 10; i++) {
    const customer = await prisma.customer.create({
      data: {
        name: `Customer ${i}`,

        phone: `99999999${i}`,

        address: "Pune",

        workshopId: workshop.id,
      },
    });

    await prisma.order.create({
      data: {
        workshopId: workshop.id,

        customerId: customer.id,

        adminId: admin.id,

        billNo: `GK-2026-${i}`,

        totalPrice: 10000 + i * 1000,

        advancePaid: 5000,

        status: "PENDING",

        murtiItems: {
          create: [
            {
              murtiName: "Eco Friendly Ganpati",

              murtiType: "Shadu Mati",

              heightInches: 24,
            },
          ],
        },
      },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

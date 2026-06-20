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
      name: "DeepKala Mandir",
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

  console.log("Seed completed successfully.");
}

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
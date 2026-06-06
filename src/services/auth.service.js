const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");

const {
  findAdminByEmail,
  createAdmin,
  findAdminById,
} = require("../repositories/auth.repository");

const { generateToken } = require("../utils/jwt");

const registerAdminService = async ({
  name,
  email,
  password,
  workshopId,
}) => {
  const existingAdmin = await findAdminByEmail(email);

  if (existingAdmin) {
    throw new AppError("Admin already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await createAdmin({
    name,
    email,
    passwordHash: hashedPassword,
    workshopId,
  });

  const token = generateToken(admin);

  return {
    admin,
    token,
  };
};

const loginAdminService = async ({
  email,
  password,
}) => {
  const admin = await findAdminByEmail(email);

  if (!admin) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    admin.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(admin);

  return {
    admin,
    token,
  };
};

const getCurrentAdminService = async (id) => {
  return findAdminById(id);
};

module.exports = {
  registerAdminService,
  loginAdminService,
  getCurrentAdminService,
};
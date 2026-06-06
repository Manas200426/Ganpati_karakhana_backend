const { z } = require("zod");

const registerAdminSchema = z.object({
  name: z
    .string()
    .min(2, "Name required"),

  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password minimum 6 chars"),

  workshopId: z
    .string()
    .uuid("Invalid workshop ID"),
});

const loginSchema = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
    .min(6),
});

module.exports = {
  registerAdminSchema,
  loginSchema,
};
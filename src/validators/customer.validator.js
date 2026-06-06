const { z } = require("zod");

const createCustomerSchema = z.object({
  name: z
    .string()
    .min(3, "Customer name required"),

  phone: z
    .string()
    .min(10, "Invalid phone number")
    .max(10, "Invalid phone number"),

  address: z
    .string()
    .optional(),
});

const updateCustomerSchema = z.object({
  name: z.string().optional(),

  phone: z
    .string()
    .min(10)
    .max(10)
    .optional(),

  address: z
    .string()
    .optional(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
};
const { z } = require("zod");

const createWorkshopSchema = z.object({
  name: z.string().min(2, "Workshop name required"),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  address: z.string().optional(),
});

const updateWorkshopSchema = z.object({
  name: z.string().min(2, "Workshop name required").optional(),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  address: z.string().optional(),
});

module.exports = {
  createWorkshopSchema,
  updateWorkshopSchema,
};

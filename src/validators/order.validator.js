const { z } = require("zod");

const murtiItemSchema = z.object({
  murtiName: z.string().min(1, "Murti name is required"),

  murtiType: z.string().optional(),

  heightInches: z.coerce.number().min(1, "Height must be at least 1 inch").max(50, "Height seems too large").optional(),

  clayType: z.string().optional(),

  specialInstructions: z.string().optional(),
});

const createOrderSchema = z.object({
  customerId: z.string().uuid("Invalid customer"),

  billNo: z.string(1, "Bill number required"),

  totalPrice: z.number().min(1, "Price must be greater than 0"),

  advancePaid: z.number().min(0, "Advance cannot be negative"),

  notes: z.string().optional(),

  expectedDelivery: z.string().optional(),

  murtiItems: z.array(murtiItemSchema).min(1),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "PAINTING", "READY", "DELIVERED"]),

  notes: z.string().optional(),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
};

const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");
const {
  createCustomerSchema,
  updateCustomerSchema,
} = require("../validators/customer.validator");

router.post("/", authMiddleware,validate(createCustomerSchema), createCustomer);

router.get("/", authMiddleware, getCustomers);

router.get("/:id", authMiddleware, getCustomerById);

router.put("/:id", authMiddleware,validate(updateCustomerSchema), updateCustomer);

router.delete("/:id", authMiddleware, deleteCustomer);

module.exports = router;
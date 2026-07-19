const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createWorkshop,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
} = require("../controllers/workshop.controller");
const {
  createWorkshopSchema,
  updateWorkshopSchema,
} = require("../validators/workshop.validator");

router.post("/", validate(createWorkshopSchema), createWorkshop);

router.get("/:id", authMiddleware, getWorkshopById);

router.put("/:id", authMiddleware, validate(updateWorkshopSchema), updateWorkshop);

router.delete("/:id", authMiddleware, deleteWorkshop);

module.exports = router;

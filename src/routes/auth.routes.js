const express = require("express");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

const {registerAdminSchema,loginSchema,} = require("../validators/auth.validator");

const {registerAdmin,loginAdmin,getCurrentAdmin,} = require("../controllers/auth.controller");


const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register",validate(registerAdminSchema), registerAdmin);

router.post("/login", validate(loginSchema),loginAdmin);

router.get("/me", authMiddleware, getCurrentAdmin);

module.exports = router;
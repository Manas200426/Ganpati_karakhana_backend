const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const orderRoutes = require("./routes/order.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const testRoutes = require("./routes/test.routes")
const photoRoutes = require("./routes/photo.routes");
const workshopRoutes = require("./routes/workshop.routes");

const errorMiddleware = require("./middlewares/error.middleware");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Ganpati Karkhana API Running",
  });
});
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/test", testRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/workshops", workshopRoutes);

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "healthy",
    service: "ganpati-backend",
    timestamp: new Date().toISOString(),
  });
});
app.use(errorMiddleware);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

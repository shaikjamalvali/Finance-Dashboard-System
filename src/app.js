const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const buildSwaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const recordRoutes = require("./routes/record.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false
  })
);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API health check
 *     description: Returns service status. Useful for deployment/runtime verification.
 *     tags: [System]
 *     security: []
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             example:
 *               status: ok
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(buildSwaggerSpec()));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

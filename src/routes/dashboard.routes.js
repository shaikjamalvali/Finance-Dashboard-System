const express = require("express");

const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate.middleware");
const { authenticateUser } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { dashboardQuerySchema } = require("../validators/dashboard.validator");
const {
  getDashboardSummary,
  getDashboardCategoryTotals,
  getDashboardMonthlyTrends,
  getDashboardRecentActivity
} = require("../controllers/dashboard.controller");

const router = express.Router();

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get total income, expenses, net balance
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Summary totals returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 45200
 *                 totalExpenses:
 *                   type: number
 *                   example: 31800
 *                 netBalance:
 *                   type: number
 *                   example: 13400
 *       401:
 *         description: Missing or invalid bearer token
 */
router.get(
  "/summary",
  authenticateUser,
  authorizeRoles("admin", "analyst", "viewer"),
  validate(dashboardQuerySchema, "query"),
  asyncHandler(getDashboardSummary)
);

/**
 * @swagger
 * /dashboard/category-totals:
 *   get:
 *     summary: Get category-wise totals
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Category totals returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                         example: Investment
 *                       total:
 *                         type: number
 *                         example: 15064
 *       401:
 *         description: Missing or invalid bearer token
 */
router.get(
  "/category-totals",
  authenticateUser,
  authorizeRoles("admin", "analyst", "viewer"),
  validate(dashboardQuerySchema, "query"),
  asyncHandler(getDashboardCategoryTotals)
);

/**
 * @swagger
 * /dashboard/monthly-trends:
 *   get:
 *     summary: Get monthly income-expense trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-01-01
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-12-31
 *     responses:
 *       200:
 *         description: Monthly trends returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       period:
 *                         type: string
 *                         example: 2026-03
 *                       income:
 *                         type: number
 *                         example: 4200
 *                       expenses:
 *                         type: number
 *                         example: 3150
 *                       net:
 *                         type: number
 *                         example: 1050
 *       401:
 *         description: Missing or invalid bearer token
 */
router.get(
  "/monthly-trends",
  authenticateUser,
  authorizeRoles("admin", "analyst", "viewer"),
  validate(dashboardQuerySchema, "query"),
  asyncHandler(getDashboardMonthlyTrends)
);

/**
 * @swagger
 * /dashboard/recent-activity:
 *   get:
 *     summary: Get recent financial activity
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         example: 10
 *     responses:
 *       200:
 *         description: Recent activity returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 660d4f6f78f8e4c8f84f2b10
 *                       type:
 *                         type: string
 *                         example: income
 *                       category:
 *                         type: string
 *                         example: Consulting
 *                       amount:
 *                         type: number
 *                         example: 1200
 *                       date:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Missing or invalid bearer token
 */
router.get(
  "/recent-activity",
  authenticateUser,
  authorizeRoles("admin", "analyst", "viewer"),
  validate(dashboardQuerySchema, "query"),
  asyncHandler(getDashboardRecentActivity)
);

module.exports = router;

const express = require("express");
const Joi = require("joi");

const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate.middleware");
const { authenticateUser } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const {
  createRecordSchema,
  updateRecordSchema,
  listRecordSchema
} = require("../validators/record.validator");
const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} = require("../controllers/record.controller");

const router = express.Router();
const objectIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

/**
 * @swagger
 * /records:
 *   get:
 *     summary: List records with filters (admin, analyst)
 *     description: Requires Bearer token for admin or analyst role.
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *         example: expense
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: Food
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
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         example: groceries
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         example: 20
 *     responses:
 *       200:
 *         description: Records fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               items:
 *                 - _id: 660d4f6f78f8e4c8f84f2b10
 *                   amount: 450
 *                   type: expense
 *                   category: Food
 *                   date: 2026-03-15T00:00:00.000Z
 *                   notes: Weekly groceries
 *                   createdBy: 660d4eb378f8e4c8f84f2af1
 *               pagination:
 *                 page: 1
 *                 limit: 20
 *                 total: 1
 *                 totalPages: 1
 *       401:
 *         description: Missing or invalid bearer token
 *       403:
 *         description: Forbidden for current role
 *   post:
 *     summary: Create record (admin)
 *     description: Requires Bearer token for admin role.
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 1250
 *             type: income
 *             category: Consulting
 *             date: 2026-03-10
 *             notes: Client invoice payment
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1250
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               category:
 *                 type: string
 *                 example: Consulting
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-10
 *               notes:
 *                 type: string
 *                 example: Client invoice payment
 *     responses:
 *       201:
 *         description: Record created
 *         content:
 *           application/json:
 *             example:
 *               _id: 660d4f6f78f8e4c8f84f2b10
 *               amount: 1250
 *               type: income
 *               category: Consulting
 *               date: 2026-03-10T00:00:00.000Z
 *               notes: Client invoice payment
 *               createdBy: 660d4eb378f8e4c8f84f2af1
 *               createdAt: 2026-03-10T10:12:18.842Z
 *               updatedAt: 2026-03-10T10:12:18.842Z
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Missing or invalid bearer token
 *       403:
 *         description: Forbidden for current role
 */
router
  .route("/")
  .get(
    authenticateUser,
    authorizeRoles("admin", "analyst"),
    validate(listRecordSchema, "query"),
    asyncHandler(getRecords)
  )
  .post(
    authenticateUser,
    authorizeRoles("admin"),
    validate(createRecordSchema),
    asyncHandler(createRecord)
  );

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Get single record (admin, analyst)
 *     description: Requires Bearer token for admin or analyst role.
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660d4f6f78f8e4c8f84f2b10
 *     responses:
 *       200:
 *         description: Record fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 660d4f6f78f8e4c8f84f2b10
 *               amount: 450
 *               type: expense
 *               category: Food
 *               date: 2026-03-15T00:00:00.000Z
 *               notes: Weekly groceries
 *               createdBy: 660d4eb378f8e4c8f84f2af1
 *       400:
 *         description: Invalid record id
 *       404:
 *         description: Record not found
 *   patch:
 *     summary: Update record (admin)
 *     description: Requires Bearer token for admin role. Use an id returned by POST /records to test this endpoint.
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660d4f6f78f8e4c8f84f2b10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 500
 *             notes: Updated grocery expense
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-15
 *               notes:
 *                 type: string
 *                 example: Updated grocery expense
 *     responses:
 *       200:
 *         description: Record updated
 *         content:
 *           application/json:
 *             example:
 *               _id: 660d4f6f78f8e4c8f84f2b10
 *               amount: 500
 *               type: expense
 *               category: Food
 *               date: 2026-03-15T00:00:00.000Z
 *               notes: Updated grocery expense
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             example:
 *               message: Validation failed
 *               details:
 *                 - value must contain at least one of amount, type, category, date, notes
 *       401:
 *         description: Missing or invalid bearer token
 *         content:
 *           application/json:
 *             example:
 *               message: Authorization token is required
 *       403:
 *         description: Forbidden for non-admin users
 *         content:
 *           application/json:
 *             example:
 *               message: You do not have permission to perform this action
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             example:
 *               message: Record not found
 *   delete:
 *     summary: Delete record (admin)
 *     description: Requires Bearer token for admin role.
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660d4f6f78f8e4c8f84f2b10
 *     responses:
 *       204:
 *         description: Record deleted
 *       400:
 *         description: Invalid record id
 *       404:
 *         description: Record not found
 */
router
  .route("/:id")
  .get(
    authenticateUser,
    authorizeRoles("admin", "analyst"),
    validate(objectIdParamSchema, "params"),
    asyncHandler(getRecordById)
  )
  .patch(
    authenticateUser,
    authorizeRoles("admin"),
    validate(objectIdParamSchema, "params"),
    validate(updateRecordSchema),
    asyncHandler(updateRecord)
  )
  .delete(
    authenticateUser,
    authorizeRoles("admin"),
    validate(objectIdParamSchema, "params"),
    asyncHandler(deleteRecord)
  );

module.exports = router;

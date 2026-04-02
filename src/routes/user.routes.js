const express = require("express");
const Joi = require("joi");

const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate.middleware");
const { authenticateUser } = require("../middleware/auth.middleware");
const { authorizeRoles } = require("../middleware/role.middleware");
const { createUserSchema, updateUserSchema } = require("../validators/user.validator");
const {
  createUser,
  listUsers,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

const router = express.Router();
const objectIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users (admin)
 *     description: Requires admin Bearer token. Register an admin via /auth/register with role=admin, login, then click Authorize in Swagger.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users list returned
 *         content:
 *           application/json:
 *             example:
 *               items:
 *                 - _id: 660d4eb378f8e4c8f84f2af1
 *                   name: Jamal Vali Shaik
 *                   email: shaikjamalvali2004@gmail.com
 *                   role: admin
 *                   status: active
 *                   createdAt: 2026-03-08T08:20:01.721Z
 *                 - _id: 660d4f2a78f8e4c8f84f2b05
 *                   name: Jamal Vali Shaik
 *                   email: shaikjamalvali2004@gmail.com
 *                   role: analyst
 *                   status: active
 *                   createdAt: 2026-03-09T09:11:42.103Z
 *               total: 2
 *       401:
 *         description: Missing or invalid bearer token
 *       403:
 *         description: Forbidden for non-admin users
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to perform this action
 *   post:
 *     summary: Create a new user (admin)
 *     description: Requires admin Bearer token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Jamal Vali Shaik
 *             email: shaikjamalvali2004@gmail.com
 *             password: Shaik@2004Finance
 *             role: admin
 *             status: active
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jamal Vali Shaik
 *               email:
 *                 type: string
 *                 format: email
 *                 example: shaikjamalvali2004@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: Shaik@2004Finance
 *               role:
 *                 type: string
 *                 enum: [admin, analyst, viewer]
 *                 example: viewer
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 660d4f2a78f8e4c8f84f2b05
 *               name: Jamal Vali Shaik
 *               email: shaikjamalvali2004@gmail.com
 *               role: admin
 *               status: active
 *               createdAt: 2026-03-10T06:55:39.312Z
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already exists
 *         content:
 *           application/json:
 *             example:
 *               message: Email already exists
 */
router
  .route("/")
  .get(authenticateUser, authorizeRoles("admin"), asyncHandler(listUsers))
  .post(
    authenticateUser,
    authorizeRoles("admin"),
    validate(createUserSchema),
    asyncHandler(createUser)
  );

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user (admin)
 *     description: Requires admin Bearer token.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660d4f2a78f8e4c8f84f2b05
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Jamal Vali Shaik
 *             role: analyst
 *             status: active
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jamal Vali Shaik
 *               role:
 *                 type: string
 *                 enum: [admin, analyst, viewer]
 *                 example: analyst
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             example:
 *               _id: 660d4f2a78f8e4c8f84f2b05
 *               name: Jamal Vali Shaik
 *               email: shaikjamalvali2004@gmail.com
 *               role: analyst
 *               status: active
 *       400:
 *         description: Validation failed or admin self-protection triggered
 *         content:
 *           application/json:
 *             example:
 *               message: Admin cannot remove own admin role
 *       403:
 *         description: Forbidden for non-admin users
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to perform this action
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Delete a user (admin)
 *     description: Requires admin Bearer token.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660d4f2a78f8e4c8f84f2b05
 *     responses:
 *       204:
 *         description: User deleted
 *       400:
 *         description: Admin cannot delete own account
 *         content:
 *           application/json:
 *             example:
 *               message: Admin cannot delete own account
 *       403:
 *         description: Forbidden for non-admin users
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed to perform this action
 *       404:
 *         description: User not found
 */
router
  .route("/:id")
  .patch(
    authenticateUser,
    authorizeRoles("admin"),
    validate(objectIdParamSchema, "params"),
    validate(updateUserSchema),
    asyncHandler(updateUser)
  )
  .delete(
    authenticateUser,
    authorizeRoles("admin"),
    validate(objectIdParamSchema, "params"),
    asyncHandler(deleteUser)
  );

module.exports = router;

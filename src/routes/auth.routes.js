const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     description: To test Users endpoints, register with role set to admin, then login and use that token in Authorize.
 *     tags: [Auth]
 *     security: []
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
 *             required: [name, email, password]
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
 *                 example: admin
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: active
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             example:
 *               id: 660d4eb378f8e4c8f84f2af1
 *               name: Jamal Vali Shaik
 *               email: shaikjamalvali2004@gmail.com
 *               role: admin
 *               status: active
 *       400:
 *         description: Validation error or duplicate email
 *       409:
 *         description: Email already exists
 */
router.post("/register", validate(registerSchema), asyncHandler(register));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and receive JWT token
 *     description: Use the token from this response in Swagger Authorize as Bearer token.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: shaikjamalvali2004@gmail.com
 *             password: Shaik@2004Finance
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: shaikjamalvali2004@gmail.com
 *               password:
 *                 type: string
 *                 example: Shaik@2004Finance
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample
 *               user:
 *                 id: 660d4eb378f8e4c8f84f2af1
 *                 name: Jamal Vali Shaik
 *                 email: shaikjamalvali2004@gmail.com
 *                 role: admin
 *                 status: active
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: User account is inactive
 */
router.post("/login", validate(loginSchema), asyncHandler(login));

module.exports = router;

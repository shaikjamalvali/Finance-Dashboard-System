const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

async function createUser(req, res) {
  const { name, email, password, role, status } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role,
    status
  });

  return res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt
  });
}

async function listUsers(req, res) {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  return res.status(200).json({
    items: users,
    total: users.length
  });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const updates = req.body;

  if (String(req.user._id) === id) {
    if (updates.role && updates.role !== "admin") {
      throw new ApiError(400, "Admin cannot remove own admin role");
    }

    if (updates.status && updates.status !== "active") {
      throw new ApiError(400, "Admin cannot deactivate own account");
    }
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(user);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (String(req.user._id) === id) {
    throw new ApiError(400, "Admin cannot delete own account");
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(204).send();
}

module.exports = {
  createUser,
  listUsers,
  updateUser,
  deleteUser
};

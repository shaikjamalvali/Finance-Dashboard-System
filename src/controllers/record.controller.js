const mongoose = require("mongoose");
const Record = require("../models/record.model");
const { listRecords } = require("../services/record.service");
const ApiError = require("../utils/apiError");

async function createRecord(req, res) {
  const payload = {
    ...req.body,
    date: new Date(req.body.date),
    createdBy: req.user._id
  };

  const record = await Record.create(payload);
  return res.status(201).json(record);
}

async function getRecords(req, res) {
  const result = await listRecords(req.query);
  return res.status(200).json(result);
}

async function getRecordById(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid record id");
  }

  const record = await Record.findById(id);
  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return res.status(200).json(record);
}

async function updateRecord(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid record id");
  }

  const updates = { ...req.body };
  if (updates.date) {
    updates.date = new Date(updates.date);
  }

  const record = await Record.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return res.status(200).json(record);
}

async function deleteRecord(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid record id");
  }

  const deleted = await Record.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(404, "Record not found");
  }

  return res.status(204).send();
}

module.exports = {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};

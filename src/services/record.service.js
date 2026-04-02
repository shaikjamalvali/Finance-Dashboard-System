const Record = require("../models/record.model");

function buildRecordFilter(query) {
  const filter = {};

  if (query.type) {
    filter.type = query.type;
  }

  if (query.category) {
    filter.category = { $regex: query.category, $options: "i" };
  }

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) filter.date.$gte = new Date(query.startDate);
    if (query.endDate) filter.date.$lte = new Date(query.endDate);
  }

  if (query.q) {
    filter.$or = [
      { category: { $regex: query.q, $options: "i" } },
      { notes: { $regex: query.q, $options: "i" } }
    ];
  }

  return filter;
}

async function listRecords(query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 20);
  const skip = (page - 1) * limit;
  const filter = buildRecordFilter(query);

  const [items, total] = await Promise.all([
    Record.find(filter).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit),
    Record.countDocuments(filter)
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

module.exports = {
  listRecords,
  buildRecordFilter
};

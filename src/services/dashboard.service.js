const Record = require("../models/record.model");
const { buildRecordFilter } = require("./record.service");

function buildMatch(query) {
  const filter = buildRecordFilter(query);
  return filter;
}

async function getSummary(query) {
  const match = buildMatch(query);

  const rows = await Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  const income = rows.find((r) => r._id === "income")?.total || 0;
  const expenses = rows.find((r) => r._id === "expense")?.total || 0;

  return {
    totalIncome: income,
    totalExpenses: expenses,
    netBalance: income - expenses
  };
}

async function getCategoryTotals(query) {
  const match = buildMatch(query);

  return Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },
    { $sort: { total: -1 } },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1
      }
    }
  ]);
}

async function getMonthlyTrends(query) {
  const match = buildMatch(query);

  return Record.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type"
        },
        total: { $sum: "$amount" }
      }
    },
    {
      $group: {
        _id: {
          year: "$_id.year",
          month: "$_id.month"
        },
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0]
          }
        },
        expenses: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0]
          }
        }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        _id: 0,
        period: {
          $concat: [
            { $toString: "$_id.year" },
            "-",
            {
              $cond: [
                { $lt: ["$_id.month", 10] },
                { $concat: ["0", { $toString: "$_id.month" }] },
                { $toString: "$_id.month" }
              ]
            }
          ]
        },
        income: 1,
        expenses: 1,
        net: { $subtract: ["$income", "$expenses"] }
      }
    }
  ]);
}

async function getRecentActivity(query) {
  const match = buildMatch(query);
  const limit = Number(query.limit || 10);

  return Record.find(match).sort({ createdAt: -1 }).limit(limit);
}

module.exports = {
  getSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentActivity
};

const {
  getSummary,
  getCategoryTotals,
  getMonthlyTrends,
  getRecentActivity
} = require("../services/dashboard.service");

async function getDashboardSummary(req, res) {
  const summary = await getSummary(req.query);
  return res.status(200).json(summary);
}

async function getDashboardCategoryTotals(req, res) {
  const items = await getCategoryTotals(req.query);
  return res.status(200).json({ items });
}

async function getDashboardMonthlyTrends(req, res) {
  const items = await getMonthlyTrends(req.query);
  return res.status(200).json({ items });
}

async function getDashboardRecentActivity(req, res) {
  const items = await getRecentActivity(req.query);
  return res.status(200).json({ items });
}

module.exports = {
  getDashboardSummary,
  getDashboardCategoryTotals,
  getDashboardMonthlyTrends,
  getDashboardRecentActivity
};

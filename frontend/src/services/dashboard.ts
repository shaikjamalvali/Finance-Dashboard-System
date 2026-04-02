import api from './api'
import { DashboardSummary, CategoryTotal, MonthlyTrend, RecentActivity } from '../types'

export const dashboardService = {
  async getSummary() {
    const response = await api.get<DashboardSummary>('/dashboard/summary')
    return response.data
  },

  async getCategoryTotals() {
    const response = await api.get<{ items: CategoryTotal[] }>('/dashboard/category-totals')
    return response.data.items
  },

  async getMonthlyTrends() {
    const response = await api.get<{ items: MonthlyTrend[] }>('/dashboard/monthly-trends')
    return response.data.items
  },

  async getRecentActivity() {
    const response = await api.get<{ items: RecentActivity[] }>('/dashboard/recent-activity')
    return response.data.items
  },
}

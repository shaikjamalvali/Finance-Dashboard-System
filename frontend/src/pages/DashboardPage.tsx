import React from 'react'
import { MainLayout } from '../components/Layout/MainLayout'
import { DashboardSummary } from '../components/Dashboard/DashboardSummary'
import { CategoryChart } from '../components/Dashboard/CategoryChart'
import { TrendChart } from '../components/Dashboard/TrendChart'
import { RecentActivity } from '../components/Dashboard/RecentActivity'

export const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your financial data</p>
        </div>

        <DashboardSummary />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart />
          <TrendChart />
        </div>

        <RecentActivity />
      </div>
    </MainLayout>
  )
}

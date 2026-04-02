import React from 'react'
import { MainLayout } from '../components/Layout/MainLayout'
import { CategoryChart } from '../components/Dashboard/CategoryChart'
import { TrendChart } from '../components/Dashboard/TrendChart'

export const AnalyticsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Detailed financial analytics and insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart />
          <TrendChart />
        </div>
      </div>
    </MainLayout>
  )
}

import React from 'react'
import { useCategoryTotals } from '../../hooks/useDashboard'
import { Loading, ErrorAlert } from '../common/Common'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

export const CategoryChart: React.FC = () => {
  const { data, isLoading, error } = useCategoryTotals()

  if (isLoading) return <Loading text="Loading categories..." />
  if (error) return <ErrorAlert message="Failed to load category data" />

  const chartData = (data || []).map((item) => ({
    category: item.category,
    total: item.total,
    count: item.count,
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
      {chartData.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No category data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} fontSize={12} />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
            <Bar dataKey="total" fill="#3b82f6" name="Total Amount" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

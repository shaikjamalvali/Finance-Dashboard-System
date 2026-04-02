import React from 'react'
import { useMonthlyTrends } from '../../hooks/useDashboard'
import { Loading, ErrorAlert } from '../common/Common'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

export const TrendChart: React.FC = () => {
  const { data, isLoading, error } = useMonthlyTrends()

  if (isLoading) return <Loading text="Loading trends..." />
  if (error) return <ErrorAlert message="Failed to load trend data" />

  const chartData = (data || []).map((item) => ({
    month: item.month,
    income: item.income,
    expenses: item.expenses,
    net: item.net,
  }))

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
      {chartData.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No trend data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
            <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} name="Net" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

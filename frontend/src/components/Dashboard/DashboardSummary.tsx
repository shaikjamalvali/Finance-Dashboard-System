import React from 'react'
import { useDashboardSummary } from '../../hooks/useDashboard'
import { Loading, ErrorAlert } from '../common/Common'
import { formatCurrency } from '../../utils/formatters'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export const DashboardSummary: React.FC = () => {
  const { data, isLoading, error } = useDashboardSummary()

  if (isLoading) return <Loading text="Loading summary..." />
  if (error) return <ErrorAlert message="Failed to load summary" />

  const { totalIncome = 0, totalExpenses = 0, netBalance = 0, recordCount = 0 } = data || {}

  const cards = [
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Net Balance',
      value: formatCurrency(netBalance),
      icon: Wallet,
      color: netBalance >= 0 ? 'text-blue-600' : 'text-orange-600',
      bgColor: netBalance >= 0 ? 'bg-blue-50' : 'bg-orange-50',
    },
    {
      label: 'Records',
      value: recordCount.toString(),
      icon: null,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div key={idx} className={`${card.bgColor} rounded-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className={`text-2xl font-bold ${card.color} mt-2`}>{card.value}</p>
              </div>
              {Icon && <Icon className={`${card.color} h-8 w-8 opacity-50`} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}

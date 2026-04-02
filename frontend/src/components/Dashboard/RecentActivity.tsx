import React from 'react'
import { useRecentActivity } from '../../hooks/useDashboard'
import { Loading, ErrorAlert } from '../common/Common'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export const RecentActivity: React.FC = () => {
  const { data, isLoading, error } = useRecentActivity()

  if (isLoading) return <Loading text="Loading activity..." />
  if (error) return <ErrorAlert message="Failed to load activity" />

  const activities = data || []

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {activity.type === 'income' ? (
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                ) : (
                  <ArrowDownLeft className="h-5 w-5 text-red-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{activity.category}</p>
                  <p className="text-sm text-gray-600">{formatDate(activity.date)}</p>
                </div>
              </div>
              <p className={`font-semibold ${activity.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {activity.type === 'income' ? '+' : '-'}{formatCurrency(activity.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

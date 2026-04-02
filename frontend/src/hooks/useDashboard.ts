import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboard'
import { AxiosError } from 'axios'
import { ApiError } from '../types'

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => dashboardService.getSummary(),
    refetchInterval: 60000, // Refetch every 1 minute
  })
}

export const useCategoryTotals = () => {
  return useQuery({
    queryKey: ['dashboard', 'categoryTotals'],
    queryFn: () => dashboardService.getCategoryTotals(),
  })
}

export const useMonthlyTrends = () => {
  return useQuery({
    queryKey: ['dashboard', 'monthlyTrends'],
    queryFn: () => dashboardService.getMonthlyTrends(),
  })
}

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'recentActivity'],
    queryFn: () => dashboardService.getRecentActivity(),
  })
}

export const useRefreshDashboard = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.refetchQueries({ queryKey: ['dashboard'] })
  }
}

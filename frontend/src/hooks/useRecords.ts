import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { recordsService } from '../services/records'
import { AxiosError } from 'axios'
import { ApiError, Record } from '../types'

interface ListRecordsParams {
  page?: number
  limit?: number
  type?: 'income' | 'expense'
  category?: string
  startDate?: string
  endDate?: string
  q?: string
}

export const useRecords = (params?: ListRecordsParams) => {
  return useQuery({
    queryKey: ['records', params],
    queryFn: () => recordsService.listRecords(params),
  })
}

export const useRecord = (id: string | undefined) => {
  return useQuery({
    queryKey: ['records', id],
    queryFn: () => (id ? recordsService.getRecord(id) : null),
    enabled: !!id,
  })
}

export const useCreateRecord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: recordsService.createRecord,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['records'] })
      queryClient.refetchQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useUpdateRecord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      recordsService.updateRecord(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['records'] })
      queryClient.refetchQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useDeleteRecord = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: recordsService.deleteRecord,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['records'] })
      queryClient.refetchQueries({ queryKey: ['dashboard'] })
    },
  })
}

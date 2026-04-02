import api from './api'
import { Record, PaginatedResponse } from '../types'

interface ListRecordsParams {
  page?: number
  limit?: number
  type?: 'income' | 'expense'
  category?: string
  startDate?: string
  endDate?: string
  q?: string
}

interface CreateRecordData {
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  notes?: string
}

interface UpdateRecordData {
  amount?: number
  type?: 'income' | 'expense'
  category?: string
  date?: string
  notes?: string
}

export const recordsService = {
  async listRecords(params?: ListRecordsParams) {
    // Only include params that have actual values (filter out undefined)
    const queryParams = {
      page: params?.page || 1,
      limit: params?.limit || 10,
      ...(params?.type && { type: params.type }),
      ...(params?.category && { category: params.category }),
      ...(params?.startDate && { startDate: params.startDate }),
      ...(params?.endDate && { endDate: params.endDate }),
      ...(params?.q && { q: params.q }),
    }
    
    const response = await api.get<PaginatedResponse<Record>>('/records', {
      params: queryParams,
    })
    return response.data
  },

  async getRecord(id: string) {
    const response = await api.get<Record>(`/records/${id}`)
    return response.data
  },

  async createRecord(data: CreateRecordData) {
    const response = await api.post<Record>('/records', data)
    return response.data
  },

  async updateRecord(id: string, data: UpdateRecordData) {
    const response = await api.patch<Record>(`/records/${id}`, data)
    return response.data
  },

  async deleteRecord(id: string) {
    await api.delete(`/records/${id}`)
  },
}

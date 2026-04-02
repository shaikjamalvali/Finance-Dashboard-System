import api from './api'
import { User, PaginatedResponse } from '../types'

interface CreateUserData {
  name: string
  email: string
  password: string
  role: 'admin' | 'analyst' | 'viewer'
  status: 'active' | 'inactive'
}

interface UpdateUserData {
  name?: string
  email?: string
  password?: string
  role?: 'admin' | 'analyst' | 'viewer'
  status?: 'active' | 'inactive'
}

export const usersService = {
  async listUsers() {
    const response = await api.get<PaginatedResponse<User>>('/users')
    return response.data
  },

  async getUser(id: string) {
    const response = await api.get<User>(`/users/${id}`)
    return response.data
  },

  async createUser(data: CreateUserData) {
    const response = await api.post<User>('/users', data)
    return response.data
  },

  async updateUser(id: string, data: UpdateUserData) {
    const response = await api.patch<User>(`/users/${id}`, data)
    return response.data
  },

  async deleteUser(id: string) {
    await api.delete(`/users/${id}`)
  },
}

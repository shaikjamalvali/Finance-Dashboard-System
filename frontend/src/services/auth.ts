import api from './api'
import { AuthToken, User } from '../types'

export const authService = {
  async register(name: string, email: string, password: string) {
    const response = await api.post<User>('/auth/register', {
      name,
      email,
      password,
    })
    return response.data
  },

  async login(email: string, password: string) {
    const response = await api.post<AuthToken>('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

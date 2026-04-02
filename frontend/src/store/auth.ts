import { create } from 'zustand'
import { User, UserRole } from '../types'
import { authService } from '../services/auth'

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  hasPermission: (role?: UserRole) => boolean
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authService.login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      set({ user: data.user, token: data.token, isLoading: false })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      await authService.register(name, email, password)
      set({ isLoading: false })
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    authService.logout()
    set({ user: null, token: null, error: null })
  },

  setUser: (user: User | null) => {
    set({ user })
  },

  hasPermission: (role?: UserRole) => {
    const state = get()
    if (!state.user) return false
    if (!role) return true
    return state.user.role === role
  },

  isAuthenticated: () => {
    const state = get()
    return !!state.user && !!state.token
  },
}))

// Initialize auth state from localStorage
export const initializeAuth = () => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')

  if (token && userStr) {
    try {
      const user = JSON.parse(userStr)
      useAuthStore.setState({ user, token })
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
}

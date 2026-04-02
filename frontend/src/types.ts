export type UserRole = 'admin' | 'analyst' | 'viewer'
export type UserStatus = 'active' | 'inactive'
export type RecordType = 'income' | 'expense'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

export interface AuthToken {
  token: string
  user: User
}

export interface Record {
  id: string
  amount: number
  type: RecordType
  category: string
  date: string
  notes?: string
  createdBy: string
  createdAt: string
}

export interface DashboardSummary {
  totalIncome: number
  totalExpenses: number
  netBalance: number
  recordCount: number
}

export interface CategoryTotal {
  category: string
  total: number
  count: number
}

export interface MonthlyTrend {
  month: string
  income: number
  expenses: number
  net: number
}

export interface RecentActivity {
  id: string
  type: RecordType
  category: string
  amount: number
  date: string
}

export interface ApiError {
  status: number
  message: string
  details?: Record<string, string>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export const CATEGORIES = [
  'Salary',
  'Investment',
  'Bonus',
  'Freelance',
  'Interest',
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Other',
]

export const ROLE_PERMISSIONS = {
  admin: {
    label: 'Admin',
    color: 'bg-red-100 text-red-800',
    permissions: ['read', 'write', 'delete', 'manage_users'],
  },
  analyst: {
    label: 'Analyst',
    color: 'bg-blue-100 text-blue-800',
    permissions: ['read'],
  },
  viewer: {
    label: 'Viewer',
    color: 'bg-green-100 text-green-800',
    permissions: ['read_dashboard'],
  },
}

export const RECORD_TYPES = {
  income: { label: 'Income', color: 'text-green-600', bgColor: 'bg-green-50' },
  expense: { label: 'Expense', color: 'text-red-600', bgColor: 'bg-red-50' },
}

export const API_MESSAGES = {
  LOADING: 'Loading...',
  NO_DATA: 'No data available',
  ERROR_OCCURRED: 'An error occurred. Please try again.',
  SUCCESS: 'Operation successful',
  DELETE_CONFIRM: 'Are you sure you want to delete this item?',
}

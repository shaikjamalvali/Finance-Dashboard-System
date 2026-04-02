import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import {
  LayoutGrid,
  FileText,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  requiredRole?: 'admin' | 'analyst' | 'viewer'
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    label: 'Records',
    path: '/records',
    icon: <FileText className="h-5 w-5" />,
    requiredRole: 'analyst',
  },
  {
    label: 'Users',
    path: '/users',
    icon: <Users className="h-5 w-5" />,
    requiredRole: 'admin',
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
  },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user } = useAuthStore()

  const visibleItems = navItems.filter((item) => {
    if (!item.requiredRole) return true
    return user?.role === item.requiredRole || (user?.role === 'admin' && item.requiredRole !== 'viewer')
  })

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
            FD
          </div>
          <div>
            <h2 className="font-bold text-lg">FinanceHub</h2>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 w-full px-4 py-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 space-y-2">
          <p>Logged in as:</p>
          <p className="font-semibold text-white">{user?.email}</p>
          <p className="text-blue-400 capitalize">{user?.role}</p>
        </div>
      </div>
    </aside>
  )
}

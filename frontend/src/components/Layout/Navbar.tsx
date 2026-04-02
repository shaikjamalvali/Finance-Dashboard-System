import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { getInitials } from '../../utils/formatters'
import { LogOut, User } from 'lucide-react'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Finance Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold">
                    {getInitials(user.name)}
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-blue-100 text-xs">{user.role}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

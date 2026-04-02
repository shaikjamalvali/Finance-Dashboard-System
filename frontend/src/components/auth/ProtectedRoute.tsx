import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { UserRole } from '../../types'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, token } = useAuthStore()

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

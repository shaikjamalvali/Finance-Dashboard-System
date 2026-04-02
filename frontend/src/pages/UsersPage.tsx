import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { MainLayout } from '../components/Layout/MainLayout'
import { UsersList } from '../components/Users/UsersList'
import { UserForm } from '../components/Users/UserForm'
import { useAuthStore } from '../store/auth'
import { useUser } from '../hooks/useUsers'

export const UsersPage: React.FC = () => {
  const { user: currentUser } = useAuthStore()
  const [showForm, setShowForm] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)
  
  // Fetch user if editing
  const { data: editingUser } = useUser(editingUserId || undefined)

  // Only admin can access users page
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-2">Manage system users and their roles</p>
        </div>

        <UsersList
          onCreateNew={() => setShowForm(true)}
          onEdit={(id) => {
            setEditingUserId(id)
            setShowForm(true)
          }}
        />

        {showForm && (
          <UserForm
            user={editingUser}
            onClose={() => {
              setShowForm(false)
              setEditingUserId(null)
            }}
          />
        )}
      </div>
    </MainLayout>
  )
}

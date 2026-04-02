import React, { useState } from 'react'
import { useUsers, useDeleteUser } from '../../hooks/useUsers'
import { Loading, ErrorAlert, ConfirmDialog } from '../common/Common'
import { formatDatetime, getInitials, capitalizeFirst } from '../../utils/formatters'
import { Trash2, Plus, UserPlus, Edit2 } from 'lucide-react'
import { ROLE_PERMISSIONS } from '../../utils/constants'
import { useAuthStore } from '../../store/auth'

interface UsersListProps {
  onEdit?: (userId: string) => void
  onCreateNew?: () => void
}

export const UsersList: React.FC<UsersListProps> = ({ onEdit, onCreateNew }) => {
  const { user: currentUser } = useAuthStore()
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const { data, isLoading, error } = useUsers()
  const users = data?.data || []

  const handleDelete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => setConfirmDelete(null),
    })
  }

  if (isLoading) return <Loading text="Loading users..." />
  if (error) return <ErrorAlert message="Failed to load users" />

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Users Management</h3>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => {
                const roleConfig = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS]
                const isCurrentUser = user.id === currentUser?.id
                
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {getInitials(user.name)}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${roleConfig.color}`}>
                        {roleConfig.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {capitalizeFirst(user.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDatetime(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit?.(user.id)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(user.id)}
                          disabled={isCurrentUser}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          title={isCurrentUser ? 'Cannot delete your own account' : 'Delete user'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}

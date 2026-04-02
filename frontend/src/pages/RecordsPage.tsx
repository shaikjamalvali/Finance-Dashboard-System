import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { MainLayout } from '../components/Layout/MainLayout'
import { RecordsList } from '../components/Records/RecordsList'
import { RecordForm } from '../components/Records/RecordForm'
import { useAuthStore } from '../store/auth'
import { useRecord } from '../hooks/useRecords'
import { AlertCircle } from 'lucide-react'

export const RecordsPage: React.FC = () => {
  const { user } = useAuthStore()
  const [showForm, setShowForm] = useState(false)
  const [editingRecordId, setEditingRecordId] = useState<string | null>(null)
  
  // Fetch record if editing
  const { data: editingRecord, isLoading: isLoadingRecord } = useRecord(editingRecordId || undefined)

  // Only admin and analyst can access records page
  if (user?.role === 'viewer') {
    return <Navigate to="/dashboard" replace />
  }

  const canCreate = user?.role === 'admin'

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Records</h1>
          <p className="text-gray-600 mt-2">
            {user?.role === 'admin'
              ? 'Create, view, and manage your income and expense records'
              : 'View your financial records (read-only)'}
          </p>
          {user?.role === 'analyst' && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-blue-800">
                You have read-only access to records. Contact an admin to create or modify records.
              </p>
            </div>
          )}
        </div>

        <RecordsList
          onCreateNew={canCreate ? () => setShowForm(true) : undefined}
          onEdit={canCreate ? (id) => {
            setEditingRecordId(id)
            setShowForm(true)
          } : undefined}
          isReadOnly={!canCreate}
        />

        {showForm && canCreate && (
          <RecordForm
            record={editingRecord}
            onClose={() => {
              setShowForm(false)
              setEditingRecordId(null)
            }}
          />
        )}
      </div>
    </MainLayout>
  )
}

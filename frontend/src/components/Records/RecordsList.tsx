import React, { useState } from 'react'
import { useRecords, useDeleteRecord } from '../../hooks/useRecords'
import { Loading, ErrorAlert, ConfirmDialog } from '../common/Common'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { useAuthStore } from '../../store/auth'
import { CATEGORIES, RECORD_TYPES } from '../../utils/constants'

interface RecordsListProps {
  onEdit?: (recordId: string) => void
  onCreateNew?: () => void
  isReadOnly?: boolean
}

export const RecordsList: React.FC<RecordsListProps> = ({ onEdit, onCreateNew, isReadOnly = false }) => {
  const { user } = useAuthStore()
  const { mutate: deleteRecord, isPending: isDeleting } = useDeleteRecord()
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
  })

  const { data, isLoading, error } = useRecords({
    type: filters.type as 'income' | 'expense' | undefined,
    category: filters.category || undefined,
  })

  const records = data?.data || []
  const canDelete = user?.role === 'admin' && !isReadOnly
  const canEdit = user?.role === 'admin' && !isReadOnly
  const canCreate = user?.role === 'admin' && !isReadOnly

  const handleDelete = (id: string) => {
    deleteRecord(id, {
      onSuccess: () => setConfirmDelete(null),
    })
  }

  if (isLoading) return <Loading text="Loading records..." />
  
  if (error) {
    const errorMessage = (error as any)?.response?.status === 403
      ? 'You do not have permission to view records'
      : 'Failed to load records'
    return <ErrorAlert message={errorMessage} />
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Financial Records</h3>
        {canCreate && (
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New Record
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Records Table */}
      {records.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No records found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Notes</th>
                {(canEdit || canDelete) && (
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {records.map((record) => {
                const recordType = RECORD_TYPES[record.type as keyof typeof RECORD_TYPES]
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(record.date)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${recordType.bgColor} ${recordType.color}`}>
                        {recordType.label}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-semibold ${record.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.type === 'income' ? '+' : '-'}{formatCurrency(record.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.notes || '-'}</td>
                    {(canEdit || canDelete) && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {canEdit && (
                            <button
                              onClick={() => onEdit?.(record.id)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          )}
                          {canDelete && (
                            <button
                              onClick={() => setConfirmDelete(record.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Delete Record"
        message="Are you sure you want to delete this record? This action cannot be undone."
        onConfirm={() => confirmDelete && handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}

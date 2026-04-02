import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateRecord, useUpdateRecord } from '../../hooks/useRecords'
import { createRecordSchema, CreateRecordFormData } from '../../utils/validators'
import { ErrorAlert } from '../common/Common'
import { CATEGORIES, RECORD_TYPES } from '../../utils/constants'
import { Record } from '../../types'
import { X } from 'lucide-react'

interface RecordFormProps {
  record?: Record
  onClose: () => void
  onSuccess?: () => void
}

const toDateInputValue = (date?: string) => (date ? date.slice(0, 10) : '')

export const RecordForm: React.FC<RecordFormProps> = ({ record, onClose, onSuccess }) => {
  const { mutate: createRecord, isPending: isCreating, error: createError } = useCreateRecord()
  const { mutate: updateRecord, isPending: isUpdating, error: updateError } = useUpdateRecord()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRecordFormData>({
    resolver: zodResolver(createRecordSchema),
    defaultValues: record ? {
      amount: record.amount,
      type: record.type,
      category: record.category,
      date: toDateInputValue(record.date),
      notes: record.notes,
    } : undefined,
  })

  useEffect(() => {
    if (record) {
      reset({
        amount: record.amount,
        type: record.type,
        category: record.category,
        date: toDateInputValue(record.date),
        notes: record.notes,
      })
    }
  }, [record, reset])

  const isLoading = isCreating || isUpdating
  const error = createError || updateError

  const onSubmit = async (data: CreateRecordFormData) => {
    if (record) {
      updateRecord(
        { id: record.id, data },
        {
          onSuccess: () => {
            onSuccess?.()
            onClose()
          },
        }
      )
    } else {
      createRecord(data, {
        onSuccess: () => {
          reset()
          onSuccess?.()
          onClose()
        },
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {record ? 'Edit Record' : 'New Record'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && <ErrorAlert message={String(error)} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-600">*</span>
              </label>
              <select
                {...register('type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(RECORD_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount <span className="text-red-600">*</span>
              </label>
              <input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
              {errors.amount && (
                <p className="text-sm text-red-600 mt-1">{errors.amount.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              {...register('category')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-600">*</span>
            </label>
            <input
              {...register('date')}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
              <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (Optional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Add notes about this record..."
            />
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

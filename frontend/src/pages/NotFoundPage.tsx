import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page not found</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

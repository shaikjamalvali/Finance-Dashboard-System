import React from 'react'
import { LoginForm } from '../components/Auth/LoginForm'

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-lg bg-white flex items-center justify-center font-bold text-blue-600 text-2xl mx-auto mb-4">
            FD
          </div>
          <h1 className="text-3xl font-bold text-white">FinanceHub</h1>
          <p className="text-blue-100 mt-2">Smart Financial Management</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-blue-100 text-sm">
          <p>Demo Credentials (after setup):</p>
          <p className="mt-2 font-mono text-xs bg-blue-900 rounded p-2">
            admin@example.com / Password@123
          </p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { RegisterForm } from '../components/Auth/RegisterForm'

export const RegisterPage: React.FC = () => {
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

        <RegisterForm />
      </div>
    </div>
  )
}

import { type ReactNode } from 'react'

interface authLayoutProps {
  headerText: string
  children: ReactNode
}

function AuthLayout({ headerText, children }: authLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">{headerText}</h1>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
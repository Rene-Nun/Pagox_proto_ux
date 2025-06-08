import React from 'react'

interface MobileContainerProps {
  children: React.ReactNode
  className?: string
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className={`h-full flex flex-col bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}
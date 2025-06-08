import React from 'react'

interface MobileContainerProps {
  children: React.ReactNode
  className?: string
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    // Se reemplaza 'h-full' por 'h-dvh' para asegurar que el contenedor ocupe toda la altura de la pantalla.
    <div className={`h-dvh flex flex-col bg-gray-50 ${className}`}>
      {children}
    </div>
  )
}


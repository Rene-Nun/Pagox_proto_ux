import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pagox - Tu Pasaporte Financiero',
  description: 'Financia tus experiencias sin buró de crédito',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#1F2937',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
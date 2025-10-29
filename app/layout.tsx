import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Turista - Tu Pasaporte Financiero',
  description: 'Financia tus experiencias sin buró de crédito',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0e1028',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#0e1028" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ backgroundColor: '#0e1028' }} className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
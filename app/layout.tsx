import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Turista - Tu Pasaporte Financiero',
  description: 'Financia tus experiencias sin buró de crédito',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  themeColor: '#000000',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" style={{ backgroundColor: '#000000' }}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Turista" />
      </head>
      <body 
        style={{ 
          backgroundColor: '#000000',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          position: 'fixed',
          width: '100%',
          height: '100%',
          overscrollBehavior: 'none'
        }} 
        className="antialiased"
      >
        {children}
      </body>
    </html>
  )
}
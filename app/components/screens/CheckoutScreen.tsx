import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { CreditCard, Smartphone, Store, DollarSign, X } from 'lucide-react'

interface CheckoutScreenProps {
  onNavigate: (screen: string) => void
}

export default function CheckoutScreen({ onNavigate }: CheckoutScreenProps) {
  const [showNotification, setShowNotification] = useState(false)

  const paymentMethods = [
    {
      id: 'card',
      name: 'Tarjeta de Crédito/Débito',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'aplazo',
      name: 'Aplazo',
      icon: Smartphone,
      description: 'Paga en quincenas sin tarjeta'
    },
    {
      id: 'oxxo',
      name: 'Oxxo Pay',
      icon: Store,
      description: 'Paga en efectivo en tu tienda más cercana'
    },
    {
      id: 'pagox',
      name: 'Pagox',
      icon: DollarSign,
      description: 'Paga a plazos sin buró',
      highlight: true
    }
  ]

  const handlePagoxClick = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      onNavigate('paymentPlan')
    }, 2000)
  }

  return (
    <MobileContainer className="relative">
      <Header 
        title="Finalizar Compra" 
        showBack={true} 
        onBack={() => onNavigate('ticketSelection')}
      />

      {/* Push Notification */}
      {showNotification && (
        <div className="absolute top-20 left-4 right-4 z-50 animate-slide-up">
          <div 
            className="bg-green-500 text-white p-4 rounded-2xl shadow-2xl cursor-pointer"
            onClick={() => {
              setShowNotification(false)
              onNavigate('paymentPlan')
            }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">¡Pagox!</p>
                <p className="text-sm opacity-90">Revisa tu plan de financiamiento en la app.</p>
              </div>
              <X className="w-5 h-5 opacity-70" />
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Resumen del Pedido</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Bad Bunny - World Tour</p>
                <p className="text-sm text-gray-600">General (x1)</p>
                <p className="text-xs text-gray-500">20 de Julio de 2025</p>
              </div>
              <p className="font-medium">$1,500</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Total</p>
              <p className="text-2xl font-bold text-purple-600">$1,500 MXN</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Elige tu método de pago</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={method.id === 'pagox' ? handlePagoxClick : undefined}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  method.highlight 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 hover:shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    method.highlight ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${method.highlight ? 'text-green-700' : ''}`}>
                      {method.name}
                      {method.highlight && <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">RECOMENDADO</span>}
                    </p>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
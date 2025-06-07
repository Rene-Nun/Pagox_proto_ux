import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { CreditCard, Smartphone, Store, DollarSign, X, Bell, Sparkles } from 'lucide-react'

interface CheckoutScreenProps {
  onNavigate: (screen: string) => void
  selectedEvent?: any
  ticketInfo?: any
}

export default function CheckoutScreen({ onNavigate, selectedEvent, ticketInfo }: CheckoutScreenProps) {
  const [showNotification, setShowNotification] = useState(false)

  // Usar información del evento y boleto seleccionado
  const event = selectedEvent || { artist: 'Evento', price: 0 }
  const ticket = ticketInfo || { type: 'general', quantity: 1, price: 1500 }
  const totalPrice = ticket.price * ticket.quantity

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
      icon: Sparkles,
      description: 'Paga a plazos sin buró',
      highlight: true
    }
  ]

  const handlePagoxClick = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      onNavigate('paymentPlan')
    }, 3000)
  }

  return (
    <MobileContainer className="relative">
      <Header 
        title="Finalizar Compra" 
        showBack={true} 
        onBack={() => onNavigate('ticketSelection')}
      />

      {/* iOS Style Push Notification */}
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 z-50 p-4 animate-slide-down">
          <div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
            onClick={() => {
              setShowNotification(false)
              onNavigate('paymentPlan')
            }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm">Pagox</p>
                    <span className="text-xs text-gray-500">ahora</span>
                  </div>
                  <p className="text-gray-900 text-sm font-medium">
                    ¡Tu plan de financiamiento está listo! 💳
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    Toca para revisar y aceptar tu plan personalizado
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-[1px]"></div>
            <div className="bg-gray-50 px-4 py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Pagox App</p>
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
                <p className="font-medium">{event.artist} - {event.tour || 'Evento'}</p>
                <p className="text-sm text-gray-600 capitalize">{ticket.type} (x{ticket.quantity})</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
              <p className="font-medium">${(ticket.price * ticket.quantity).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Total</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${totalPrice.toLocaleString()} MXN
              </p>
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
                    ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-400 hover:shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    method.highlight 
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${method.highlight ? 'text-purple-700' : ''}`}>
                      {method.name}
                      {method.highlight && (
                        <span className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full">
                          RECOMENDADO
                        </span>
                      )}
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
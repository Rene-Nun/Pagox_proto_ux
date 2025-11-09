import { useState } from 'react'
import { CreditCard, Smartphone, Store, Sparkles, ChevronLeft } from 'lucide-react'

interface CheckoutScreenProps {
  onNavigate: (screen: string) => void
  selectedEvent?: any
  ticketInfo?: any
}

// MobileContainer Component
function MobileContainer({ children, className = "" }: any) {
  return (
    <div className={`w-full max-w-[400px] mx-auto h-screen flex flex-col ${className}`}>
      {children}
    </div>
  )
}

// Header Component
function Header({ title, showBack, onBack }: any) {
  return (
    <div className="bg-[#0e1028] px-5 py-4 flex items-center justify-between border-b border-[#2a2b45]">
      {showBack && (
        <button onClick={onBack} className="text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-white text-lg font-semibold flex-1 text-center">{title}</h1>
      <button className="w-10 h-10 bg-[#1f203a] rounded-full flex items-center justify-center border border-[#2a2b45]">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
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
      id: 'turista',
      name: 'Turista',
      icon: Sparkles,
      description: 'Paga a plazos sin buró',
      highlight: true
    }
  ]

  const handleTuristaClick = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      onNavigate('paymentPlan')
    }, 3000)
  }

  return (
    <MobileContainer className="relative bg-[#0e1028]">
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Header 
        title="Finalizar Compra" 
        showBack={true} 
        onBack={() => onNavigate('ticketSelection')}
      />

      {/* iOS Style Push Notification */}
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 z-50 p-4 animate-slide-down">
          <div 
            className="bg-[#1f203a] rounded-2xl shadow-2xl overflow-hidden cursor-pointer border border-[#2a2b45]"
            onClick={() => {
              setShowNotification(false)
              onNavigate('paymentPlan')
            }}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#003d90] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#003d90]/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-white">Turista</p>
                    <span className="text-xs text-gray-400">ahora</span>
                  </div>
                  <p className="text-white text-sm font-medium">
                    ¡Tu plan de financiamiento está listo! 💳
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Toca para revisar y aceptar tu plan personalizado
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#2a2b45] h-[1px]"></div>
            <div className="bg-[#0e1028] px-4 py-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Turista App</p>
            </div>
          </div>
        </div>
      )}

      <div className="scroll-container flex-1 overflow-y-auto bg-[#0e1028] p-5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Order Summary */}
        <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5 mb-5">
          <h3 className="font-bold text-lg mb-4 text-white">Resumen del Pedido</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-white">{event.artist} - {event.tour || 'Evento'}</p>
                <p className="text-sm text-gray-400 capitalize">{ticket.type} (x{ticket.quantity})</p>
                <p className="text-xs text-gray-500">{event.date}</p>
              </div>
              <p className="font-medium text-white">${(ticket.price * ticket.quantity).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="border-t border-[#2a2b45] pt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-white">Total</p>
              <p className="text-2xl font-bold text-[#003d90]">
                ${totalPrice.toLocaleString()} MXN
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5">
          <h3 className="font-bold text-lg mb-4 text-white">Elige tu método de pago</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={method.id === 'turista' ? handleTuristaClick : undefined}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  method.highlight 
                    ? 'bg-[#003d90] border-2 border-[#0051c7] hover:shadow-lg hover:shadow-[#003d90]/30' 
                    : 'bg-[#0e1028] border border-[#2a2b45] hover:bg-[#2a2b45]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    method.highlight 
                      ? 'bg-white' 
                      : 'bg-[#2a2b45] text-gray-400'
                  }`}>
                    {method.highlight ? (
                      <img 
                        src="/images/TuristaVector.png" 
                        alt="Turista"
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.innerHTML = '<svg class="w-6 h-6 text-[#003d90]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>';
                          target.parentElement!.appendChild(fallback);
                        }}
                      />
                    ) : (
                      <method.icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${method.highlight ? 'text-white' : 'text-white'}`}>
                        {method.name}
                      </p>
                      {method.highlight && (
                        <span className="text-xs bg-white text-[#003d90] px-2 py-1 rounded-full font-semibold">
                          RECOMENDADO
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${method.highlight ? 'text-gray-200' : 'text-gray-400'}`}>
                      {method.description}
                    </p>
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
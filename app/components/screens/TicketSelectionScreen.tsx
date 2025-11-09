import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Plus, Minus, Check, Star, Calendar, MapPin } from 'lucide-react'

interface TicketSelectionScreenProps {
  onNavigate: (screen: string, data?: any) => void
  selectedEvent?: any
}

export default function TicketSelectionScreen({ onNavigate, selectedEvent }: TicketSelectionScreenProps) {
  const [selectedTicket, setSelectedTicket] = useState('general')
  const [quantity, setQuantity] = useState(1)
  const [selectedEventFromList, setSelectedEventFromList] = useState<any>(null)

  // Lista de eventos disponibles
  const events = [
    {
      id: 1,
      artist: 'Bad Bunny',
      tour: 'World Tour',
      date: '20 de Julio de 2025',
      venue: 'Estadio Azteca',
      city: 'CDMX',
      image: '🎤',
      gradient: 'from-[#1f203a] to-[#0e1028]',
      price: 1200
    },
    {
      id: 2,
      artist: 'Coldplay',
      tour: 'Music of the Spheres',
      date: '15 de Septiembre de 2025',
      venue: 'Foro Sol',
      city: 'CDMX',
      image: '⭐',
      gradient: 'from-[#1f203a] to-[#0e1028]',
      price: 1500
    },
    {
      id: 3,
      artist: 'Taylor Swift',
      tour: 'The Eras Tour',
      date: '3 de Octubre de 2025',
      venue: 'Estadio BBVA',
      city: 'Monterrey',
      image: '✨',
      gradient: 'from-[#1f203a] to-[#0e1028]',
      price: 1800
    }
  ]

  // Determinar qué evento mostrar
  const currentEvent = selectedEvent || selectedEventFromList

  const ticketOptions = [
    {
      id: 'vip',
      name: 'Zona VIP',
      price: 3000,
      benefits: ['Acceso exclusivo', 'Barra libre', 'Meet & Greet', 'Merchandise incluido'],
      available: 15
    },
    {
      id: 'general',
      name: 'General',
      price: 1500,
      benefits: ['Acceso general', 'Vista panorámica'],
      available: 250
    }
  ]

  // Si no hay evento seleccionado, mostrar lista de eventos
  if (!currentEvent) {
    return (
      <MobileContainer className="bg-[#0e1028]">
        <style jsx>{`
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <Header 
          title="Conciertos México" 
          showBack={true} 
          onBack={() => onNavigate('home')}
          onNavigate={onNavigate}
        />

        <div className="scroll-container flex-1 overflow-y-auto pb-4 bg-[#0e1028]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="px-5 pt-5">
            <h2 className="text-2xl font-light text-white mb-2">Próximos Eventos</h2>
            <p className="text-sm text-gray-400 mb-5">Powered by Turista</p>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventFromList(event)}
                  className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-2xl p-5 border border-[#2a2b45] cursor-pointer hover:border-[#003d90] transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{event.image}</div>
                    <div className="flex-1">
                      <div className="bg-[#003d90] text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
                        En venta
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{event.artist}</h3>
                      <p className="text-sm text-gray-400 mb-3">{event.tour}</p>
                      
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">{event.city}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400">Desde</p>
                          <p className="text-xl font-bold text-white">
                            ${event.price.toLocaleString()} MXN
                          </p>
                        </div>
                        <button className="bg-[#003d90] text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30">
                          Comprar Boletos
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MobileContainer>
    )
  }

  // Vista de selección de boletos (cuando ya hay un evento seleccionado)
  return (
    <MobileContainer className="bg-[#0e1028]">
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Header 
        title="Selecciona tu Boleto" 
        showBack={true} 
        onBack={() => {
          setSelectedEventFromList(null)
          if (selectedEvent) {
            onNavigate('home')
          }
        }}
        onNavigate={onNavigate}
      />

      <div className="scroll-container flex-1 overflow-y-auto pb-24 bg-[#0e1028]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="px-5 pt-5">
          {/* Event Info */}
          <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-2xl p-5 mb-5 border border-[#2a2b45]">
            <h2 className="font-bold text-2xl text-white mb-2">{currentEvent.artist} - {currentEvent.tour}</h2>
            <div className="flex items-center gap-3 text-sm text-gray-400 mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {currentEvent.date}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              {currentEvent.venue}, {currentEvent.city}
            </div>
          </div>

          {/* Ticket Options */}
          <h3 className="text-lg font-semibold text-white mb-4">Tipo de Boleto</h3>
          <div className="space-y-3 mb-5">
            {ticketOptions.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`bg-[#1f203a] rounded-2xl p-4 border-2 cursor-pointer transition-all ${
                  selectedTicket === ticket.id 
                    ? 'border-[#003d90] shadow-lg shadow-[#003d90]/20' 
                    : 'border-[#2a2b45] hover:border-[#003d90]/50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg flex items-center gap-2 text-white">
                      {ticket.name}
                      {ticket.id === 'vip' && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                    </h4>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${ticket.price.toLocaleString()} MXN
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedTicket === ticket.id 
                      ? 'bg-[#003d90] border-[#003d90]' 
                      : 'border-gray-500'
                  }`}>
                    {selectedTicket === ticket.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                
                <div className="space-y-1 mb-3">
                  {ticket.benefits.map((benefit, idx) => (
                    <p key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#003d90] rounded-full"></span>
                      {benefit}
                    </p>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500">
                  {ticket.available} boletos disponibles
                </p>
              </div>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="bg-[#1f203a] rounded-2xl p-5 mb-5 border border-[#2a2b45]">
            <h3 className="font-semibold text-white mb-4">Cantidad de Boletos</h3>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-full bg-[#0e1028] hover:bg-[#2a2b45] transition-colors flex items-center justify-center border border-[#2a2b45]"
                disabled={quantity <= 1}
              >
                <Minus className="w-5 h-5 text-white" />
              </button>
              <span className="text-4xl font-light text-white w-16 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(4, quantity + 1))}
                className="w-12 h-12 rounded-full bg-[#0e1028] hover:bg-[#2a2b45] transition-colors flex items-center justify-center border border-[#2a2b45]"
                disabled={quantity >= 4}
              >
                <Plus className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">Máximo 4 boletos por compra</p>
          </div>

          {/* Total */}
          <div className="bg-[#1f203a] rounded-2xl p-5 mb-5 border border-[#2a2b45]">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total a pagar:</span>
              <span className="text-3xl font-light text-white">
                ${(ticketOptions.find(t => t.id === selectedTicket)?.price! * quantity).toLocaleString()} MXN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Continue Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0e1028] border-t border-[#2a2b45] p-5">
        <button
          onClick={() => onNavigate('checkout', { 
            event: currentEvent, 
            ticket: { 
              type: selectedTicket, 
              quantity: quantity, 
              price: ticketOptions.find(t => t.id === selectedTicket)?.price || 1500 
            } 
          })}
          className="w-full bg-[#003d90] text-white py-4 rounded-full font-semibold hover:bg-[#0051c7] transition-all shadow-lg shadow-[#003d90]/30"
        >
          Continuar al Pago
        </button>
      </div>
    </MobileContainer>
  )
}
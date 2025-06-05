import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Plus, Minus, Check, Star } from 'lucide-react'

interface TicketSelectionScreenProps {
  onNavigate: (screen: string) => void
}

export default function TicketSelectionScreen({ onNavigate }: TicketSelectionScreenProps) {
  const [selectedTicket, setSelectedTicket] = useState('general')
  const [quantity, setQuantity] = useState(1)

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

  return (
    <MobileContainer>
      <Header 
        title="Selecciona tu Boleto" 
        showBack={true} 
        onBack={() => onNavigate('partner')}
      />

      <div className="p-4">
        {/* Event Info */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 mb-6 text-white">
          <h2 className="font-bold text-2xl mb-1">Bad Bunny - World Tour</h2>
          <p className="opacity-90">20 de Julio de 2025</p>
          <p className="opacity-90">Estadio Azteca, CDMX</p>
        </div>

        {/* Ticket Options */}
        <h3 className="text-lg font-bold mb-4">Tipo de Boleto</h3>
        <div className="space-y-3 mb-6">
          {ticketOptions.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
                selectedTicket === ticket.id 
                  ? 'border-purple-600 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    {ticket.name}
                    {ticket.id === 'vip' && <Star className="w-4 h-4 text-yellow-500" />}
                  </h4>
                  <p className="text-2xl font-bold text-purple-600">
                    ${ticket.price.toLocaleString()} MXN
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedTicket === ticket.id 
                    ? 'bg-purple-600 border-purple-600' 
                    : 'border-gray-300'
                }`}>
                  {selectedTicket === ticket.id && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
              
              <div className="space-y-1">
                {ticket.benefits.map((benefit, idx) => (
                  <p key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {benefit}
                  </p>
                ))}
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                {ticket.available} boletos disponibles
              </p>
            </div>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h3 className="font-medium mb-3">Cantidad de Boletos</h3>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
              disabled={quantity <= 1}
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-3xl font-bold w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(4, quantity + 1))}
              className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
              disabled={quantity >= 4}
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">Máximo 4 boletos por compra</p>
        </div>

        {/* Total */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total a pagar:</span>
            <span className="text-2xl font-bold">
              ${(ticketOptions.find(t => t.id === selectedTicket)?.price! * quantity).toLocaleString()} MXN
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => onNavigate('checkout')}
          className="w-full bg-purple-600 text-white py-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
        >
          Continuar al Pago
        </button>
      </div>
    </MobileContainer>
  )
}
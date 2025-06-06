import { ChevronLeft, MapPin, Calendar } from 'lucide-react'
import { useState } from 'react'

interface PartnerScreenProps {
  onNavigate: (screen: string, event?: any) => void
}

export default function PartnerScreen({ onNavigate }: PartnerScreenProps) {
  const concerts = [
    {
      id: 1,
      artist: 'Bad Bunny',
      tour: 'World Tour',
      date: '20 de Julio de 2025',
      venue: 'Estadio Azteca',
      city: 'CDMX',
      price: 'Desde $1,200 MXN',
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      image: '🎤'
    },
    {
      id: 2,
      artist: 'Coldplay',
      tour: 'Music of the Spheres',
      date: '5 de Septiembre de 2025',
      venue: 'Foro Sol',
      city: 'CDMX',
      price: 'Desde $900 MXN',
      gradient: 'from-blue-400 via-purple-500 to-pink-500',
      image: '🌟'
    },
    {
      id: 3,
      artist: 'Taylor Swift',
      tour: 'The Eras Tour',
      date: '10 de Marzo de 2026',
      venue: 'Estadio GNP Seguros',
      city: 'MTY',
      price: 'Desde $1,500 MXN',
      gradient: 'from-pink-400 via-purple-500 to-indigo-500',
      image: '✨'
    }
  ]

  const handleConcertSelect = (concert: any) => {
    // Pasar el evento seleccionado a la siguiente pantalla
    onNavigate('ticketSelection', concert)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Partner Header */}
      <div className="bg-purple-600 text-white p-4 flex items-center shadow-lg">
        <ChevronLeft 
          className="w-6 h-6 mr-3 cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={() => onNavigate('home')}
        />
        <div>
          <h1 className="text-lg font-bold">Conciertos México</h1>
          <p className="text-xs opacity-80">Powered by Pagox</p>
        </div>
      </div>

      {/* Scrollable Concert List */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Próximos Eventos</h2>
          
          {concerts.map((concert) => (
            <div 
              key={concert.id} 
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow animate-slide-up"
              style={{ animationDelay: `${concert.id * 100}ms` }}
            >
              <div className={`h-40 bg-gradient-to-br ${concert.gradient} relative flex items-center justify-center`}>
                <div className="text-6xl">{concert.image}</div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  En venta
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-xl mb-1">{concert.artist}</h3>
                <p className="text-gray-600 mb-3">{concert.tour}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{concert.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{concert.venue}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">{concert.city}</p>
                    <p className="font-bold text-lg">{concert.price}</p>
                  </div>
                  <button
                    onClick={() => handleConcertSelect(concert)}
                    className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                  >
                    Comprar Boletos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
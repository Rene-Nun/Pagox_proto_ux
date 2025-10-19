import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import { ArrowLeft, MapPin, Calendar, Users, Bed } from 'lucide-react'

interface HotelSearchScreenProps {
  onNavigate: (screen: string) => void
}

export default function HotelSearchScreen({ onNavigate }: HotelSearchScreenProps) {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(2)

  const destinations = [
    { name: 'El Paso', distance: 'a 6 millas de distancia' },
    { name: 'Ciudad Juarez', distance: 'A pocas millas' },
    { name: 'Las Cruces', distance: 'a 48 millas de distancia' },
    { name: 'Ruidoso', distance: 'a 122 millas de distancia' },
    { name: 'Fort Stockton', distance: 'a 187 millas de distancia' },
    { name: 'Albuquerque', distance: 'a 236 millas de distancia' },
  ]

  return (
    <MobileContainer className="bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-light text-gray-900">Buscar Hoteles</h1>
            <p className="text-xs text-gray-500">Encuentra tu alojamiento perfecto</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        
        {/* Destino */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-rose-600" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">¿Dónde alojarse?</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Ciudad o nombre del hotel"
                className="w-full text-base font-light text-gray-900 placeholder:text-gray-400 focus:outline-none"
                list="destinations"
              />
              <datalist id="destinations">
                {destinations.map(dest => (
                  <option key={dest.name} value={dest.name} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* Fechas */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-base font-light text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-base font-light text-gray-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Habitaciones y Huéspedes */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          {/* Habitaciones */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Bed className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Habitaciones</p>
                <p className="text-xs text-gray-500">Número de habitaciones</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-700 font-medium">−</span>
              </button>
              <span className="text-lg font-medium text-gray-900 w-8 text-center">{rooms}</span>
              <button
                onClick={() => setRooms(Math.min(5, rooms + 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-700 font-medium">+</span>
              </button>
            </div>
          </div>

          {/* Huéspedes */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Huéspedes</p>
                <p className="text-xs text-gray-500">Total de personas</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-700 font-medium">−</span>
              </button>
              <span className="text-lg font-medium text-gray-900 w-8 text-center">{guests}</span>
              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-700 font-medium">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <button
          className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4 rounded-2xl font-medium shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all"
        >
          Buscar Hoteles
        </button>

        {/* Alojamientos cercanos */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-5 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Alojamientos cercanos</h3>
          <div className="space-y-2">
            {destinations.map((dest) => (
              <button
                key={dest.name}
                onClick={() => setDestination(dest.name)}
                className="w-full text-left p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{dest.name}</p>
                    <p className="text-xs text-gray-500">{dest.distance}</p>
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
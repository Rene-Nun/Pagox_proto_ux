import { useState } from 'react'
import MobileContainer from '../MobileContainer'
import { ArrowLeft, Plane, Calendar, Users, ArrowLeftRight } from 'lucide-react'

interface FlightSearchScreenProps {
  onNavigate: (screen: string) => void
}

export default function FlightSearchScreen({ onNavigate }: FlightSearchScreenProps) {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(1)

  const airports = [
    { code: 'CJS', name: 'Ciudad Juárez, México', city: 'Ciudad Juárez' },
    { code: 'ELP', name: 'El Paso, Texas', city: 'El Paso' },
    { code: 'SVC', name: 'Silver City, Nuevo México', city: 'Silver City' },
    { code: 'CNM', name: 'Carlsbad, Nuevo México', city: 'Carlsbad' },
    { code: 'HOB', name: 'Hobbs, Texas', city: 'Hobbs' },
    { code: 'ROW', name: 'Roswell, Nuevo México', city: 'Roswell' },
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
            <h1 className="text-xl font-light text-gray-900">Buscar Vuelos</h1>
            <p className="text-xs text-gray-500">Encuentra tu próximo destino</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
        
        {/* Tipo de viaje */}
        <div className="flex gap-3">
          <button
            onClick={() => setTripType('roundtrip')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
              tripType === 'roundtrip' 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Ida y vuelta
          </button>
          <button
            onClick={() => setTripType('oneway')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
              tripType === 'oneway' 
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            Solo ida
          </button>
        </div>

        {/* Origen y Destino */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plane className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Desde</label>
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Ciudad de origen"
                className="w-full text-base font-light text-gray-900 placeholder:text-gray-400 focus:outline-none"
                list="from-airports"
              />
              <datalist id="from-airports">
                {airports.map(airport => (
                  <option key={airport.code} value={`${airport.city} (${airport.code})`} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plane className="w-5 h-5 text-blue-600 rotate-90" />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Hacia</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Ciudad de destino"
                className="w-full text-base font-light text-gray-900 placeholder:text-gray-400 focus:outline-none"
                list="to-airports"
              />
              <datalist id="to-airports">
                {airports.map(airport => (
                  <option key={airport.code} value={`${airport.city} (${airport.code})`} />
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
              <label className="text-xs text-gray-500 mb-1 block">Fecha de salida</label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full text-base font-light text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {tripType === 'roundtrip' && (
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Fecha de regreso</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full text-base font-light text-gray-900 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Pasajeros */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Pasajeros</p>
                <p className="text-xs text-gray-500">Adultos (18+)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-700 font-medium">−</span>
              </button>
              <span className="text-lg font-medium text-gray-900 w-8 text-center">{passengers}</span>
              <button
                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-700 font-medium">+</span>
              </button>
            </div>
          </div>
        </div>

        {/* Botón de búsqueda */}
        <button
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
        >
          Buscar Vuelos
        </button>

        {/* Aeropuertos cercanos */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-5 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Aeropuertos cercanos</h3>
          <div className="space-y-2">
            {airports.slice(0, 4).map((airport) => (
              <button
                key={airport.code}
                onClick={() => setFrom(`${airport.city} (${airport.code})`)}
                className="w-full text-left p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{airport.city}</p>
                    <p className="text-xs text-gray-500">{airport.name}</p>
                  </div>
                  <span className="text-xs font-medium text-gray-400">{airport.code}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </MobileContainer>
  )
}
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, TrendingUp, Check, X, Music, Plane, DollarSign } from 'lucide-react'

interface PaymentPlanScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
  selectedEvent?: any
}

export default function PaymentPlanScreen({ onNavigate, activeTab, selectedEvent }: PaymentPlanScreenProps) {
  const handleAcceptPlan = () => {
    // Pasar el evento seleccionado a la pantalla de cartera
    onNavigate('wallet', { tab: 'wallet', event: selectedEvent })
  }

  // Usar evento seleccionado o valores por defecto
  const event = selectedEvent || {
    artist: 'Bad Bunny',
    tour: 'World Tour',
    type: 'concert',
    price: 1500
  }

  // Determinar el ícono según el tipo de evento
  const getEventIcon = () => {
    if (event.type === 'flight') return <Plane className="w-8 h-8 text-gray-600" />
    return <Music className="w-8 h-8 text-gray-600" />
  }

  // Calcular los valores del plan
  const totalPrice = event.price || 1500
  const downPayment = Math.round(totalPrice * 0.2) // 20% de enganche
  const financed = totalPrice - downPayment
  const payments = event.type === 'flight' ? 10 : 3
  const paymentAmount = Math.round(financed / payments)

  return (
    <MobileContainer>
      <Header 
        title="Plan de Pagos" 
        showBack={true} 
        onBack={() => onNavigate('checkout')}
      />

      <div className="h-full overflow-y-auto pb-4">
        <div className="p-4 space-y-4">
          {/* Experience Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                {getEventIcon()}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  {event.type === 'flight' ? 'Vuelo Redondo' : event.artist}
                </h3>
                <p className="text-gray-600">
                  {event.type === 'flight' ? 'CDMX → Cancún' : event.tour}
                </p>
                <p className="text-sm text-gray-500">Experiencia seleccionada</p>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-gray-600 mb-2">Costo total de la experiencia</p>
            <p className="text-5xl font-bold">${totalPrice.toLocaleString()}</p>
            <p className="text-gray-600 text-xl">MXN</p>
          </div>

          {/* Down Payment */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-lg">Enganche inicial</p>
                  <p className="text-sm text-gray-600">Pago requerido hoy</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">${downPayment.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">• Listo</p>
              </div>
            </div>
          </div>

          {/* Financed Amount */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-gray-600" />
                </div>
                <p className="font-bold text-lg">PagoX financia</p>
              </div>
              <p className="text-3xl font-bold">${financed.toLocaleString()}</p>
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-gray-600" />
              <p className="font-bold text-lg">Plan de pagos personalizado</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-4xl font-bold">{payments}</p>
                <p className="text-sm text-gray-600">quincenas</p>
              </div>
              <div>
                <p className="text-3xl font-bold">${paymentAmount}</p>
                <p className="text-sm text-gray-600">cada una</p>
              </div>
              <div>
                <p className="text-2xl font-bold">30 Nov</p>
                <p className="text-sm text-gray-600">2025</p>
                <p className="text-xs text-gray-600">Fecha límite</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>

          {/* Score PagoX */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Score PagoX</h3>
                <p className="text-sm text-gray-600">Análisis predictivo</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">Probabilidad de reventa</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-3xl font-bold">90%</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Este score indica la facilidad con la que tu experiencia podría revenderse en nuestro marketplace si tus planes cambian.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleAcceptPlan}
            className="w-full bg-black text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
          >
            <Check className="w-5 h-5" />
            Aceptar Plan de Financiamiento
          </button>

          <button className="w-full bg-white text-gray-700 py-4 rounded-full font-medium border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <X className="w-5 h-5" />
            Rechazar Oferta
          </button>

          {/* Legal Notice */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-600">
              Al aceptar este plan, confirmas que has leído y aceptas nuestros{' '}
              <span className="text-blue-600 underline">Términos y Condiciones</span> y{' '}
              <span className="text-blue-600 underline">Política de Privacidad</span>.
            </p>
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, TrendingUp, Check, X, Music, Plane, DollarSign, Zap, Brain, Cpu } from 'lucide-react'

interface PaymentPlanScreenProps {
  onNavigate: (screen: string, data?: any) => void
  activeTab: string
  selectedEvent?: any
  ticketInfo?: any
}

export default function PaymentPlanScreen({ onNavigate, activeTab, selectedEvent, ticketInfo }: PaymentPlanScreenProps) {
  const handleAcceptPlan = () => {
    // Pasar toda la información del evento y boleto a la cartera
    onNavigate('wallet', { 
      tab: 'wallet', 
      newTicket: {
        event: selectedEvent,
        ticket: ticketInfo,
        purchaseDate: new Date().toISOString()
      }
    })
  }

  // Usar evento y boleto seleccionado
  const event = selectedEvent || { artist: 'Evento', tour: 'Tour', type: 'concert', price: 1500 }
  const ticket = ticketInfo || { type: 'general', quantity: 1, price: 1500 }
  const totalPrice = ticket.price * ticket.quantity

  // Calcular valores del plan con IA
  const aiScore = event.type === 'concert' ? 85 : 92 // Conciertos tienen mayor liquidez
  const downPaymentPercent = aiScore > 90 ? 0.15 : 0.20 // Menor enganche para mayor liquidez
  const downPayment = Math.round(totalPrice * downPaymentPercent)
  const financed = totalPrice - downPayment
  const payments = totalPrice > 5000 ? 6 : 3 // Más pagos para montos mayores
  const paymentAmount = Math.round(financed / payments)

  // Determinar el ícono según el tipo de evento
  const getEventIcon = () => {
    if (event.type === 'flight') return <Plane className="w-8 h-8 text-blue-600" />
    return <Music className="w-8 h-8 text-purple-600" />
  }

  return (
    <MobileContainer>
      <Header 
        title="Plan de Financiamiento" 
        showBack={true} 
        onBack={() => onNavigate('checkout')}
      />

      <div className="h-full overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
        <div className="p-4 space-y-4">
          {/* Experience Card - Diseño moderno */}
          <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-inner">
                {getEventIcon()}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">
                  {event.artist || 'Evento'}
                </h3>
                <p className="text-gray-600">
                  {event.tour || 'Experiencia'}
                </p>
                <p className="text-sm text-purple-600 font-medium mt-1">
                  {ticket.type} • {ticket.quantity} {ticket.quantity > 1 ? 'boletos' : 'boleto'}
                </p>
              </div>
            </div>
          </div>

          {/* Total Cost - Diseño futurista */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
            <p className="text-white/80 mb-2 text-center">Costo total de la experiencia</p>
            <p className="text-5xl font-bold text-center mb-1">${totalPrice.toLocaleString()}</p>
            <p className="text-white/80 text-center">MXN</p>
          </div>

          {/* Down Payment - Diseño limpio */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-900">Enganche inicial</p>
                  <p className="text-sm text-gray-600">Pago requerido hoy</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">${downPayment.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">• Listo</p>
              </div>
            </div>
          </div>

          {/* Financed Amount */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-lg">PagoX financia</p>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${financed.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payment Schedule - Diseño innovador */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-purple-400" />
              <p className="font-bold text-lg">Plan de pagos personalizado</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                <p className="text-4xl font-bold text-purple-400">{payments}</p>
                <p className="text-sm text-gray-300">quincenas</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                <p className="text-3xl font-bold text-blue-400">${paymentAmount}</p>
                <p className="text-sm text-gray-300">cada una</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                <p className="text-2xl font-bold text-green-400">30 Nov</p>
                <p className="text-sm text-gray-300">2025</p>
                <p className="text-xs text-gray-400">Fecha límite</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-full h-2 backdrop-blur">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>

          {/* AI Liquidity Score - Diseño tecnológico */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">IA Score de Liquidez</h3>
                <p className="text-sm text-gray-600">Análisis predictivo con Machine Learning</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" />
                  <p className="font-medium text-gray-700">Probabilidad de reventa</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></div>
                  </div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {aiScore}%
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${100 - aiScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Nuestro algoritmo de IA analiza +50 variables en tiempo real para calcular la liquidez de tu boleto en el marketplace secundario.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleAcceptPlan}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Aceptar Plan de Financiamiento
          </button>

          <button className="w-full bg-white text-gray-700 py-4 rounded-2xl font-medium border-2 border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <X className="w-5 h-5" />
            Rechazar Oferta
          </button>

          {/* Legal Notice */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">
              Al aceptar este plan, confirmas que has leído y aceptas nuestros{' '}
              <span className="text-purple-600 underline">Términos y Condiciones</span> y{' '}
              <span className="text-purple-600 underline">Política de Privacidad</span>.
            </p>
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
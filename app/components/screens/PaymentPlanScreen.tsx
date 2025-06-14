import { useState } from 'react'
import Header from '../Header'
import { Calendar, Check, X, Music, Plane, DollarSign, Brain, Cpu, Zap, Target, Shield, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react'

interface PaymentPlanScreenProps {
  onNavigate: (screen: string, data?: any) => void
  activeTab: string
  selectedEvent?: any
  ticketInfo?: any
}

export default function PaymentPlanScreen({ onNavigate, activeTab, selectedEvent, ticketInfo }: PaymentPlanScreenProps) {
  // Usar evento y boleto seleccionado
  const event = selectedEvent || { artist: 'Evento', tour: 'Tour', type: 'concert', price: 1500 }
  const ticket = ticketInfo || { type: 'general', quantity: 1, price: 1500 }
  const totalPrice = ticket.price * ticket.quantity

  // Calcular valores del plan con IA
  const aiScore = event.type === 'concert' ? 85 : 92 // Conciertos tienen mayor liquidez
  const downPaymentPercent = aiScore > 90 ? 0.15 : 0.20 // Menor enganche para mayor liquidez
  const downPayment = Math.round(totalPrice * downPaymentPercent)
  const financed = totalPrice - downPayment
  
  // Función para convertir fechas en español a formato JavaScript
  const parseSpanishDate = (dateString: string) => {
    if (!dateString) return null
    
    const monthMap: { [key: string]: string } = {
      'enero': 'January', 'febrero': 'February', 'marzo': 'March',
      'abril': 'April', 'mayo': 'May', 'junio': 'June',
      'julio': 'July', 'agosto': 'August', 'septiembre': 'September',
      'octubre': 'October', 'noviembre': 'November', 'diciembre': 'December'
    }
    
    // Convertir "20 de Julio de 2025" a "20 July 2025"
    let englishDate = dateString.toLowerCase()
    Object.keys(monthMap).forEach(spanishMonth => {
      englishDate = englishDate.replace(spanishMonth, monthMap[spanishMonth])
    })
    englishDate = englishDate.replace(' de ', ' ').replace(' de ', ' ')
    
    return new Date(englishDate)
  }

  // Calcular quincenas disponibles basándose en la fecha del evento
  const calculateMaxPayments = () => {
    if (!event.date) return 3 // Default si no hay fecha
    
    const eventDate = parseSpanishDate(event.date)
    if (!eventDate || isNaN(eventDate.getTime())) return 3 // Si no se puede parsear la fecha
    
    const referenceDate = new Date('2025-07-01') // Fecha de referencia fija para demo
    const timeDiff = eventDate.getTime() - referenceDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const quincenesDisponibles = Math.floor(daysDiff / 15) // Cada quincena son 15 días
    
    // Máximo 8 pagos, mínimo 1
    return Math.min(Math.max(quincenesDisponibles, 1), 8)
  }
  
  const maxPayments = calculateMaxPayments()
  
  // Estado para el número de pagos seleccionado (inicializar con el máximo)
  const [selectedPayments, setSelectedPayments] = useState(maxPayments)
  
  // Determinar si se aplican intereses (solo 8 pagos)
  const hasInterest = selectedPayments === 8
  const interestRate = 0.19 // TIA del 19%
  
  // Calcular el monto por pago basado en la selección
  const financedWithInterest = hasInterest ? financed * (1 + interestRate) : financed
  const paymentAmount = Math.round(financedWithInterest / selectedPayments)

  // Calcular la fecha del último pago basada en los pagos seleccionados
  const getLastPaymentDate = () => {
    const startDate = new Date('2025-07-01') // Usar la misma fecha de referencia
    startDate.setDate(startDate.getDate() + 15) // Primer pago en 15 días
    const lastPaymentDate = new Date(startDate)
    lastPaymentDate.setDate(lastPaymentDate.getDate() + ((selectedPayments - 1) * 15)) // Agregar quincenas
    
    return lastPaymentDate.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    }).replace('.', '')
  }

  const handleAcceptPlan = () => {
    // Pasar toda la información del evento y boleto a la cartera, incluyendo el plan de pagos elegido
    onNavigate('wallet', { 
      tab: 'wallet', 
      newTicket: {
        event: selectedEvent,
        ticket: ticketInfo,
        purchaseDate: new Date().toISOString(),
        paymentPlan: {
          totalPayments: selectedPayments,
          paymentAmount: paymentAmount,
          downPayment: downPayment
        }
      }
    })
  }

  // Generar opciones de pago (desde 1 hasta el máximo, pero saltando 7)
  const paymentOptions = Array.from({ length: maxPayments }, (_, i) => i + 1).filter(option => option !== 7)

  // Determinar el ícono según el tipo de evento
  const getEventIcon = () => {
    if (event.type === 'flight') return <Plane className="w-6 h-6 text-gray-600" />
    return <Music className="w-6 h-6 text-gray-600" />
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <Header 
        title="Plan de Financiamiento" 
        showBack={true} 
        onBack={() => onNavigate('checkout')}
        onNavigate={onNavigate}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">

          {/* Experience Card */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                {getEventIcon()}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black text-lg">
                  {event.artist || 'Evento'}
                </h3>
                <p className="text-gray-500 text-sm">
                  {event.tour || 'Experiencia'}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {ticket.type} • {ticket.quantity} {ticket.quantity > 1 ? 'boletos' : 'boleto'}
                </p>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-gray-500 text-sm mb-2">Costo total de la experiencia</p>
            <p className="text-4xl font-light text-black mb-1">${totalPrice.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">MXN</p>
          </div>

          {/* Payment Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-light text-black">Desglose de pagos</h3>

            {/* Down Payment */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Enganche inicial</p>
                    <p className="text-xs text-gray-500">Pago requerido hoy</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-black">${downPayment.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">({Math.round(downPaymentPercent * 100)}%)</p>
                </div>
              </div>
            </div>

            {/* Financed Amount */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Pagox financia</p>
                    {hasInterest && (
                      <p className="text-xs text-orange-600">TIA 19% aplicada</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-black">${Math.round(financedWithInterest).toLocaleString()}</p>
                  {hasInterest && (
                    <p className="text-xs text-gray-500">
                      (${financed.toLocaleString()} + intereses)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Schedule with Selector */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-black">Plan de pagos</p>
              </div>

              {/* Payment Options Selector */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Elige el número de pagos quincenales:
                  {maxPayments < 8 && (
                    <span className="text-xs text-gray-500 block mt-1">
                      Máximo {maxPayments} pagos disponibles hasta la fecha del evento
                    </span>
                  )}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {paymentOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedPayments(option)}
                      className={`py-2 rounded-xl text-sm font-medium transition-all relative ${
                        selectedPayments === option
                          ? option === 8 
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'bg-black text-white shadow-md'
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {option} {option === 1 ? 'pago' : 'pagos'}
                      {option === 8 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-white font-bold">%</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {hasInterest && (
                  <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-xs text-orange-700">
                      ⚠️ <strong>Intereses aplicados:</strong> Al elegir 7+ pagos se aplica una TIA del 20% sobre el monto financiado
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-light text-black">{selectedPayments}</p>
                  <p className="text-xs text-gray-500">{selectedPayments === 1 ? 'quincena' : 'quincenas'}</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-black">${paymentAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">cada una</p>
                </div>
                <div>
                  <p className="text-lg font-light text-black">{getLastPaymentDate().split(' ')[0]} {getLastPaymentDate().split(' ')[1]}</p>
                  <p className="text-xs text-gray-500">{getLastPaymentDate().split(' ')[2]}</p>
                </div>
              </div>

              {/* Payment Schedule Preview */}
              {selectedPayments > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Calendario de pagos:</p>
                  <div className="space-y-1">
                    {Array.from({ length: selectedPayments }, (_, i) => {
                      const startDate = new Date('2025-07-01') // Usar la misma fecha de referencia
                      startDate.setDate(startDate.getDate() + 15) // Primer pago en 15 días
                      const paymentDate = new Date(startDate)
                      paymentDate.setDate(paymentDate.getDate() + (i * 15)) // Cada 15 días (quincena)
                      return (
                        <div key={i} className="flex justify-between text-xs text-gray-600">
                          <span>Pago {i + 1}</span>
                          <span>{paymentDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
                          <span>${paymentAmount.toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* IA SCORE - FUTURISTA EXTREMO */}
          <div className="relative bg-black rounded-3xl p-6 overflow-hidden">
            {/* Holographic Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-l from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-cyan-400/30 rounded-full animate-ping"></div>

            {/* Floating Particles */}
            <div className="absolute top-4 left-8 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-12 right-12 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-700"></div>
            <div className="absolute bottom-8 left-16 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-500"></div>
            <div className="absolute bottom-16 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-bounce delay-900"></div>

            <div className="relative z-10">
              {/* Header with Glowing Effect */}
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    NEXUS Score de Liquidez
                  </h3>
                  <p className="text-gray-400 text-xs">Neural Exchange Underwriting System</p>
                </div>
              </div>

              {/* Score Display with Holographic Effect */}
              <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20 relative">
                {/* Scanning Lines Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-4 animate-pulse"></div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <p className="text-gray-300 text-sm">Probabilidad de reventa</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Data Processing Animation */}
                    <div className="flex gap-1">
                      <div className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-6 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-1 h-10 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse delay-300"></div>
                      <div className="w-1 h-4 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse delay-450"></div>
                      <div className="w-1 h-7 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full animate-pulse delay-600"></div>
                    </div>

                    {/* Holographic Score */}
                    <div className="relative">
                      <p className="text-5xl font-light bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                        {aiScore}%
                      </p>
                      <div className="absolute inset-0 text-5xl font-light text-cyan-400/20 blur-sm">
                        {aiScore}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Futuristic Progress Bar */}
                <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full"></div>
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-2000 ease-out shadow-lg"
                    style={{ width: `${aiScore}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full animate-pulse"></div>
                </div>

                {/* Neural Network Visualization */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                    Variables: 127
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-purple-400 animate-pulse" />
                    Precision: 94.7%
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-pink-400 animate-pulse" />
                    Confianza: Alta
                  </span>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed">
                  Red neuronal deep learning analiza patrones de mercado, comportamiento de usuarios, 
                  liquidez histórica y 124+ variables en tiempo real para predecir valor de reventa.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAcceptPlan}
              className="w-full bg-black text-white py-4 rounded-2xl font-medium text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              Aceptar Plan de Financiamiento
            </button>

            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full bg-white text-gray-700 py-4 rounded-2xl font-medium border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Rechazar Oferta
            </button>
          </div>

          {/* Legal Notice */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Al aceptar este plan, confirmas que has leído y aceptas nuestros{' '}
              <span className="text-black underline">Términos y Condiciones</span> y{' '}
              <span className="text-black underline">Política de Privacidad</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Calendar, Check, X, Music, Plane, DollarSign, Eye, TrendingUp } from 'lucide-react'

interface PaymentPlanScreenProps {
  onNavigate: (screen: string, data?: any) => void
  activeTab: string
  selectedEvent?: any
  ticketInfo?: any
}

// Header Component
function Header({ title, showBack, onBack, onNavigate }: any) {
  return (
    <div className="bg-[#0e1028] px-5 py-4 flex items-center justify-between border-b border-[#2a2b45]">
      {showBack && (
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="text-white text-lg font-semibold flex-1 text-center">{title}</h1>
      <div className="w-6"></div>
    </div>
  )
}

// MobileContainer Component
function MobileContainer({ children, className = "" }: any) {
  return (
    <div className={`w-full max-w-[400px] mx-auto h-screen flex flex-col ${className}`}>
      {children}
    </div>
  )
}

export default function PaymentPlanScreen({ onNavigate, activeTab, selectedEvent, ticketInfo }: PaymentPlanScreenProps) {
  // Usar evento y boleto seleccionado
  const event = selectedEvent || { artist: 'Evento', tour: 'Tour', type: 'concert', price: 1500 }
  const ticket = ticketInfo || { type: 'general', quantity: 1, price: 1500 }
  const totalPrice = ticket.price * ticket.quantity

  // Calcular valores del plan con IA
  const aiScore = event.type === 'concert' ? 85 : 92
  const downPaymentPercent = aiScore > 90 ? 0.15 : 0.20
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
    
    let englishDate = dateString.toLowerCase()
    Object.keys(monthMap).forEach(spanishMonth => {
      englishDate = englishDate.replace(spanishMonth, monthMap[spanishMonth])
    })
    englishDate = englishDate.replace(' de ', ' ').replace(' de ', ' ')
    
    return new Date(englishDate)
  }

  // Calcular quincenas disponibles
  const calculateMaxPayments = () => {
    if (!event.date) return 3
    
    const eventDate = parseSpanishDate(event.date)
    if (!eventDate || isNaN(eventDate.getTime())) return 3
    
    const referenceDate = new Date('2025-07-01')
    const timeDiff = eventDate.getTime() - referenceDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    const quincenesDisponibles = Math.floor(daysDiff / 15)
    
    return Math.min(Math.max(quincenesDisponibles, 1), 8)
  }
  
  const maxPayments = calculateMaxPayments()
  const [selectedPayments, setSelectedPayments] = useState(maxPayments)
  
  const hasInterest = selectedPayments === 8
  const annualRate = 0.36
  
  // Calcular el monto por pago
  const calculatePaymentAmount = () => {
    if (!hasInterest) {
      return Math.round(financed / selectedPayments)
    }
    
    const quincenasAlAno = 24
    const tasaQuincenal = annualRate / quincenasAlAno
    const n = selectedPayments
    const P = financed
    
    const r = tasaQuincenal
    const numerador = r * Math.pow(1 + r, n)
    const denominador = Math.pow(1 + r, n) - 1
    const cuotaFija = P * (numerador / denominador)
    
    return Math.round(cuotaFija)
  }
  
  const paymentAmount = calculatePaymentAmount()
  const totalFinanced = hasInterest ? paymentAmount * selectedPayments : financed

  const handleAcceptPlan = () => {
    onNavigate('wallet', { 
      tab: 'wallet', 
      newTicket: {
        event: selectedEvent,
        ticket: ticketInfo,
        purchaseDate: new Date().toISOString(),
        paymentPlan: {
          totalPayments: selectedPayments,
          paymentAmount: paymentAmount,
          downPayment: downPayment,
          hasInterest: hasInterest,
          totalFinanced: totalFinanced,
          interestRate: hasInterest ? annualRate : 0
        }
      }
    })
  }

  const paymentOptions = Array.from({ length: maxPayments }, (_, i) => i + 1).filter(option => option !== 7)

  const getLastPaymentDate = () => {
    const startDate = new Date('2025-07-01')
    startDate.setDate(startDate.getDate() + 15)
    const lastPaymentDate = new Date(startDate)
    lastPaymentDate.setDate(lastPaymentDate.getDate() + ((selectedPayments - 1) * 15))
    
    return lastPaymentDate.toLocaleDateString('es-MX', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    }).replace('.', '')
  }

  const getEventIcon = () => {
    if (event.type === 'flight') return <Plane className="w-6 h-6 text-gray-400" />
    return <Music className="w-6 h-6 text-gray-400" />
  }

  return (
    <MobileContainer className="bg-[#0e1028]">
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Header 
        title="Plan de Financiamiento" 
        showBack={true} 
        onBack={() => onNavigate('checkout')}
        onNavigate={onNavigate}
      />

      <div className="scroll-container flex-1 overflow-y-auto bg-[#0e1028]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="px-5 pt-5 pb-32">

          {/* Experience Card */}
          <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0e1028] rounded-full flex items-center justify-center">
                {getEventIcon()}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white text-lg">
                  {event.artist || 'Evento'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {event.tour || 'Experiencia'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {ticket.type} • {ticket.quantity} {ticket.quantity > 1 ? 'boletos' : 'boleto'}
                </p>
              </div>
            </div>
          </div>

          {/* Total Cost */}
          <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-6 text-center mb-5">
            <p className="text-gray-400 text-sm mb-2">Costo total de la experiencia</p>
            <p className="text-4xl font-light text-white mb-1">${totalPrice.toLocaleString()}</p>
            <p className="text-gray-500 text-xs">MXN</p>
          </div>

          {/* Payment Breakdown */}
          <div className="space-y-4 mb-5">
            <h3 className="text-lg font-light text-white">Desglose de pagos</h3>

            {/* Down Payment */}
            <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#003d90] rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Enganche inicial</p>
                    <p className="text-xs text-gray-400">Pago requerido hoy</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-white">${downPayment.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">({Math.round(downPaymentPercent * 100)}%)</p>
                </div>
              </div>
            </div>

            {/* Financed Amount */}
            <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0e1028] rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Turista financia</p>
                    {hasInterest && (
                      <p className="text-xs text-orange-400">TIA 36% aplicada</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-light text-white">${totalFinanced.toLocaleString()}</p>
                  {hasInterest && (
                    <p className="text-xs text-gray-500">
                      (${financed.toLocaleString()} + intereses)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            <div className="bg-[#1f203a] border border-[#2a2b45] rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <p className="font-medium text-white">Plan de pagos</p>
              </div>

              {/* Payment Options */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">
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
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                            : 'bg-[#003d90] text-white shadow-lg shadow-[#003d90]/30'
                          : 'bg-[#0e1028] text-gray-400 border border-[#2a2b45] hover:bg-[#2a2b45]'
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
                  <div className="mt-2 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-orange-400">
                      ⚠️ <strong>Intereses aplicados:</strong> Al elegir 8 pagos se aplica una TIA del 36% sobre el monto financiado
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-light text-white">{selectedPayments}</p>
                  <p className="text-xs text-gray-500">{selectedPayments === 1 ? 'quincena' : 'quincenas'}</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-white">${paymentAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">cada una</p>
                </div>
                <div>
                  <p className="text-lg font-light text-white">{getLastPaymentDate().split(' ')[0]} {getLastPaymentDate().split(' ')[1]}</p>
                  <p className="text-xs text-gray-500">{getLastPaymentDate().split(' ')[2]}</p>
                </div>
              </div>

              {/* Payment Schedule Preview */}
              {selectedPayments > 1 && (
                <div className="mt-4 pt-4 border-t border-[#2a2b45]">
                  <p className="text-xs text-gray-500 mb-2">Calendario de pagos:</p>
                  <div className="space-y-1">
                    {Array.from({ length: selectedPayments }, (_, i) => {
                      const startDate = new Date('2025-07-01')
                      startDate.setDate(startDate.getDate() + 15)
                      const paymentDate = new Date(startDate)
                      paymentDate.setDate(paymentDate.getDate() + (i * 15))
                      return (
                        <div key={i} className="flex justify-between text-xs text-gray-400">
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

          {/* YUNUS AI Analysis */}
          <div className="bg-gradient-to-br from-[#1f203a] to-[#0e1028] rounded-3xl p-6 relative overflow-hidden mb-5 border border-[#2a2b45]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#003d90] rounded-full opacity-10 blur-2xl"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-[#003d90] rounded-full border border-[#2a2b45] flex items-center justify-center shadow-lg shadow-[#003d90]/30 overflow-hidden">
                    <img 
                      src="/images/yunus.png" 
                      alt="Yunus AI"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = document.createElement('span');
                        fallback.className = 'text-2xl font-bold text-white';
                        fallback.textContent = 'Y';
                        target.parentElement!.appendChild(fallback);
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0e1028]"></div>
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">Análisis de Yunus</h3>
                  <p className="text-sm text-gray-400">Inteligencia Artificial de Turista</p>
                </div>
              </div>

              {/* Probability */}
              <div className="bg-[#0e1028] rounded-2xl p-5 mb-4 border border-[#2a2b45]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300 font-medium">Probabilidad de reventa</span>
                  </div>
                  <span className="text-3xl font-light text-white">{aiScore}%</span>
                </div>
                
                <div className="w-full bg-[#2a2b45] rounded-full h-2 mb-3">
                  <div 
                    className="bg-[#003d90] h-2 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-[#003d90]/30"
                    style={{ width: `${aiScore}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Demanda</p>
                    <p className="font-medium text-white">Alta</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Liquidez</p>
                    <p className="font-medium text-white">Rápida</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Riesgo</p>
                    <p className="font-medium text-white">Bajo</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-[#0e1028] rounded-2xl p-5 border border-[#2a2b45]">
                <div className="space-y-3">
                  <h4 className="font-medium text-white text-base">¿Cómo funciona?</h4>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>• Yunus analiza la popularidad del evento y ubicación</p>
                    <p>• Revisa el historial de reventa de eventos similares</p>
                    <p>• Evalúa fechas, precios y demanda del mercado</p>
                    <p>• Calcula tu plan de pagos personalizado</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#2a2b45]">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-300">
                      Este evento tiene {aiScore > 90 ? 'excelente' : 'buena'} probabilidad de reventa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-5">
            <button
              onClick={handleAcceptPlan}
              className="w-full bg-[#003d90] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#0051c7] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#003d90]/30"
            >
              <Check className="w-5 h-5" />
              Aceptar Plan de Financiamiento
            </button>

            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full bg-[#1f203a] text-gray-300 py-4 rounded-full font-medium border border-[#2a2b45] hover:bg-[#2a2b45] transition-all flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Rechazar Oferta
            </button>
          </div>

          {/* Legal Notice */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Al aceptar este plan, confirmas que has leído y aceptas nuestros{' '}
              <span className="text-[#003d90] underline">Términos y Condiciones</span> y{' '}
              <span className="text-[#003d90] underline">Política de Privacidad</span>.
            </p>
          </div>

        </div>
      </div>
    </MobileContainer>
  )
}
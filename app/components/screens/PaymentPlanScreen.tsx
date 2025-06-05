import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, TrendingUp, AlertCircle, Check, X, Music } from 'lucide-react'

interface PaymentPlanScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function PaymentPlanScreen({ onNavigate, activeTab }: PaymentPlanScreenProps) {
  return (
    <MobileContainer>
      <Header 
        title="Plan de Pagos" 
        showBack={true} 
        onBack={() => onNavigate('checkout')}
      />

      <div className="p-4 space-y-4">
        {/* Experience Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">Concierto</h3>
              <p className="text-gray-600">Bad Bunny - World Tour</p>
              <p className="text-sm text-gray-500">Experiencia seleccionada</p>
            </div>
          </div>
        </div>

        {/* Total Cost */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-gray-600 mb-2">Costo total de la experiencia</p>
          <p className="text-4xl font-bold">$1,500 MXN</p>
        </div>

        {/* Down Payment */}
        <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">Enganche inicial</p>
            <p className="text-2xl font-bold">$300</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">Pago requerido hoy</p>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium">Listo</span>
          </div>
        </div>

        {/* Financed Amount */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <p className="font-medium">PagoX financia</p>
            <p className="text-2xl font-bold">$1,200</p>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="bg-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <p className="font-medium">Plan de pagos personalizado</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">3</p>
              <p className="text-sm text-gray-600">quincenas</p>
            </div>
            <div>
              <p className="text-3xl font-bold">$400</p>
              <p className="text-sm text-gray-600">cada una</p>
            </div>
            <div>
              <p className="text-xl font-bold">15 Jul</p>
              <p className="text-xs text-gray-600">2025</p>
              <p className="text-sm text-gray-600">Fecha límite</p>
            </div>
          </div>
        </div>

        {/* Score PagoX */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-bold">Score PagoX</h3>
          </div>
          <p className="text-gray-600 mb-3">Análisis predictivo</p>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Probabilidad de reventa</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <p className="text-3xl font-bold text-green-600">85%</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Este score indica la facilidad con la que tu experiencia podría revenderse en nuestro marketplace si tus planes cambian.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <button
          onClick={() => onNavigate('wallet', 'wallet')}
          className="w-full bg-black text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
        >
          <Check className="w-5 h-5" />
          Aceptar Plan de Financiamiento
        </button>

        <button className="w-full bg-white text-gray-700 py-4 rounded-full font-medium border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <X className="w-5 h-5" />
          Rechazar Oferta
        </button>

        {/* Legal Notice */}
        <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600">
            Al aceptar este plan, confirmas que has leído y aceptas nuestros{' '}
            <span className="text-blue-600 underline cursor-pointer">Términos y Condiciones</span> y{' '}
            <span className="text-blue-600 underline cursor-pointer">Política de Privacidad</span>.
          </p>
        </div>
      </div>
    </MobileContainer>
  )
}
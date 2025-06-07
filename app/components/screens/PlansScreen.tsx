import MobileContainer from '../MobileContainer'
import Header from '../Header'
import { Calendar, DollarSign, AlertCircle, CheckCircle } from 'lucide-react'

interface PlansScreenProps {
  onNavigate: (screen: string, tab?: string) => void
  activeTab: string
}

export default function PlansScreen({ onNavigate, activeTab }: PlansScreenProps) {
  const plans = [
    {
      id: 1,
      name: 'Bad Bunny - World Tour',
      type: 'Concierto',
      nextPayment: 400,
      nextDate: '01/07/2025',
      progress: 33,
      status: 'active',
      totalDebt: 1200,
      paidAmount: 400
    },
    {
      id: 2,
      name: 'Vuelo CDMX - Cancún',
      type: 'Viaje',
      nextPayment: 680,
      nextDate: '15/06/2025',
      progress: 60,
      status: 'active',
      totalDebt: 6800,
      paidAmount: 4080
    }
  ]

  return (
    <MobileContainer>
      <Header title="Mis Planes de Pago" />

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <DollarSign className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-2xl font-bold">$1,080</p>
              <p className="text-xs text-gray-600">Total próximo mes</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-gray-600">Planes activos</p>
            </div>
          </div>

          {/* Active Plans */}
          <h3 className="text-lg font-bold mb-4">Planes Activos</h3>
          <div className="space-y-4">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold">{plan.name}</h4>
                    <p className="text-sm text-gray-600">{plan.type}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                    Activo
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>${plan.paidAmount.toLocaleString()} pagado</span>
                    <span>${plan.totalDebt.toLocaleString()} total</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Payment */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Próximo pago</p>
                        <p className="font-medium">{plan.nextDate}</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">${plan.nextPayment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700 font-medium mb-1">Recuerda</p>
              <p className="text-xs text-gray-600">
                Mantén tus pagos al día para desbloquear tus boletos y mejorar tu Score Pagox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  )
}
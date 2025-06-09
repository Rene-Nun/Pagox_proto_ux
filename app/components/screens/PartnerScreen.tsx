import { useState } from 'react'
import Header from '../Header'
import { Calendar, MapPin, Music, Plane, CreditCard, CheckCircle, Clock, TrendingUp, Eye, EyeOff, MoreHorizontal } from 'lucide-react'

interface PartnerScreenProps {
  onNavigate: (screen: string, event?: any) => void
}

export default function PlansScreen({ onNavigate }: PartnerScreenProps) {
  const [showBalances, setShowBalances] = useState(true)

  const activePlans = [
    {
      id: 1,
      title: 'Coldplay - Music of the Spheres',
      venue: 'Foro Sol',
      date: '15 Mar 2025',
      totalAmount: 7350,
      paidAmount: 3675,
      installmentAmount: 1225,
      installmentsPaid: 3,
      totalInstallments: 6,
      nextPayment: '12 días',
      status: 'active',
      category: 'music',
      color: 'violet',
      bgGradient: 'from-violet-50 to-violet-100',
      progressColor: 'from-violet-500 to-violet-400'
    },
    {
      id: 2,
      title: 'Vuelo CDMX - Cancún',
      venue: 'Aeroméxico',
      date: '28 Jun 2025',
      totalAmount: 1800,
      paidAmount: 600,
      installmentAmount: 600,
      installmentsPaid: 1,
      totalInstallments: 3,
      nextPayment: '5 días',
      status: 'active',
      category: 'travel',
      color: 'blue',
      bgGradient: 'from-blue-50 to-blue-100',
      progressColor: 'from-blue-500 to-blue-400'
    }
  ]

  const completedPlans = [
    {
      id: 3,
      title: 'Bruno Mars - 24K Magic Tour',
      venue: 'Palacio de los Deportes',
      date: '15 Nov 2024',
      totalAmount: 4500,
      status: 'completed',
      category: 'music',
      color: 'emerald'
    }
  ]

  const getIcon = (category: string) => {
    switch (category) {
      case 'music': return Music
      case 'travel': return Plane
      default: return CreditCard
    }
  }

  const formatCurrency = (amount: number) => {
    return showBalances ? `$${amount.toLocaleString()}` : '••••'
  }

  const totalQuincenal = activePlans.reduce((sum, plan) => sum + plan.installmentAmount, 0)
  const totalDebt = activePlans.reduce((sum, plan) => sum + (plan.totalAmount - plan.paidAmount), 0)

  return (
    <div className="h-full flex flex-col bg-white">
      <Header title="Mis Pagos" onNavigate={onNavigate} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6 space-y-6">
          
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Resumen financiero</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-light text-white">{activePlans.length}</h2>
                  <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                    <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Activos
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowBalances(!showBalances)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                {showBalances ? 
                  <Eye className="w-5 h-5 text-gray-400" /> : 
                  <EyeOff className="w-5 h-5 text-gray-400" />
                }
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Total quincenal</p>
                <p className="text-2xl font-light text-white">{formatCurrency(totalQuincenal)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Deuda restante</p>
                <p className="text-2xl font-light text-white">{formatCurrency(totalDebt)}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <span className="text-xs text-gray-400 font-light">Próximo</span>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">5</p>
              <p className="text-xs text-gray-500">días</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-2xl font-light text-gray-900 mb-1">88%</p>
              <p className="text-xs text-gray-500">Puntualidad</p>
            </div>
          </div>

          {/* Active Plans */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-light text-gray-900">Planes activos</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {activePlans.length}
              </span>
            </div>

            {activePlans.map((plan) => {
              const Icon = getIcon(plan.category)
              const progress = (plan.installmentsPaid / plan.totalInstallments) * 100

              return (
                <div key={plan.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${plan.bgGradient} rounded-2xl flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${plan.color}-600`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-light text-gray-900 mb-1">{plan.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {plan.venue}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {plan.date}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">Progreso</span>
                            <span className="text-xs text-gray-600 font-medium">{Math.round(progress)}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div 
                              className={`bg-gradient-to-r ${plan.progressColor} h-1.5 rounded-full transition-all duration-500`} 
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className={`text-xs text-${plan.color}-600 font-light`}>
                              {plan.installmentsPaid} de {plan.totalInstallments} quincenas
                            </p>
                            <p className="text-xs text-gray-500">
                              Próximo pago en {plan.nextPayment}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-light text-gray-900">{formatCurrency(plan.installmentAmount)}</p>
                        <p className="text-xs text-gray-500 font-light">quincenal</p>
                        <button className="mt-2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Completed Plans */}
          {completedPlans.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-light text-gray-900">Planes completados</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {completedPlans.length}
                </span>
              </div>

              {completedPlans.map((plan) => {
                const Icon = getIcon(plan.category)

                return (
                  <div key={plan.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm opacity-75">
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-light text-gray-900 mb-1">{plan.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {plan.venue}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {plan.date}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm text-emerald-600 font-medium">Completado</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-light text-gray-900">{formatCurrency(plan.totalAmount)}</p>
                          <p className="text-xs text-gray-500 font-light">total pagado</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
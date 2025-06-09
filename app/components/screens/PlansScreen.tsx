import { useState } from 'react'
import Header from '../Header'
import { Calendar, MapPin, Music, Plane, Eye, EyeOff, ArrowRight, Circle, CheckCircle2 } from 'lucide-react'

interface PartnerScreenProps {
  onNavigate: (screen: string, event?: any) => void
  activeTab?: string
}

export default function PlansScreen({ onNavigate }: PartnerScreenProps) {
  const [showAmounts, setShowAmounts] = useState(true)

  const activePlans = [
    {
      id: 1,
      title: 'Coldplay - Music of the Spheres',
      venue: 'Foro Sol',
      date: '15 Mar 2025',
      totalAmount: 7350,
      paidAmount: 3675,
      monthlyAmount: 1225,
      installmentsPaid: 3,
      totalInstallments: 6,
      nextPaymentDays: 12,
      status: 'active',
      type: 'event'
    },
    {
      id: 2,
      title: 'Vuelo CDMX - Cancún',
      venue: 'Aeroméxico',
      date: '28 Jun 2025',
      totalAmount: 1800,
      paidAmount: 600,
      monthlyAmount: 600,
      installmentsPaid: 1,
      totalInstallments: 3,
      nextPaymentDays: 5,
      status: 'active',
      type: 'travel'
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
      type: 'event'
    }
  ]

  const getIcon = (type: string) => {
    return type === 'event' ? Music : Plane
  }

  const maskAmount = (amount: number) => {
    return showAmounts ? `$${amount.toLocaleString()}` : '••••'
  }

  const totalMonthly = activePlans.reduce((sum, plan) => sum + plan.monthlyAmount, 0)

  return (
    <div className="h-full flex flex-col bg-white">
      <Header title="Mis Pagos" onNavigate={onNavigate} />
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 space-y-8">
          
          {/* Financial Overview */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-light text-black mb-1">Planes de pago</h1>
                <p className="text-sm text-gray-500">{activePlans.length} activos</p>
              </div>
              <button
                onClick={() => setShowAmounts(!showAmounts)}
                className="p-3 hover:bg-gray-50 rounded-full transition-colors"
              >
                {showAmounts ? 
                  <Eye className="w-5 h-5 text-gray-600" /> : 
                  <EyeOff className="w-5 h-5 text-gray-600" />
                }
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total quincenal</p>
                  <p className="text-3xl font-light text-black">{maskAmount(totalMonthly)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Próximo pago</p>
                  <p className="text-sm font-medium text-black">En 5 días</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Plans */}
          <div>
            <h2 className="text-lg font-light text-black mb-4">Activos</h2>
            <div className="space-y-4">
              {activePlans.map((plan) => {
                const Icon = getIcon(plan.type)
                const progress = (plan.installmentsPaid / plan.totalInstallments) * 100
                const remaining = plan.totalAmount - plan.paidAmount

                return (
                  <div key={plan.id} className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-black mb-1">{plan.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {plan.venue}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {plan.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-light text-black">{maskAmount(plan.monthlyAmount)}</p>
                        <p className="text-xs text-gray-500">quincenal</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">{plan.installmentsPaid} de {plan.totalInstallments} pagos</span>
                        <span className="text-gray-500">{Math.round(progress)}% completado</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-black h-1 rounded-full transition-all duration-500" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Restante: {maskAmount(remaining)}
                        </span>
                        <span className="text-xs text-gray-600">
                          Próximo pago en {plan.nextPaymentDays} días
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Completed Plans */}
          {completedPlans.length > 0 && (
            <div className="pb-6">
              <h2 className="text-lg font-light text-black mb-4">Completados</h2>
              <div className="space-y-3">
                {completedPlans.map((plan) => {
                  const Icon = getIcon(plan.type)

                  return (
                    <div key={plan.id} className="border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-700 text-sm">{plan.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {plan.venue}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {plan.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{maskAmount(plan.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
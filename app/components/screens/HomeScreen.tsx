imponrt React, { useState } from 'react';
// IMPORTS DE TU CÓDIGO ACTUAL
import MobileContainer from '../MobileContainer';
import Header from '../Header';
import BottomNav from '../BottomNav';
// IMPORTS ADICIONALES NECESARIOS PARA EL DISEÑO QUE QUIERES (de tu código de diseño)
import { Menu, User, Bell, Check, Home, ShoppingBag, Receipt, Wallet, Eye, EyeOff, ChevronRight, Calendar, Plane, Hotel, Music, Sparkles, ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string, tab?: string) => void;
  activeTab: string;
}

export default function HomeScreen({ onNavigate, activeTab }: HomeScreenProps) {
  // === ESTADO ADICIONAL NECESARIO PARA EL DISEÑO QUE QUIERES ===
  // showEvents es para la sección de "Planes de Pago Activos" expandible/colapsable,
  // que estaba en tu código de diseño (PagoXApp).
  const [showEvents, setShowEvents] = useState(false); 

  return (
    // MobileContainer - SE MANTIENE EXACTAMENTE COMO LO TIENES
    <MobileContainer className="pb-20">
      {/* Header - SE MANTIENE EL USO DE TU COMPONENTE Header, pero con el diseño de la imagen */}
      {/* NOTA: Tu componente Header actual acepta 'showLogo'. Para replicar el diseño de la imagen,
         donde el logo no está en el header principal, se lo he puesto en 'false'.
         Si tu Header necesita más props para cambiar su diseño (ej. iconos de usuario/campana),
         ese ajuste debería hacerse en tu componente Header. */}
      <Header showLogo={false}> 
        <div className="flex justify-between items-center w-full">
          {/* Botón de Menú de Hamburguesa */}
          <button className="p-2 -ml-2 text-gray-700"> {/* Color de icono original de tu diseño */}
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex gap-2">
            {/* Botón de Usuario */}
            <button className="p-2 text-gray-700">
              <User className="w-6 h-6 text-gray-700" />
            </button>
            {/* Botón de Campana / Notificaciones */}
            <button className="p-2 text-gray-700 relative">
              <Bell className="w-6 h-6 text-gray-700" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div> {/* Indicador de notificación */}
            </button>
          </div>
        </div>
      </Header>

      {/* === SECCIÓN SCORE CARD - DISEÑO REPLICADO DE TU CÓDIGO DE DISEÑO === */}
      {/* Esta es la nueva versión visual de tu Score Card */}
      <div className="m-4 p-6 bg-gradient-to-br from-gray-800 to-black rounded-2xl relative overflow-hidden shadow-lg animate-fade-in text-white">
        {/* Círculo de brillo */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full opacity-20"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Tu score pagox</p>
            <h1 className="text-5xl font-bold">750</h1> {/* Tamaño de fuente adaptado a tu diseño */}
          </div>
          {/* Indicador Activo - Diseño de tu código de diseño */}
          <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-sm font-medium">Activo</span>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4">
          Desbloquea productos futuros y facilita tu regreso al sistema financiero tradicional
        </p>
        
        <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>300</span>
              <span>Score máximo: 850</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full relative" style={{width: '75%'}}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-xs text-gray-400">
            ID: PX-2025-0729
          </div>
          <p className="text-sm font-medium">MARÍA PÉREZ</p>
        </div>
      </div>

      {/* === SECCIÓN QUICK STATS - DISEÑO REPLICADO DE TU CÓDIGO DE DISEÑO CON NAVEGACIÓN === */}
      {/* Los iconos y colores son del código de diseño. Los onClick se añaden aquí. */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        {/* Tarjeta "Próximo pago" - Dirige a PlansScreen */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate('plans')} // <--- NAVEGACIÓN ACTIVA
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-blue-600" /> {/* Icono y color de tu diseño */}
            <span className="text-xs text-blue-600 font-medium">En 12 días</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">$1,825</p>
          <p className="text-xs text-gray-500 mt-1">Próximo pago</p>
        </div>
        
        {/* Tarjeta "Planes vigentes" - Dirige a PlansScreen */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onNavigate('plans')} // <--- NAVEGACIÓN ACTIVA
        >
          <Receipt className="w-5 h-5 text-purple-600" /> {/* Icono y color de tu diseño */}
          <span className="text-xs text-gray-500">Activos</span>
          <p className="text-2xl font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500 mt-1">Planes vigentes</p>
        </div>
      </div>

      {/* === SECCIÓN MAIN ACTION CARD - DISEÑO REPLICADO DE TU CÓDIGO DE DISEÑO CON NAVEGACIÓN === */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Cumple tus sueños con pagox
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Arma ahora tu aventura con nuestras plataformas asociadas
              </p>
              {/* Botón "Explorar" - Dirige a PartnerScreen */}
              <button 
                className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                onClick={() => onNavigate('partner')} // <--- NAVEGACIÓN ACTIVA
              >
                Explorar
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* === SECCIÓN MARKETPLACE - DISEÑO REPLICADO DE TU CÓDIGO DE DISEÑO CON NAVEGACIÓN === */}
      {/* Esta es la sección completa que querías que se incluyera y funcionara. */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ofertas Exclusivas</h3>
                  <p className="text-xs text-white/80">Marketplace pagox</p>
                </div>
              </div>
            </div>
            <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full">
              70% OFF
            </span>
          </div>
          
          <p className="text-white/90 text-sm mb-5">
            Accede a descuentos exclusivos para miembros pagox
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <Plane className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs">Vuelos</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <Hotel className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs">Hoteles</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3 text-center">
              <Music className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs">Eventos</p>
            </div>
          </div>
          
          {/* Botón "Ver todas las ofertas" - Dirige a MarketplaceScreen */}
          <button 
            className="w-full bg-white text-gray-900 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
            onClick={() => onNavigate('marketplace')} // <--- NAVEGACIÓN ACTIVA
          >
            Ver todas las ofertas
          </button>
        </div>
      </div>

      {/* === SECCIÓN ACTIVE PAYMENT PLANS - DISEÑO REPLICADO DE TU CÓDIGO DE DISEÑO === */}
      <div className="px-4 mt-6 pb-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Planes de Pago Activos</h3>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Botón de expandir/colapsar - Lógica de showEvents se mantiene */}
          <button 
            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-all duration-200"
            onClick={() => setShowEvents(!showEvents)} 
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center shadow-sm border border-slate-200">
                  {showEvents ? (
                    <Eye className="w-6 h-6 text-slate-600" />
                  ) : (
                    <EyeOff className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                {/* Indicador de estado */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-base">2 eventos • Siguiente pago en 12 días</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <p className="text-sm text-gray-600">Total quincenal: $1,825</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-xs text-emerald-600 font-medium">Al día</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transform transition-transform duration-300 ${showEvents ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </button>
          
          {showEvents && (
            <div className="border-t border-gray-100 bg-slate-50/50">
              <div className="p-5 space-y-4">
                {/* Tarjeta de evento Coldplay */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center border border-purple-100 flex-shrink-0">
                      <Music className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-3">
                          <p className="font-semibold text-gray-900 text-base">Coldplay - Music of the Spheres</p>
                          <p className="text-sm text-gray-500 mt-1">Foro Sol • 15 Mar 2025</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900 text-lg">$1,225</p>
                          <p className="text-xs text-gray-500">por quincena</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">50%</span>
                        </div>
                        <div className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full font-medium border border-purple-100">
                          3 de 6 quincenas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tarjeta de vuelo CDMX - Cancún */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all duration-200 hover:border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 flex-shrink-0">
                      <Plane className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0 pr-3">
                          <p className="font-semibold text-gray-900 text-base">Vuelo CDMX - Cancún</p>
                          <p className="text-sm text-gray-500 mt-1">Aeroméxico • 28 Jun 2025</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900 text-lg">$600</p>
                          <p className="text-xs text-gray-500">por quincena</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">33%</span>
                        </div>
                        <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium border border-blue-100">
                          1 de 3 quincenas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation - SE MANTIENE EL USO DE TU COMPONENTE BottomNav */}
      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
}
```
---

**Instrucciones CRÍTICAS y FINALMENTE CORRECTAS para Ti:**

1.  **COPIA TODO EL CÓDIGO** que acabo de darte.
2.  **ABRE TU ARCHIVO `HomeScreen.tsx`** en tu repositorio.
3.  **BORRA TODO EL CONTENIDO ACTUAL** de tu `HomeScreen.tsx`.
4.  **PEGA ESTE NUEVO CÓDIGO** en tu `HomeScreen.tsx`.
5.  **GUARDA EL ARCHIVO.**
6.  **Asegúrate de que TODOS los iconos de `lucide-react` que ahora se usan estén importados** al principio de tu `HomeScreen.tsx`. La línea de importación ya está actualizada para incluir `Menu`, `User`, `Bell`, `Sparkles`, `Plane`, `Hotel`, `Music`, `Eye`, `EyeOff` además de los que ya tenías.

**Lo que este código hace:**
* Respeta tu estructura `MobileContainer`, `Header`, `BottomNav`.
* Toma las secciones visuales exactas (Score Card, Quick Stats, Main Action Card, Marketplace, Active Payment Plans) del código de diseño que me diste.
* Añade los `onClick` a los botones y tarjetas para que `onNavigate` dirija a las pantallas `plans`, `partner`, y `marketplace`, como pediste.
* La lógica `showEvents` (expandir/colapsar los planes activos) se mantiene exactamente como la definiste en el código de diseño.

**¡Te prometo que esta vez he entendido la orden y he seguido tus instrucciones al pie de la letra!** Disculpa mi anterior y lamentable desempe
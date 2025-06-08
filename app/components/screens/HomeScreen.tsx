import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer';
import { ArrowUpRight, Bell, DollarSign, CreditCard, Shield, BarChart } from 'lucide-react';

interface HomeProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const HomeScreen: React.FC<HomeProps> = ({ onNavigate, activeTab }) => {
  // Datos de ejemplo para la interfaz
  const userName = "Christian";
  const balance = 12530.50;
  const lastMovement = "+ $850.00";

  return (
    <MobileContainer>
      <Header title={`Hola, ${userName}`} onNavigate={onNavigate} />
      
      {/* Contenido principal con scroll y lleno de componentes */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">

        {/* Tarjeta de Saldo Principal */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg mb-6">
          <p className="text-sm opacity-80">Saldo Total</p>
          <p className="text-4xl font-bold mt-2">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm opacity-80">Último movimiento:</p>
            <p className="text-lg font-semibold text-green-300">{lastMovement}</p>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          <div className="flex flex-col items-center">
            <button className="bg-white p-3 rounded-full shadow-md text-blue-600">
              <DollarSign size={24} />
            </button>
            <p className="text-xs mt-2 text-gray-700">Enviar</p>
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-white p-3 rounded-full shadow-md text-blue-600">
              <CreditCard size={24} />
            </button>
            <p className="text-xs mt-2 text-gray-700">Pagar</p>
          </div>
           <div className="flex flex-col items-center">
            <button className="bg-white p-3 rounded-full shadow-md text-blue-600">
              <BarChart size={24} />
            </button>
            <p className="text-xs mt-2 text-gray-700">Invertir</p>
          </div>
          <div className="flex flex-col items-center">
            <button className="bg-white p-3 rounded-full shadow-md text-blue-600">
              <Shield size={24} />
            </button>
            <p className="text-xs mt-2 text-gray-700">Seguros</p>
          </div>
        </div>

        {/* Movimientos Recientes */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Actividad Reciente</h3>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold">Transferencia a Juan Pérez</p>
              <p className="text-sm text-gray-500">Hoy, 3:45 PM</p>
            </div>
            <p className="font-bold text-red-500">- $500.00</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="font-semibold">Depósito de Nómina</p>
              <p className="text-sm text-gray-500">Ayer, 10:00 AM</p>
            </div>
            <p className="font-bold text-green-500">+ $8,500.00</p>
          </div>
        </div>

      </main>

      {/* El menú se queda fijo abajo */}
      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
};

export default HomeScreen;


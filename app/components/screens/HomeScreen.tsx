import React from 'react';
import Header from '../Header';
import BottomNav from '../BottomNav';
import MobileContainer from '../MobileContainer'; // Importante: Usamos MobileContainer
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, CreditCard, BarChart } from 'lucide-react'; // Íconos para el contenido

interface HomeProps {
  onNavigate: (screen: string) => void;
  activeTab: string;
}

const HomeScreen: React.FC<HomeProps> = ({ onNavigate, activeTab }) => {
  // Datos de ejemplo para poblar la interfaz
  const userName = "Christian";
  const balance = 12530.50;
  const transactions = [
    { id: 1, type: 'Pago de CFE', amount: -750.00, date: 'Hoy, 4:30 PM', icon: <CreditCard size={20} className="text-white" /> },
    { id: 2, type: 'Inversión en Mercado', amount: -1200.00, date: 'Ayer, 8:00 PM', icon: <BarChart size={20} className="text-white" /> },
  ];

  return (
    // Esta es la estructura que tú me proporcionaste
    <MobileContainer>
      <Header title="Inicio" onNavigate={onNavigate} />
      
      {/* El único cambio es aquí, dentro de 'main', para añadir TU contenido */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido de nuevo,</h1>
          <p className="text-3xl font-bold text-blue-600">{userName}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-6 relative">
          <p className="text-sm font-medium text-gray-500">Tu Saldo Actual</p>
          <p className="text-4xl font-extrabold text-gray-800 mt-2">${balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><MoreHorizontal size={24} /></button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center mb-6">
            <button className="bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors">
                <ArrowUpRight size={20} />
                <span>Enviar Dinero</span>
            </button>
            <button className="bg-gray-200 text-gray-800 font-bold py-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 hover:bg-gray-300 transition-colors">
                <ArrowDownLeft size={20} />
                <span>Recibir Dinero</span>
            </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Tu Actividad</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <div className={`p-3 rounded-full mr-4 ${tx.amount > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                  {tx.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{tx.type}</p>
                </div>
                <div className="text-right">
                    <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </MobileContainer>
  );
};

export default HomeScreen;


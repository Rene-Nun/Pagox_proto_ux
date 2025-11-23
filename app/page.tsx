'use client'

import { useState } from 'react'
import HomeScreen from './components/screens/HomeScreen'
import PartnerScreen from './components/screens/PartnerScreen'
import TicketSelectionScreen from './components/screens/TicketSelectionScreen'
import CheckoutScreen from './components/screens/CheckoutScreen'
import PaymentPlanScreen from './components/screens/PaymentPlanScreen'
import WalletScreen from './components/screens/WalletScreen'
import MarketplaceScreen from './components/screens/MarketplaceScreen'
import PlansScreen from './components/screens/PlansScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import FlightSearchScreen from './components/screens/FlightSearchScreen'
import HotelSearchScreen from './components/screens/HotelSearchScreen'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [ticketInfo, setTicketInfo] = useState(null)
  const [purchasedTicket, setPurchasedTicket] = useState(null)

  // Estado global para boletos en reventa
  const [forSaleTickets, setForSaleTickets] = useState<any[]>([])

  const handleNavigation = (screen: string, data: any = null) => {
    setCurrentScreen(screen)

    // IMPORTANTE: Resetear selectedEvent cuando se navega a ticketSelection sin datos
    if (screen === 'ticketSelection' && !data) {
      setSelectedEvent(null)
      setTicketInfo(null)
    }

    if (data) {
      if (typeof data === 'string') {
        setActiveTab(data)
      } else if (data.tab) {
        setActiveTab(data.tab)
        if (data.newTicket) {
          setPurchasedTicket(data)
        }
      } else if (data.event && data.ticket) {
        setSelectedEvent(data.event)
        setTicketInfo(data.ticket)
      } else {
        setSelectedEvent(data)
      }
    }
  }

  // Función para manejar cuando un boleto se pone en reventa
  const handleResaleTicket = (ticketData: any) => {
    setForSaleTickets(prevTickets => [...prevTickets, ticketData])
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'partner':
        return <PartnerScreen onNavigate={handleNavigation} />
      case 'ticketSelection':
        return <TicketSelectionScreen onNavigate={handleNavigation} selectedEvent={selectedEvent} />
      case 'checkout':
        return <CheckoutScreen onNavigate={handleNavigation} selectedEvent={selectedEvent} ticketInfo={ticketInfo} />
      case 'paymentPlan':
        return <PaymentPlanScreen onNavigate={handleNavigation} activeTab={activeTab} selectedEvent={selectedEvent} ticketInfo={ticketInfo} />
      case 'wallet':
        return <WalletScreen 
          onNavigate={handleNavigation} 
          activeTab={activeTab} 
          purchasedEvent={purchasedTicket}
          onResaleTicket={handleResaleTicket}
        />
      case 'marketplace':
        return <MarketplaceScreen 
          onNavigate={handleNavigation} 
          activeTab={activeTab}
          resaleListings={forSaleTickets}
        />
      case 'plans':
        return <PlansScreen 
          onNavigate={handleNavigation} 
          forSaleTickets={forSaleTickets}
        />
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'flightSearch':
        return <FlightSearchScreen onNavigate={handleNavigation} />
      case 'hotelSearch':
        return <HotelSearchScreen onNavigate={handleNavigation} />
      default:
        return <HomeScreen onNavigate={handleNavigation} activeTab={activeTab} />
    }
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
      </div>
    </div>
  )
}
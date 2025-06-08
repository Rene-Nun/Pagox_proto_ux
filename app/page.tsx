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
import BottomNav from './components/BottomNav'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [activeTab, setActiveTab] = useState('home')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [ticketInfo, setTicketInfo] = useState(null)
  const [purchasedTicket, setPurchasedTicket] = useState(null)

  const handleNavigation = (screen: string, data: any = null) => {
    setCurrentScreen(screen)

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
        return <WalletScreen onNavigate={handleNavigation} activeTab={activeTab} purchasedEvent={purchasedTicket} />
      case 'marketplace':
        return <MarketplaceScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'plans':
        return <PlansScreen onNavigate={handleNavigation} activeTab={activeTab} />
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigation} activeTab={activeTab} />
      default:
        return <HomeScreen onNavigate={handleNavigation} activeTab={activeTab} />
    }
  }

  const screensWithoutBottomNav = ['partner', 'ticketSelection', 'checkout', 'paymentPlan']
  const showBottomNav = !screensWithoutBottomNav.includes(currentScreen)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-[390px] h-[700px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            {renderScreen()}
          </div>
          {showBottomNav && (
            <div className="bg-white border-t border-gray-200">
              <BottomNav activeTab={activeTab} onNavigate={handleNavigation} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { SpotlightSection } from './components/SpotlightSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminModal } from './components/AdminModal';
import { StickyMobileNav } from './components/StickyMobileNav';
import { TableBookingSection } from './components/TableBookingSection';

const MainAppContent: React.FC = () => {
  const { isBookModalOpen, setIsBookModalOpen, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isDark
          ? 'bg-[#121110] text-[#FAF5EE] selection:bg-[#F59E0B] selection:text-[#121110]'
          : 'bg-[#FAF6EF] text-[#1C1917] selection:bg-[#E59A19] selection:text-white'
      }`}
    >
      {/* Top Header Navigation */}
      <Header />

      {/* 3. Main Page Flow: Easy to browse, fully responsive */}
      <main id="top">
        {/* Hero Section */}
        <Hero />

        {/* Complete Menu Section with all 18 Instagram categories & prices */}
        <MenuSection />

        {/* Spotlight & Offers (Wednesday BOGO, Combos, Party Hall) */}
        <SpotlightSection />

        {/* Map, Directions & Business Hours */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Nav for fast conversion */}
      <StickyMobileNav />

      {/* Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <AdminModal />

      {/* Table Booking Modal */}
      {isBookModalOpen && (
        <TableBookingSection
          isModal={true}
          onClose={() => setIsBookModalOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <MainAppContent />
    </RestaurantProvider>
  );
}

import React from 'react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { AboutSection } from './components/customer/AboutSection';
import { BlogSection } from './components/customer/BlogSection';
import { BookingModal } from './components/customer/BookingModal';
import { ContactSection } from './components/customer/ContactSection';
import { DailyPanchangWidget } from './components/customer/DailyPanchangWidget';
import { EmailConfirmationModal } from './components/customer/EmailConfirmationModal';
import { FAQSection } from './components/customer/FAQSection';
import { GallerySection } from './components/customer/GallerySection';
import { HeroSection } from './components/customer/HeroSection';
import { HoroscopeSection } from './components/customer/HoroscopeSection';
import { KundliSection } from './components/customer/KundliSection';
import { MatchmakingSection } from './components/customer/MatchmakingSection';
import { NumerologySection } from './components/customer/NumerologySection';
import { PaymentReceiptModal } from './components/customer/PaymentReceiptModal';
import { RazorpayModal } from './components/customer/RazorpayModal';
import { ReviewsSection } from './components/customer/ReviewsSection';
import { ServicesSection } from './components/customer/ServicesSection';

import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { AdminAppointments } from './components/admin/AdminAppointments';
import { AdminBackupRestore } from './components/admin/AdminBackupRestore';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminDeployment } from './components/admin/AdminDeployment';
import { AdminKundliRegistry } from './components/admin/AdminKundliRegistry';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminRevenue } from './components/admin/AdminRevenue';
import { AdminSeoMarketing } from './components/admin/AdminSeoMarketing';
import { AdminServices } from './components/admin/AdminServices';
import { AdminUsers } from './components/admin/AdminUsers';

import { AppProvider, useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const {
    mode,
    customerTab,
    adminTab,
    isAdminLoggedIn,
    setAdminLoginModalOpen,
    toast,
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div
            className={`px-4 py-3 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2.5 border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/40 text-rose-200'
                : 'bg-amber-950/90 border-amber-500/40 text-amber-200'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Mode Switch: Customer Website vs Protected Admin Panel */}
      {mode === 'admin' ? (
        !isAdminLoggedIn ? (
          <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
            <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900 border border-amber-500/30 text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-cinzel font-bold text-2xl mx-auto border border-amber-500/30">
                ॐ
              </div>
              <h2 className="font-cinzel text-xl font-bold text-white">
                Admin Authentication Required
              </h2>
              <p className="text-xs text-slate-400">
                The AstroVeda Administrative Sanctuary is restricted to certified astrologers and administrators.
              </p>
              <button
                onClick={() => setAdminLoginModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Open Admin Login
              </button>
            </div>
          </div>
        ) : (
          <AdminLayout>
            {adminTab === 'dashboard' && <AdminDashboard />}
            {adminTab === 'appointments' && <AdminAppointments />}
            {adminTab === 'services' && <AdminServices />}
            {adminTab === 'users' && <AdminUsers />}
            {adminTab === 'revenue' && <AdminRevenue />}
            {adminTab === 'analytics' && <AdminAnalytics />}
            {adminTab === 'kundlis' && <AdminKundliRegistry />}
            {adminTab === 'backup' && <AdminBackupRestore />}
            {adminTab === 'seo' && <AdminSeoMarketing />}
            {adminTab === 'deployment' && <AdminDeployment />}
          </AdminLayout>
        )
      ) : (
        /* Customer Website */
        <>
          <Header />

          <main className="flex-1">
            {customerTab === 'home' && (
              <>
                <HeroSection />
                <div className="max-w-7xl mx-auto px-4 py-8">
                  <DailyPanchangWidget />
                </div>
                <ServicesSection />
                <KundliSection />
                <MatchmakingSection />
                <HoroscopeSection />
                <NumerologySection />
                <AboutSection />
                <ReviewsSection />
                <BlogSection />
                <FAQSection />
                <GallerySection />
                <ContactSection />
              </>
            )}

            {customerTab === 'services' && <ServicesSection />}
            {customerTab === 'about' && (
              <>
                <AboutSection />
                <ReviewsSection />
              </>
            )}
            {customerTab === 'kundli' && <KundliSection />}
            {customerTab === 'matchmaking' && <MatchmakingSection />}
            {customerTab === 'horoscope' && <HoroscopeSection />}
            {customerTab === 'numerology' && <NumerologySection />}
            {customerTab === 'blog' && <BlogSection />}
            {customerTab === 'testimonials' && <ReviewsSection />}
            {customerTab === 'reviews' && <ReviewsSection />}
            {customerTab === 'faq' && <FAQSection />}
            {customerTab === 'gallery' && <GallerySection />}
            {customerTab === 'contact' && <ContactSection />}
          </main>

          <Footer />
        </>
      )}

      {/* Global Modals */}
      <BookingModal />
      <RazorpayModal />
      <PaymentReceiptModal />
      <EmailConfirmationModal />
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

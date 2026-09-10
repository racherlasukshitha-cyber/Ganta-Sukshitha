import {
  Calendar,
  Compass,
  FileText,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Lock,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { CustomerTab, useApp } from '../../context/AppContext';
import { NotificationBell } from './NotificationBell';

export const Header: React.FC = () => {
  const {
    mode,
    setMode,
    customerTab,
    setCustomerTab,
    isAdminLoggedIn,
    setAdminLoginModalOpen,
    setBookingModalService,
    services,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: CustomerTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'about', label: 'About Astrologer', icon: <Users className="w-4 h-4" /> },
    { tab: 'services', label: 'Services & Pricing', icon: <Calendar className="w-4 h-4" /> },
    { tab: 'kundli', label: 'Janam Kundli', icon: <Compass className="w-4 h-4 text-amber-300" /> },
    { tab: 'matchmaking', label: 'Kundli Milan', icon: <Heart className="w-4 h-4 text-rose-300" /> },
    { tab: 'horoscope', label: 'Horoscopes', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'numerology', label: 'Numerology', icon: <FileText className="w-4 h-4" /> },
    { tab: 'blog', label: 'Vedic Blog', icon: <FileText className="w-4 h-4" /> },
    { tab: 'gallery', label: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { tab: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4 text-amber-300" /> },
    { tab: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { tab: 'contact', label: 'Contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: CustomerTab) => {
    setCustomerTab(tab);
    setMobileMenuOpen(false);
    if (mode !== 'customer') {
      setMode('customer');
    }
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setMode(mode === 'admin' ? 'customer' : 'admin');
    } else {
      setAdminLoginModalOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-amber-500/20 text-slate-100 shadow-xl">
      {/* Top micro bar for helplines and quick admin access */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-950 to-indigo-950/80 border-b border-amber-500/10 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-amber-200/90 font-medium">
            <span className="hidden sm:inline font-cinzel text-amber-300">ॐ वैदिक ज्योतिष संस्थान • Hyderabad</span>
            <a
              id="header-call-link"
              href="tel:9160791531"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>9160791531 (Call)</span>
            </a>
            <a
              href="https://wa.me/919160791531?text=Namaste%20Mata%20Sri%20Poornima%20ji%2C%20I%20would%20like%20to%20consult%20regarding%20Vedic%20Astrology."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Helpline</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="header-admin-portal-btn"
              onClick={handleAdminClick}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                mode === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{mode === 'admin' ? '← View Customer Site' : 'Switch to Admin Panel'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </>
              )}
            </button>
            <NotificationBell />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-300 font-cinzel font-bold text-lg">
              ॐ
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl font-bold tracking-wider text-amber-200">
                AstroPoornima
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide">Mata Sri Poornima • Vedic Astrologer</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navItems.map(item => {
            const isActive = mode === 'customer' && customerTab === item.tab;
            return (
              <button
                key={item.tab}
                id={`nav-item-${item.tab}`}
                onClick={() => handleNavClick(item.tab)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-amber-200 hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="book-consultation-header-btn"
            onClick={() => {
              const primaryService = services[0];
              setBookingModalService(primaryService);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wide shadow-lg shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-amber-300 rounded-lg hover:bg-slate-900 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-amber-500/20 px-4 py-4 space-y-1.5 shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map(item => {
              const isActive = mode === 'customer' && customerTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                const primaryService = services[0];
                setBookingModalService(primaryService);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-xs text-center shadow-md"
            >
              Book Vedic Consultation
            </button>
            <button
              onClick={() => {
                handleAdminClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-medium text-center"
            >
              {isAdminLoggedIn ? (mode === 'admin' ? '← View Customer Site' : 'Switch to Admin Panel') : '🔐 Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

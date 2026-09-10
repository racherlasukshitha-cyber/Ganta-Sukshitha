import {
  BarChart3,
  Calendar,
  Compass,
  Database,
  Globe,
  HardDrive,
  Home,
  Layers,
  LogOut,
  Menu,
  Rocket,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { NotificationBell } from '../common/NotificationBell';
import { AdminTab, useApp } from '../../context/AppContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminTab, setAdminTab, setMode, adminLogout, appointments, astrologerPhoto } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard Statistics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'appointments', label: 'Appointments Manager', icon: <Calendar className="w-4 h-4" />, badge: pendingCount },
    { id: 'services', label: 'Manage Vedic Services', icon: <Layers className="w-4 h-4" /> },
    { id: 'users', label: 'Clients & Profiles', icon: <Users className="w-4 h-4" /> },
    { id: 'revenue', label: 'Revenue & Invoices', icon: <Wallet className="w-4 h-4" /> },
    { id: 'analytics', label: 'Growth Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'kundlis', label: 'Kundli Birth Archive', icon: <Compass className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup & Restore', icon: <HardDrive className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO & Marketing', icon: <Globe className="w-4 h-4" /> },
    { id: 'deployment', label: 'Deployment & SSL', icon: <Rocket className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-cinzel font-bold text-amber-300">AstroPoornima Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={() => setMode('customer')}
            className="px-2.5 py-1 text-xs bg-slate-800 text-amber-300 rounded-lg font-medium"
          >
            Visit Site
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between transform transition-transform duration-200 md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-md">
              <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center text-amber-300 font-cinzel font-bold text-lg">
                ॐ
              </div>
            </div>
            <div>
              <span className="font-cinzel text-base font-bold text-amber-200 block leading-none">
                AstroPoornima
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                Master Admin Portal
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
                onClick={() => {
                  setAdminTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  adminTab === item.id
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom User Profile & Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="px-2 py-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={astrologerPhoto || '/poornima_astrologer.jpg'}
                alt="Mata Sri Poornima"
                className="w-8 h-8 rounded-full object-cover border border-amber-400"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/astrologer.jpg';
                }}
              />
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-200 block leading-tight">Mata Sri Poornima</span>
                <span className="text-[10px] text-emerald-400 font-medium">Head Astrologer</span>
              </div>
            </div>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode('customer')}
              className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <span>Client Site</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-2.5 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Topbar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
          <div>
            <h1 className="font-cinzel text-lg font-bold text-white capitalize">
              {adminTab.replace('-', ' ')}
            </h1>
            <p className="text-xs text-slate-400">
              Vedic Sanctuary Management Control
            </p>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />

            <button
              onClick={() => setMode('customer')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Customer Website</span>
            </button>
          </div>
        </header>

        {/* Page children container */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

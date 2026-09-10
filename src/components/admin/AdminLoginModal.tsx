import { Check, Key, Lock, Mail, ShieldAlert, Sparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginModalOpen,
    setAdminLoginModalOpen,
    adminLogin,
    showToast,
  } = useApp();

  const [email, setEmail] = useState('admin@astroveda.com');
  const [password, setPassword] = useState('vedic108');

  if (!isAdminLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = adminLogin(email, password);
    if (ok) {
      showToast('Welcome Acharya ji! Admin Portal authenticated.', 'success');
      setAdminLoginModalOpen(false);
    } else {
      showToast('Invalid credentials. Use admin@astroveda.com / vedic108', 'error');
    }
  };

  const handleDemoFill = () => {
    setEmail('admin@astroveda.com');
    setPassword('vedic108');
  };

  return (
    <div
      id="admin-login-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="admin-login-card"
        className="relative w-full max-w-md bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
      >
        <button
          onClick={() => setAdminLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 mx-auto mb-4 shadow-lg shadow-amber-500/20">
          <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-amber-300 font-cinzel font-bold text-2xl">
            ॐ
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-cinzel text-xl font-bold text-white">
            Astrologer Admin Sanctuary
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Protected management portal for Acharya Devrat Shastri
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Sanctum Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@astroveda.com"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Vedic Security Key (Password)</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            </div>
          </div>

          {/* Quick Demo Credentials pill */}
          <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 flex items-center justify-between text-[11px]">
            <div className="text-slate-400">
              Demo: <span className="text-amber-300 font-mono">admin@astroveda.com</span> / <span className="text-amber-300 font-mono">vedic108</span>
            </div>
            <button
              type="button"
              onClick={handleDemoFill}
              className="text-amber-400 hover:underline font-semibold"
            >
              Auto Fill
            </button>
          </div>

          <button
            type="submit"
            id="submit-admin-login-btn"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Authenticate Admin Session</span>
          </button>
        </form>
      </div>
    </div>
  );
};

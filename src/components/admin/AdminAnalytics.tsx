import { BarChart3, CheckCircle, Clock, Compass, PieChart, Sparkles, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { useApp } from '../../context/AppContext';

export const AdminAnalytics: React.FC = () => {
  const { appointments, services, transactions, savedKundlis } = useApp();

  // Calculate service distribution
  const serviceStats = services.map(s => {
    const count = appointments.filter(a => a.serviceId === s.id).length;
    const revenue = appointments
      .filter(a => a.serviceId === s.id && a.paymentStatus === 'Paid')
      .reduce((sum, a) => sum + a.amount, 0);
    return {
      service: s,
      bookingsCount: count,
      revenue,
    };
  }).sort((a, b) => b.bookingsCount - a.bookingsCount);

  // Status breakdown
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;

  const totalAppts = appointments.length || 1;
  const completedRate = Math.round((completedCount / totalAppts) * 100);

  return (
    <div id="admin-analytics-view" className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <span>Consultation & Growth Analytics Dashboard</span>
        </h2>
        <p className="text-xs text-slate-400">
          Phase 6 Analytics: Booking distribution, high-demand Vedic services, and consultation delivery rates
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Completion Rate
          </span>
          <span className="font-cinzel text-2xl font-bold text-emerald-400">
            {completedRate}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">Consultation fulfillment</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Kundlis Generated
          </span>
          <span className="font-cinzel text-2xl font-bold text-amber-300">
            {savedKundlis.length + 142}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">Total Vedic charts mapped</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Average Ticket Size
          </span>
          <span className="font-cinzel text-2xl font-bold text-slate-100">
            ₹1,850
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">Per consultation session</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
            Global Seeker Reach
          </span>
          <span className="font-cinzel text-2xl font-bold text-indigo-300">
            42 Countries
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">India, USA, UK, UAE, Canada</span>
        </div>
      </div>

      {/* Two Column Visual Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Service Popularity & Revenue Breakdown */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Service Demand & Revenue Contribution</span>
          </h3>

          <div className="space-y-4 pt-2">
            {serviceStats.map(stat => {
              const percentage = Math.round((stat.bookingsCount / totalAppts) * 100);

              return (
                <div key={stat.service.id} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{stat.service.title}</span>
                      <span className="text-[10px] text-amber-400/90 font-mono">({stat.service.category})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{stat.bookingsCount} Bookings ({percentage}%)</span>
                      <span className="font-cinzel font-bold text-amber-300">₹{stat.revenue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, percentage)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-4 h-4 text-indigo-400" />
            <span>Consultation Lifecycle Status</span>
          </h3>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Completed Sessions</span>
              </div>
              <span className="font-bold text-slate-100">{completedCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-400">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Confirmed / Scheduled</span>
              </div>
              <span className="font-bold text-slate-100">{confirmedCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Pending Review</span>
              </div>
              <span className="font-bold text-slate-100">{pendingCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Cancelled / Rescheduled</span>
              </div>
              <span className="font-bold text-slate-100">{cancelledCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  Download,
  Eye,
  MessageCircle,
  Phone,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Video,
  Wallet
} from 'lucide-react';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../types';
import { downloadInvoicePDF } from '../../utils/pdfGenerator';
import { DailyPanchangWidget } from '../customer/DailyPanchangWidget';

export const AdminDashboard: React.FC = () => {
  const {
    appointments,
    services,
    users,
    savedKundlis,
    updateAppointmentStatus,
    setAdminTab,
    showToast,
  } = useApp();

  const totalRevenue = appointments
    .filter(a => a.paymentStatus === 'Paid')
    .reduce((sum, a) => sum + a.amount, 0);

  const pendingAppointments = appointments.filter(a => a.status === 'Pending');
  const confirmedAppointments = appointments.filter(a => a.status === 'Confirmed');
  const completedAppointments = appointments.filter(a => a.status === 'Completed');

  const handleWhatsAppReminder = (appt: Appointment) => {
    const text = encodeURIComponent(
      `🕉️ Namaste ${appt.customerName},\nThis is a reminder for your Vedic Astrology consultation with Acharya Devrat Shastri today at ${appt.timeSlot}.\nMeeting Link: ${appt.meetingLink}\nSee you soon!`
    );
    window.open(`https://wa.me/${appt.customerPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div id="admin-dashboard-view" className="space-y-8">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Collected Revenue
            </span>
            <span className="font-cinzel text-2xl font-bold text-amber-300">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>Razorpay Verified</span>
            </span>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Wallet className="w-6 h-6" />
          </div>
        </div>

        {/* Total Appointments */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Total Bookings
            </span>
            <span className="font-cinzel text-2xl font-bold text-white">
              {appointments.length}
            </span>
            <span className="text-[10px] text-amber-400 block mt-1">
              {pendingAppointments.length} pending review
            </span>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Clients in Directory */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Registered Seekers
            </span>
            <span className="font-cinzel text-2xl font-bold text-white">
              {users.length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              With birth coordinates
            </span>
          </div>
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Kundlis Stored */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
              Kundli Vault
            </span>
            <span className="font-cinzel text-2xl font-bold text-amber-400">
              {savedKundlis.length}
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">
              Parashari charts saved
            </span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Compass className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Grid: Today's Panchang Ticker & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <DailyPanchangWidget />
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-cinzel text-sm font-bold text-amber-200 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Quick Astrologer Actions</span>
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setAdminTab('appointments')}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Review Pending Appointments</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                  {pendingAppointments.length}
                </span>
              </button>

              <button
                onClick={() => setAdminTab('services')}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Edit Consultation Fees & Services</span>
                <span className="text-slate-400 text-[11px]">{services.length} active</span>
              </button>

              <button
                onClick={() => setAdminTab('revenue')}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Generate Revenue & GST Report</span>
                <span className="text-amber-400 text-[11px]">Razorpay</span>
              </button>

              <button
                onClick={() => setAdminTab('backup')}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Database Snapshot Backup</span>
                <span className="text-emerald-400 text-[11px]">1-Click JSON</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Admin Status: Active</span>
            <span className="text-emerald-400 font-semibold">● Online</span>
          </div>
        </div>
      </div>

      {/* Upcoming Consultations Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-cinzel text-base font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Upcoming Consultations Schedule</span>
            </h3>
            <p className="text-xs text-slate-400">
              Manage client appointments, update status, launch Google Meet sessions, or send WhatsApp reminders.
            </p>
          </div>

          <button
            onClick={() => setAdminTab('appointments')}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            View All ({appointments.length}) →
          </button>
        </div>

        {/* Consultations Table */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-3">Ref & Client</th>
                <th className="p-3">Service</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {appointments.slice(0, 5).map(appt => (
                <tr key={appt.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3">
                    <div className="font-semibold text-slate-100">{appt.customerName}</div>
                    <div className="font-mono text-[10px] text-amber-300">{appt.bookingNumber}</div>
                    <div className="text-[10px] text-slate-400">{appt.customerPhone}</div>
                  </td>

                  <td className="p-3">
                    <div className="font-medium text-slate-200">{appt.serviceTitle}</div>
                    <div className="text-[10px] text-slate-400">₹{appt.amount}</div>
                  </td>

                  <td className="p-3">
                    <div className="text-slate-200">{appt.date}</div>
                    <div className="text-[10px] text-amber-300/80">{appt.timeSlot}</div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        appt.paymentStatus === 'Paid'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {appt.paymentStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    <select
                      value={appt.status}
                      onChange={e =>
                        updateAppointmentStatus(appt.id, e.target.value as Appointment['status'])
                      }
                      className={`px-2 py-1 rounded text-xs font-semibold bg-slate-800 border focus:outline-none ${
                        appt.status === 'Confirmed'
                          ? 'text-emerald-300 border-emerald-500/40'
                          : appt.status === 'Completed'
                          ? 'text-blue-300 border-blue-500/40'
                          : appt.status === 'Cancelled'
                          ? 'text-rose-300 border-rose-500/40'
                          : 'text-amber-300 border-amber-500/40'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {appt.meetingLink && (
                        <a
                          href={appt.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30"
                          title="Join Meeting"
                        >
                          <Video className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => handleWhatsAppReminder(appt)}
                        className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 cursor-pointer"
                        title="WhatsApp Reminder"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          downloadInvoicePDF(appt);
                          showToast(`Invoice downloaded for ${appt.bookingNumber}`, 'success');
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        title="Download Invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

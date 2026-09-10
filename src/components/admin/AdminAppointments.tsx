import {
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Filter,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  User,
  Video,
  X
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../types';
import { downloadInvoicePDF } from '../../utils/pdfGenerator';

export const AdminAppointments: React.FC = () => {
  const {
    appointments,
    updateAppointmentStatus,
    updateAppointmentPaymentStatus,
    setEmailModalAppointment,
    showToast,
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(a => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        a.customerName.toLowerCase().includes(q) ||
        a.customerEmail.toLowerCase().includes(q) ||
        a.customerPhone.includes(q) ||
        a.bookingNumber.toLowerCase().includes(q) ||
        a.serviceTitle.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || a.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [appointments, search, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredAppointments.length / pageSize) || 1;
  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAppointments.slice(start, start + pageSize);
  }, [filteredAppointments, currentPage, pageSize]);

  const handleWhatsApp = (appt: Appointment) => {
    const text = encodeURIComponent(
      `🕉️ Namaste ${appt.customerName}!\n\nRegarding your AstroVeda booking (${appt.bookingNumber}) for "${appt.serviceTitle}":\n\nScheduled: ${appt.date} at ${appt.timeSlot} (IST)\nMeeting Room: ${appt.meetingLink}\n\nAcharya Devrat Shastri will be waiting for your session. Feel free to reply if you need any adjustments.`
    );
    window.open(`https://wa.me/${appt.customerPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div id="admin-appointments-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Consultation Appointments Manager</span>
          </h2>
          <p className="text-xs text-slate-400">
            Total {appointments.length} appointments recorded across Vedic services
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Rows per page:</span>
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
          >
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by client name, email, phone, or booking number..."
            className="w-full px-3.5 py-2 pl-9 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={e => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Consultation Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Payment Filter */}
        <div>
          <select
            value={paymentFilter}
            onChange={e => {
              setPaymentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="all">All Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Booking Ref</th>
                <th className="p-3.5">Client & Contact</th>
                <th className="p-3.5">Service</th>
                <th className="p-3.5">Scheduled Slot</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {paginatedAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No appointments matched your query or filter parameters.
                  </td>
                </tr>
              ) : (
                paginatedAppointments.map(appt => (
                  <tr key={appt.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono font-semibold text-amber-300 block">
                        {appt.bookingNumber}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(appt.createdAt).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-semibold text-slate-100">{appt.customerName}</div>
                      <div className="text-[10px] text-slate-400">{appt.customerEmail}</div>
                      <div className="text-[10px] text-slate-500">{appt.customerPhone}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-medium text-slate-200">{appt.serviceTitle}</div>
                      <div className="font-cinzel text-amber-400 font-bold">₹{appt.amount}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="text-slate-200 font-medium">{appt.date}</div>
                      <div className="text-[10px] text-amber-300/80">{appt.timeSlot}</div>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={appt.paymentStatus}
                        onChange={e =>
                          updateAppointmentPaymentStatus(
                            appt.id,
                            e.target.value as Appointment['paymentStatus']
                          )
                        }
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 border focus:outline-none ${
                          appt.paymentStatus === 'Paid'
                            ? 'text-emerald-300 border-emerald-500/40'
                            : appt.paymentStatus === 'Refunded'
                            ? 'text-rose-300 border-rose-500/40'
                            : 'text-amber-300 border-amber-500/40'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>

                    <td className="p-3.5">
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

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedAppt(appt)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300"
                          title="View Birth Details & Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleWhatsApp(appt)}
                          className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30"
                          title="Send WhatsApp Notification"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setEmailModalAppointment(appt)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Preview Email Confirmation"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            downloadInvoicePDF(appt);
                            showToast(`Invoice downloaded for ${appt.bookingNumber}`, 'success');
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Download Tax Invoice"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, filteredAppointments.length)} of{' '}
            {filteredAppointments.length} appointments
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-slate-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Detail Dossier Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-cinzel text-base font-bold text-amber-200">
                  Client Consultation Dossier
                </h3>
                <span className="font-mono text-[11px] text-slate-400">
                  Ref: {selectedAppt.bookingNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedAppt(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Birth Details Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-semibold text-amber-300 block uppercase tracking-wider text-[10px]">
                Native Birth Coordinates (Janam Vivran)
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>• Name: <strong className="text-white">{selectedAppt.birthDetails?.name || selectedAppt.customerName}</strong></div>
                <div>• Gender: <strong className="text-white">{selectedAppt.birthDetails?.gender || 'N/A'}</strong></div>
                <div>• DOB: <strong className="text-white">{selectedAppt.birthDetails?.dob || 'N/A'}</strong></div>
                <div>• TOB: <strong className="text-white">{selectedAppt.birthDetails?.tob || 'N/A'}</strong></div>
                <div className="col-span-2">• POB: <strong className="text-white">{selectedAppt.birthDetails?.pob || 'N/A'}</strong></div>
              </div>
            </div>

            {/* Meeting Link & Session Notes */}
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Encrypted Video Consultation Link</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedAppt.meetingLink || ''}
                    className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-slate-200 font-mono text-[11px]"
                  />
                  {selectedAppt.meetingLink && (
                    <a
                      href={selectedAppt.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold shrink-0"
                    >
                      Join
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Client Inquiries & Astrologer Notes</label>
                <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 leading-relaxed">
                  {selectedAppt.notes || 'No specific notes recorded for this booking.'}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedAppt(null)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import {
  Calendar,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MessageCircle,
  Video,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { downloadInvoicePDF } from '../../utils/pdfGenerator';

export const PaymentReceiptModal: React.FC = () => {
  const {
    receiptModalAppointment,
    setReceiptModalAppointment,
    setEmailModalAppointment,
    showToast,
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);

  if (!receiptModalAppointment) return null;

  const handleCopyLink = () => {
    if (receiptModalAppointment.meetingLink) {
      navigator.clipboard.writeText(receiptModalAppointment.meetingLink);
      setCopiedLink(true);
      showToast('Meeting link copied to clipboard!', 'info');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🕉️ Namaste ${receiptModalAppointment.customerName}!\n\nYour Vedic Astrology consultation with Mata Sri Poornima is CONFIRMED.\n\n📅 Date: ${receiptModalAppointment.date}\n⏰ Time: ${receiptModalAppointment.timeSlot} (IST)\n📌 Service: ${receiptModalAppointment.serviceTitle}\n🔗 Google Meet Link: ${receiptModalAppointment.meetingLink}\n🔖 Booking Ref: ${receiptModalAppointment.bookingNumber}\n\nLooking forward to illuminating your astrological path!\n— AstroPoornima Hub, Hyderabad`
    );
    window.open(`https://wa.me/${receiptModalAppointment.customerPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`AstroPoornima Vedic Consultation: ${receiptModalAppointment.serviceTitle}`);
    const details = encodeURIComponent(`Vedic Consultation with Mata Sri Poornima.\nBooking Ref: ${receiptModalAppointment.bookingNumber}\nGoogle Meet Link: ${receiptModalAppointment.meetingLink}`);
    const location = encodeURIComponent(receiptModalAppointment.meetingLink || 'Online Google Meet');
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(calUrl, '_blank');
  };

  return (
    <div
      id="receipt-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="receipt-modal-card"
        className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 px-6 py-6 border-b border-emerald-500/30 text-center relative">
          <button
            onClick={() => setReceiptModalAppointment(null)}
            className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mx-auto mb-3 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-cinzel text-xl font-bold text-amber-200">
            Booking & Payment Confirmed!
          </h2>
          <p className="text-xs text-emerald-300 font-medium mt-1">
            Order Reference: {receiptModalAppointment.bookingNumber} • Paid ₹{receiptModalAppointment.amount}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Summary Box */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Service Booked:</span>
              <span className="font-semibold text-amber-300 text-right">{receiptModalAppointment.serviceTitle}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Astrologer:</span>
              <span className="font-semibold text-slate-100">Mata Sri Poornima</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Scheduled Date:</span>
              <span className="font-semibold text-slate-100">{receiptModalAppointment.date}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Time Window:</span>
              <span className="font-semibold text-amber-300">{receiptModalAppointment.timeSlot} (IST)</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>Payment ID:</span>
              <span className="font-mono text-[11px] text-slate-400">{receiptModalAppointment.paymentId || 'pay_DEMO_RZP'}</span>
            </div>
          </div>

          {/* Meeting Room Card */}
          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
              <Video className="w-4 h-4 text-indigo-400" />
              <span>Consultation Meeting Link</span>
            </div>
            <p className="text-[11px] text-slate-300">
              A private encrypted Google Meet room has been generated. You can join directly at your scheduled time:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={receiptModalAppointment.meetingLink || ''}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-200 font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-medium flex items-center gap-1 shrink-0"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              id="download-invoice-btn"
              onClick={() => {
                downloadInvoicePDF(receiptModalAppointment);
                showToast('GST Tax Invoice downloaded.', 'success');
              }}
              className="px-3 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Tax Invoice (PDF)</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Details</span>
            </button>

            <button
              type="button"
              onClick={() => setEmailModalAppointment(receiptModalAppointment)}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Preview Email Voucher</span>
            </button>

            <button
              type="button"
              onClick={handleGoogleCalendar}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Add to Google Calendar</span>
            </button>
          </div>
        </div>

        {/* Close footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>A copy has also been sent to {receiptModalAppointment.customerEmail}</span>
          <button
            onClick={() => setReceiptModalAppointment(null)}
            className="text-amber-400 hover:underline font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

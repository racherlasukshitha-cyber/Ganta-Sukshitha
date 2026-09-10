import { CheckCircle, Mail, Send, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const EmailConfirmationModal: React.FC = () => {
  const { emailModalAppointment, setEmailModalAppointment, showToast } = useApp();
  const [isSending, setIsSending] = useState(false);

  if (!emailModalAppointment) return null;

  const handleSimulateResend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast(`Confirmation email re-dispatched to ${emailModalAppointment.customerEmail}`, 'success');
    }, 1000);
  };

  return (
    <div
      id="email-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="email-modal-card"
        className="relative w-full max-w-xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Modal bar */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Transactional Email Preview (Automated Dispatch)</span>
          </div>
          <button
            onClick={() => setEmailModalAppointment(null)}
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Envelope Header */}
        <div className="p-4 bg-slate-800/60 border-b border-slate-700/80 text-xs space-y-1.5 text-slate-300">
          <div>
            <span className="text-slate-500 w-16 inline-block">From:</span>
            <span className="font-medium text-amber-200">AstroPoornima Hub &lt;gantapoornima555@gmail.com&gt;</span>
          </div>
          <div>
            <span className="text-slate-500 w-16 inline-block">To:</span>
            <span className="font-medium text-slate-100">{emailModalAppointment.customerEmail}</span>
          </div>
          <div>
            <span className="text-slate-500 w-16 inline-block">Subject:</span>
            <span className="font-semibold text-slate-100">
              Confirmed: Vedic Consultation with Mata Sri Poornima ({emailModalAppointment.bookingNumber})
            </span>
          </div>
        </div>

        {/* Rendered Email Body */}
        <div className="p-6 bg-white text-slate-800 text-xs leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="text-center pb-4 border-b border-slate-200">
            <div className="inline-block p-2 rounded-full bg-amber-100 text-amber-800 font-cinzel font-bold text-lg mb-1">
              ॐ
            </div>
            <h1 className="font-cinzel text-lg font-bold text-indigo-950">AstroPoornima Vedic Hub</h1>
            <p className="text-[11px] text-slate-500">Jubilee Hills, Road No. 5, Metro Pillar No. 1571, Hyderabad</p>
          </div>

          <p>
            Namaste <strong>{emailModalAppointment.customerName}</strong>,
          </p>

          <p>
            Your sacred Vedic astrology consultation has been confirmed. Mata Sri Poornima has received your natal coordinates and is preparing your planetary charts (D1 Rashi, D9 Navamsha, and D10 Dashamsha).
          </p>

          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 space-y-1.5 text-amber-950">
            <div className="font-bold text-sm text-indigo-950 mb-2">Consultation Particulars:</div>
            <div>• <strong>Service:</strong> {emailModalAppointment.serviceTitle}</div>
            <div>• <strong>Date:</strong> {emailModalAppointment.date}</div>
            <div>• <strong>Time:</strong> {emailModalAppointment.timeSlot} (IST)</div>
            <div>• <strong>Booking Ref:</strong> {emailModalAppointment.bookingNumber}</div>
            <div>• <strong>Payment Status:</strong> Paid (₹{emailModalAppointment.amount})</div>
            <div>
              • <strong>Encrypted Video Link:</strong>{' '}
              <a href={emailModalAppointment.meetingLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline font-mono">
                {emailModalAppointment.meetingLink}
              </a>
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900">How to Prepare for Your Session:</h3>
            <p>1. Please join the meeting link 5 minutes prior to your allocated time.</p>
            <p>2. Keep a notebook and pen ready to record remedies and mantra counts.</p>
            <p>3. If visiting our Jubilee Hills sanctuary in person, arrive 10 minutes ahead of time.</p>
          </div>

          <div className="pt-4 border-t border-slate-200 text-slate-500 text-[11px]">
            <p>For queries or rescheduling, contact <strong>gantapoornima555@gmail.com</strong> or phone/WhatsApp <strong>9160791531</strong>.</p>
            <p className="mt-2 font-serif italic text-slate-700">"सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः"</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Simulated Automated Dispatch</span>
          </div>

          <button
            type="button"
            onClick={handleSimulateResend}
            disabled={isSending}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSending ? 'Sending...' : 'Resend Email'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import confetti from 'canvas-confetti';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CreditCard,
  Lock,
  QrCode,
  Shield,
  Smartphone,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentTransaction } from '../../types';

export const RazorpayModal: React.FC = () => {
  const {
    paymentModalAppointment,
    setPaymentModalAppointment,
    setReceiptModalAppointment,
    updateAppointmentStatus,
    addTransaction,
    showToast,
  } = useApp();

  const [activeMethod, setActiveMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('vikram@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('420');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!paymentModalAppointment) return null;

  const handleSimulatePayment = (success: boolean) => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (success) {
        const rzpPayId = `pay_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
        const rzpOrderId = `order_${Math.random().toString(36).substring(2, 10)}`;

        // Update appointment
        updateAppointmentStatus(paymentModalAppointment.id, 'Confirmed');

        // Record transaction
        const methodMap: Record<string, PaymentTransaction['method']> = {
          upi: 'UPI',
          card: 'Credit Card',
          netbanking: 'Netbanking',
        };

        const tx: PaymentTransaction = {
          id: `TXN-${Date.now()}`,
          appointmentId: paymentModalAppointment.id,
          customerName: paymentModalAppointment.customerName,
          customerEmail: paymentModalAppointment.customerEmail,
          amount: paymentModalAppointment.amount,
          method: methodMap[activeMethod] || 'UPI',
          status: 'Success',
          razorpayPaymentId: rzpPayId,
          razorpayOrderId: rzpOrderId,
          date: new Date().toISOString(),
        };
        addTransaction(tx);

        // Confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }

        const confirmedAppointment = {
          ...paymentModalAppointment,
          status: 'Confirmed' as const,
          paymentStatus: 'Paid' as const,
          paymentId: rzpPayId,
        };

        setPaymentModalAppointment(null);
        setReceiptModalAppointment(confirmedAppointment);
        showToast('Payment successful! Consultation booking confirmed.', 'success');
      } else {
        showToast('Payment simulation failed. You can re-try or choose another payment method.', 'error');
      }
    }, 1200);
  };

  return (
    <div
      id="razorpay-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
    >
      <div
        id="razorpay-checkout-window"
        className="relative w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Razorpay Brand Header */}
        <div className="bg-[#0c2340] px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center font-bold text-blue-300 text-sm">
              RZP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-wide">Razorpay Trusted</span>
                <Shield className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <p className="text-[11px] text-blue-200/80">AstroVeda Vedic Sansthan</p>
            </div>
          </div>
          <button
            onClick={() => setPaymentModalAppointment(null)}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Summary Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Total Payable</span>
            <span className="text-xl font-bold text-slate-900">
              ₹{paymentModalAppointment.amount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Booking No.</span>
            <span className="text-xs font-mono font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {paymentModalAppointment.bookingNumber}
            </span>
          </div>
        </div>

        {/* Methods Selection Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 text-xs font-medium text-slate-600 bg-slate-100/70">
          <button
            type="button"
            onClick={() => setActiveMethod('upi')}
            className={`py-3 flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'upi'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-semibold shadow-sm'
                : 'hover:bg-slate-200/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>UPI / QR</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod('card')}
            className={`py-3 flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'card'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-semibold shadow-sm'
                : 'hover:bg-slate-200/50'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Cards</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod('netbanking')}
            className={`py-3 flex flex-col items-center gap-1 transition-all ${
              activeMethod === 'netbanking'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600 font-semibold shadow-sm'
                : 'hover:bg-slate-200/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Netbanking</span>
          </button>
        </div>

        {/* Method Details */}
        <div className="p-5 space-y-4">
          {activeMethod === 'upi' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50/70 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2.5">
                  <QrCode className="w-8 h-8 text-blue-600" />
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Scan QR Code</span>
                    <span className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded font-semibold">
                  Instant
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Or Enter UPI ID / VPA
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>
          )}

          {activeMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-800 font-mono focus:outline-none focus:border-blue-500"
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-800 font-mono text-center focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-800 font-mono text-center focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeMethod === 'netbanking' && (
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">Select Bank</label>
              <div className="grid grid-cols-2 gap-2">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map(bank => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    className={`px-3 py-2 text-xs rounded-lg border text-left transition-all ${
                      selectedBank === bank
                        ? 'border-blue-600 bg-blue-50 font-semibold text-blue-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Security badge */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center pt-2">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted • PCI-DSS Level 1 Compliant</span>
          </div>

          {/* Action Simulation Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              id="razorpay-success-btn"
              disabled={isProcessing}
              onClick={() => handleSimulatePayment(true)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pay ₹{paymentModalAppointment.amount.toLocaleString('en-IN')} (Success Test)</span>
                </>
              )}
            </button>

            <button
              type="button"
              id="razorpay-fail-btn"
              disabled={isProcessing}
              onClick={() => handleSimulatePayment(false)}
              className="w-full py-2 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Simulate Payment Failure / Decline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

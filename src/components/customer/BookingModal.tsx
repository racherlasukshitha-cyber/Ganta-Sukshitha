import { Calendar, Clock, Sparkles, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const BookingModal: React.FC = () => {
  const {
    bookingModalService,
    setBookingModalService,
    setPaymentModalAppointment,
    addAppointment,
    showToast,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM - 11:45 AM');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1994-05-12');
  const [tob, setTob] = useState('08:30');
  const [pob, setPob] = useState('Varanasi, UP');
  const [notes, setNotes] = useState('');

  if (!bookingModalService) return null;

  const timeSlots = [
    '10:00 AM - 10:45 AM',
    '11:00 AM - 11:45 AM',
    '02:00 PM - 02:45 PM',
    '03:00 PM - 03:45 PM',
    '04:30 PM - 05:15 PM',
    '06:00 PM - 06:45 PM',
    '07:00 PM - 07:45 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      showToast('Please fill in your name, email, and phone number.', 'error');
      return;
    }

    // Create preliminary appointment in pending status
    const newAppointment = addAppointment({
      serviceId: bookingModalService.id,
      serviceTitle: bookingModalService.title,
      customerName,
      customerEmail,
      customerPhone,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      status: 'Pending',
      amount: bookingModalService.price,
      paymentStatus: 'Pending',
      meetingLink: 'https://meet.google.com/ast-ved-' + Math.floor(100 + Math.random() * 900),
      notes: notes.trim() || `Consultation on ${bookingModalService.title}`,
      birthDetails: {
        name: customerName,
        gender,
        dob,
        tob,
        pob,
      },
    });

    // Close booking modal and open Razorpay modal
    setBookingModalService(null);
    setPaymentModalAppointment(newAppointment);
    showToast('Appointment initialized! Please complete secure payment.', 'info');
  };

  return (
    <div
      id="booking-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="booking-modal-card"
        className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 px-6 py-5 border-b border-amber-500/20 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="font-cinzel text-lg font-bold text-amber-200">
                Book Vedic Consultation
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Service: <span className="text-amber-300 font-semibold">{bookingModalService.title}</span>
            </p>
          </div>
          <button
            onClick={() => setBookingModalService(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Banner */}
        <div className="px-6 py-3 bg-amber-950/40 border-b border-amber-500/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Duration:</span>
            <span className="text-amber-200 font-medium">{bookingModalService.durationMinutes} Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Consultation Fee:</span>
            {bookingModalService.originalPrice && (
              <span className="line-through text-slate-500">₹{bookingModalService.originalPrice}</span>
            )}
            <span className="font-bold text-base text-amber-400 font-cinzel">₹{bookingModalService.price}</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Tax Included
            </span>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Personal Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>1. Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Vikramaditya Sharma"
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address * (For Google Meet Link & Kundli PDF)
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="e.g. vikram@gmail.com"
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>2. Select Consultation Date & Time</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Available Time Slot *
                </label>
                <select
                  value={selectedTimeSlot}
                  onChange={e => setSelectedTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>
                      {slot} (IST)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Birth Particulars */}
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>3. Native Birth Particulars (For Janam Kundli)</span>
              </h3>
              <span className="text-[10px] text-slate-400">Confidential</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Exact Time (HH:MM)</label>
                <input
                  type="time"
                  value={tob}
                  onChange={e => setTob(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">Place of Birth</label>
                <input
                  type="text"
                  value={pob}
                  onChange={e => setPob(e.target.value)}
                  placeholder="City, State"
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Specific Query / Notes */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Specific Questions or Areas of Focus (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Inquiring regarding career transition, marriage timing, Sade Sati remedies, etc."
              className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500 placeholder-slate-500"
            />
          </div>

          {/* Submit CTA */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-800">
            <button
              type="button"
              onClick={() => setBookingModalService(null)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="proceed-to-payment-btn"
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-amber-500/20 transition-transform active:scale-95 cursor-pointer"
            >
              Proceed to Razorpay Payment (₹{bookingModalService.price}) →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

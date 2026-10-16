import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Users, CheckCircle, MessageSquare, Phone, AlertCircle, X, ArrowLeft } from 'lucide-react';
import { Reservation } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

interface TableBookingProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const TableBookingSection: React.FC<TableBookingProps> = ({ isModal = false, onClose }) => {
  const { businessConfig, bookTable, theme } = useRestaurant();
  const isDark = theme === 'chargrill-dark';

  // Keyboard shortcut: Close on ESC key
  useEffect(() => {
    if (!isModal || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModal, onClose]);

  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('08:00 PM');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<'Indoor' | 'Cozy Corner' | 'Group Booth' | 'Any'>('Indoor');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableTimeSlots = [
    '11:30 AM', '12:30 PM', '01:30 PM', '02:30 PM',
    '04:00 PM', '05:30 PM', '07:00 PM', '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    if (new Date(date) < new Date(todayStr)) {
      setErrorMsg('Please select today or a future date');
      return;
    }

    const newRes = bookTable({
      name: name.trim(),
      phone: phone.trim(),
      date,
      timeSlot,
      guests,
      seatingPreference,
      specialRequest: specialRequest.trim() || undefined
    });

    setConfirmedReservation(newRes);
  };

  const handleSendToWhatsApp = (res: Reservation) => {
    const text = `Hello CharGrill Cafe! 🪑\n\nI want to book a table *#${res.referenceNumber}* at your Indri cafe:\n\n*Name:* ${res.name}\n*Phone:* ${res.phone}\n*Date:* ${res.date}\n*Time:* ${res.timeSlot}\n*Guests:* ${res.guests} people\n*Seating:* ${res.seatingPreference}\n${res.specialRequest ? `*Note:* ${res.specialRequest}\n` : ''}\nPlease confirm table availability. Thanks!`;

    const encoded = encodeURIComponent(text);
    const whatsappNum = businessConfig.whatsappPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, '_blank');
  };

  const formBody = (
    <div className="w-full text-left">
      {confirmedReservation ? (
        /* Confirmation Screen */
        <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 text-center shadow-xl ${
          isDark
            ? 'bg-[#181614] border-[#2A241E] text-[#FAF5EE]'
            : 'bg-white border-[#EBE2D5] text-[#1C1917]'
        }`}>
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>

          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
            }`}>
              Request Received
            </span>
            <h3 className={`text-2xl font-black mt-1 font-display ${
              isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
            }`}>
              Table Request Confirmed
            </h3>
            <p className={`text-xs sm:text-sm mt-1 max-w-sm mx-auto ${
              isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'
            }`}>
              We have received your table booking request. The team at CharGrill Cafe will reserve your spot.
            </p>
          </div>

          <div className={`border rounded-2xl p-4 max-w-md mx-auto text-xs text-left space-y-2 ${
            isDark
              ? 'bg-[#1F1C19] border-[#2C2620]'
              : 'bg-[#FAF6EF] border-[#E0D4C3]'
          }`}>
            <div className={`flex justify-between border-b pb-1.5 ${isDark ? 'border-[#2A241E]' : 'border-[#E8DEC9]'}`}>
              <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Reference:</span>
              <span className={`font-mono font-bold ${isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}`}>
                {confirmedReservation.referenceNumber}
              </span>
            </div>
            <div className={`flex justify-between border-b pb-1.5 ${isDark ? 'border-[#2A241E]' : 'border-[#E8DEC9]'}`}>
              <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Date & Time:</span>
              <span className="font-bold">{confirmedReservation.date} at {confirmedReservation.timeSlot}</span>
            </div>
            <div className={`flex justify-between border-b pb-1.5 ${isDark ? 'border-[#2A241E]' : 'border-[#E8DEC9]'}`}>
              <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Party:</span>
              <span className="font-bold">{confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Name:</span>
              <span className="font-bold">{confirmedReservation.name} ({confirmedReservation.phone})</span>
            </div>
          </div>

          <div className="space-y-2.5 max-w-md mx-auto">
            <button
              onClick={() => handleSendToWhatsApp(confirmedReservation)}
              className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm on WhatsApp (+91 88149 44441)</span>
            </button>

            <div className="flex gap-2">
              <a
                href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
                className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold text-center flex items-center justify-center gap-1.5 border transition-colors ${
                  isDark
                    ? 'bg-[#1F1C19] hover:bg-[#2A241E] text-[#FAF5EE] border-[#2C2620]'
                    : 'bg-white hover:bg-[#FAF6EF] text-[#1C1917] border-[#D8CEBE]'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Call CharGrill</span>
              </a>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer border transition-colors ${
                    isDark ? 'bg-[#2A241E] hover:bg-[#342D26] text-[#FAF5EE] border-[#382E25]' : 'bg-[#1C1917] hover:bg-[#342D26] text-white border-transparent'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Done (Esc)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Booking Form */
        <form onSubmit={handleSubmit} className={`space-y-4 border rounded-3xl p-6 sm:p-8 shadow-sm ${
          isDark
            ? 'bg-[#181614] border-[#2A241E] text-[#FAF5EE]'
            : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917]'
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${
            isDark ? 'border-[#26201B]' : 'border-[#F2E8DC]'
          }`}>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider block ${
                isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
              }`}>
                Dine-In Reservation
              </span>
              <h3 className={`text-2xl font-black font-display ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                Book a Table
              </h3>
              <p className={`text-xs ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                Garhi Birbal Road near Patwar Khana, Indri
              </p>
            </div>
            {isModal && onClose && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    isDark
                      ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#FAF5EE] border-[#362F27]'
                      : 'bg-[#FAF6EF] hover:bg-[#F2E8DC] text-[#57534E] border-[#E0D4C3]'
                  }`}
                  title="Close table booking (Esc)"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Go Back</span>
                  <span className="text-[10px] opacity-60 font-mono ml-0.5">Esc</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  title="Close (Esc)"
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border transition-colors ${
                    isDark
                      ? 'bg-[#221E1A] hover:bg-red-950/60 hover:text-red-300 text-[#FAF5EE] border-[#362F27]'
                      : 'bg-[#FAF6EF] hover:bg-red-50 hover:text-red-700 text-[#57534E] border-[#E0D4C3]'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-2xl bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Booking Type: Regular Table vs Party Hall */}
          <div>
            <label className={`text-xs font-bold block mb-1.5 ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
              Select Booking Type
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSeatingPreference('Indoor')}
                className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  seatingPreference !== 'Group Booth'
                    ? (isDark
                        ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                        : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                    : (isDark
                        ? 'bg-[#1F1C19] border-[#2C2620] text-[#A8A29E]'
                        : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#57534E]')
                }`}
              >
                <div className="font-bold">🪑 Cafe Table</div>
                <div className={`text-[10px] ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                  Casual dine-in & snacks
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSeatingPreference('Group Booth')}
                className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  seatingPreference === 'Group Booth'
                    ? (isDark
                        ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                        : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                    : (isDark
                        ? 'bg-[#1F1C19] border-[#2C2620] text-[#A8A29E]'
                        : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#57534E]')
                }`}
              >
                <div className="font-bold">🎉 Party Hall (AC)</div>
                <div className={`text-[10px] ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                  ₹300/hr (Free &gt; ₹2,000)
                </div>
              </button>
            </div>
          </div>

          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${
                isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
              }`}>
                <CalendarIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Date *</span>
              </label>
              <input
                type="date"
                required
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] focus:border-[#F59E0B]'
                    : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#1C1917] focus:border-[#E59A19]'
                }`}
              />
            </div>

            <div>
              <label className={`text-xs font-bold block mb-1 flex items-center gap-1.5 ${
                isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
              }`}>
                <Users className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Guests</span>
              </label>
              <div className={`flex items-center gap-2 border rounded-full p-1 ${
                isDark ? 'bg-[#1F1C19] border-[#2C2620]' : 'bg-[#FAF6EF] border-[#E0D4C3]'
              }`}>
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
                    isDark ? 'text-[#FAF5EE] hover:bg-[#2A241E]' : 'hover:bg-[#FFFDF9] text-[#57534E]'
                  }`}
                >
                  -
                </button>
                <span className={`flex-1 text-center font-bold text-xs ${
                  isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
                }`}>
                  {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests(Math.min(15, guests + 1))}
                  className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer ${
                    isDark ? 'text-[#FAF5EE] hover:bg-[#2A241E]' : 'hover:bg-[#FFFDF9] text-[#57534E]'
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <label className={`text-xs font-bold block mb-1.5 flex items-center gap-1.5 ${
              isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'
            }`}>
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Time Slot</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`py-1.5 px-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    timeSlot === slot
                      ? (isDark ? 'bg-[#F59E0B] text-[#121110] shadow-xs' : 'bg-[#E59A19] text-white shadow-xs')
                      : (isDark
                          ? 'bg-[#1F1C19] border border-[#2C2620] text-[#D6D3D1] hover:border-[#F59E0B]'
                          : 'bg-[#FAF6EF] border border-[#E0D4C3] text-[#57534E] hover:border-[#E59A19]')
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Gurpreet Singh"
                className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                    : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                }`}
              />
            </div>

            <div>
              <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 088149 44441"
                className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                  isDark
                    ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                    : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                }`}
              />
            </div>
          </div>

          {/* Special request */}
          <div>
            <input
              type="text"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Special note (e.g. Birthday celebration, corner table)"
              className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                isDark
                  ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                  : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
              }`}
            />
          </div>

          {/* Submit & Cancel Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            {isModal && onClose && (
              <button
                type="button"
                onClick={onClose}
                className={`w-full sm:w-auto px-5 py-3.5 rounded-full font-bold text-xs sm:text-sm border transition-colors cursor-pointer text-center shrink-0 flex items-center justify-center gap-1.5 ${
                  isDark
                    ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#D6D3D1] border-[#382E25]'
                    : 'bg-[#FAF6EF] hover:bg-[#F2E8DC] text-[#57534E] border-[#E0D4C3]'
                }`}
                title="Go back / cancel (Esc)"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Go Back</span>
                <span className="text-[10px] opacity-60 font-mono">(Esc)</span>
              </button>
            )}
            <button
              type="submit"
              className={`w-full flex-1 py-3.5 px-4 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-md cursor-pointer transition-transform active:scale-95 ${
                isDark
                  ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110] shadow-[#F59E0B]/20'
                  : 'bg-[#E59A19] hover:bg-[#D9880A] text-white shadow-[#E59A19]/25 font-extrabold'
              }`}
            >
              Confirm Table Request
            </button>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) {
            onClose();
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Table & Hall Booking Dialog"
      >
        <div
          className="relative w-full max-w-lg my-auto animate-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {formBody}
        </div>
      </div>
    );
  }

  return (
    <section id="book-table" className={`py-12 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#141210] text-[#FAF5EE] border-[#26201B]'
        : 'bg-[#FAF6EF] text-[#1C1917] border-[#EBDDC8]'
    }`}>
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {formBody}
      </div>
    </section>
  );
};

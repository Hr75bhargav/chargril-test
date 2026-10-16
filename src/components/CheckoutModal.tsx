import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, MessageSquare, AlertCircle, QrCode, ArrowLeft } from 'lucide-react';
import { OrderType, PaymentMethod, Order } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    appliedPromo,
    businessConfig,
    placeOrder,
    theme
  } = useRestaurant();

  const isDark = theme === 'chargrill-dark';

  // Keyboard shortcut: Close on ESC key
  useEffect(() => {
    if (!isCheckoutOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsCheckoutOpen(false);
        setConfirmedOrder(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheckoutOpen, setIsCheckoutOpen]);

  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [preferredTime, setPreferredTime] = useState('ASAP (25-35 mins)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const deliveryFee = orderType === 'delivery'
    ? (cartSubtotal >= businessConfig.freeDeliveryThreshold ? 0 : businessConfig.deliveryFee)
    : 0;

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'CHARGRILL50') {
      discount = 50;
    } else if (appliedPromo.code === 'BOGOPIZZA') {
      discount = 70;
    } else {
      discount = 30;
    }
  }

  const finalTotal = Math.max(0, cartSubtotal + deliveryFee - discount);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (orderType === 'delivery') {
      if (!businessConfig.deliveryEnabled) {
        errs.orderType = 'Delivery is currently unavailable. Please select Pickup.';
      } else if (!deliveryAddress.trim()) {
        errs.deliveryAddress = 'Please enter your delivery address in Indri';
      }
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const order = placeOrder({
      customerName: name.trim(),
      customerPhone: phone.trim(),
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
      landmark: landmark.trim() || undefined,
      preferredTime,
      specialInstructions: specialInstructions.trim() || undefined,
      paymentMethod
    });

    setConfirmedOrder(order);
  };

  const sendOrderToWhatsApp = (order: Order) => {
    const itemsSummary = order.items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.name}${i.sizeName ? ` (${i.sizeName})` : ''} — ₹${i.price}`
      )
      .join('\n');

    const addressText = order.deliveryAddress
      ? `\n*Delivery Address:* ${order.deliveryAddress}${order.landmark ? ` (Near ${order.landmark})` : ''}`
      : '\n*Type:* Pickup at Indri Cafe';

    const text = `Hello CharGrill Cafe! 🍕\n\nI have placed an order *#${order.orderNumber}*:\n\n*Items:*\n${itemsSummary}\n\n*Subtotal:* ₹${order.subtotal}\n*Delivery:* ₹${order.deliveryFee}\n*Discount:* ₹${order.discount}\n*Total:* ₹${order.total}\n*Payment:* ${order.paymentMethod.toUpperCase()}${addressText}\n*Name:* ${order.customerName}\n*Phone:* ${order.customerPhone}\n*Timing:* ${order.preferredTime}\n${order.specialInstructions ? `*Notes:* ${order.specialInstructions}\n` : ''}\nPlease confirm my order. Thank you!`;

    const encoded = encodeURIComponent(text);
    const whatsappNum = businessConfig.whatsappPhone.replace(/\D/g, '');
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, '_blank');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-lg border rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors duration-300 animate-in zoom-in-95 duration-150 ${
          isDark
            ? 'bg-[#181614] border-[#2A241E] text-[#FAF5EE]'
            : 'bg-[#FAF6EF] border-[#E5D7C2] text-[#1C1917]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark
            ? 'bg-[#141210] border-[#26201B]'
            : 'bg-[#F3EAD9] border-[#E5D7C2]'
        }`}>
          <div className="text-left">
            <h3 className={`font-extrabold text-lg ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
              {confirmedOrder ? 'Order Confirmed!' : 'Checkout & Confirm'}
            </h3>
            <p className={`text-xs ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
              {confirmedOrder
                ? 'Your meal is being prepared fresh at CharGrill'
                : 'CharGrill Cafe, Garhi Birbal Road, Indri'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#FAF5EE] border-[#362F27]'
                  : 'bg-[#FFFDF9] hover:bg-[#FAF6EF] text-[#57534E] border-[#E0D4C3]'
              }`}
              title="Close checkout (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
              <span className="text-[10px] opacity-60 font-mono ml-0.5">Esc</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close dialog"
              title="Close (Esc)"
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border transition-colors ${
                isDark
                  ? 'bg-[#221E1A] hover:bg-red-950/60 hover:text-red-300 text-[#FAF5EE] border-[#362F27]'
                  : 'bg-[#FFFDF9] hover:bg-red-50 hover:text-red-700 text-[#57534E] border-[#E0D4C3]'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-left">
          {confirmedOrder ? (
            /* Confirmation */
            <div className="space-y-5 text-center">
              <div className={`py-4 rounded-3xl p-5 border ${
                isDark
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-[#FAF5EE]'
                  : 'bg-emerald-50 border-emerald-200 text-[#1C1917]'
              }`}>
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-xl font-extrabold">Order Placed!</h4>
                <div className={`inline-block mt-2 px-3 py-1 rounded-full font-mono font-bold text-xs border ${
                  isDark
                    ? 'bg-[#1C1917] border-[#332C24] text-[#F59E0B]'
                    : 'bg-[#FFFDF9] border-[#E0D4C3] text-[#B45309]'
                }`}>
                  Order #{confirmedOrder.orderNumber}
                </div>
                <p className={`text-xs mt-2 ${isDark ? 'text-[#D6D3D1]' : 'text-[#57534E]'}`}>
                  Estimated prep time: <strong className={isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}>{confirmedOrder.estimatedPrepTimeMinutes} minutes</strong>
                </p>
              </div>

              {/* Order Details */}
              <div className={`rounded-2xl p-4 space-y-2 text-xs text-left shadow-xs border ${
                isDark
                  ? 'bg-[#1F1C19] border-[#2C2620]'
                  : 'bg-[#FFFDF9] border-[#E8DBC5]'
              }`}>
                <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-[#2A241E]' : 'border-[#F2E8DC]'}`}>
                  <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Type:</span>
                  <span className="font-bold uppercase">
                    {confirmedOrder.orderType === 'delivery' ? 'Home Delivery' : 'Pickup at Cafe'}
                  </span>
                </div>
                <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-[#2A241E]' : 'border-[#F2E8DC]'}`}>
                  <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Customer:</span>
                  <span className="font-semibold">{confirmedOrder.customerName} ({confirmedOrder.customerPhone})</span>
                </div>
                {confirmedOrder.deliveryAddress && (
                  <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-[#2A241E]' : 'border-[#F2E8DC]'}`}>
                    <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Address:</span>
                    <span className="text-right">{confirmedOrder.deliveryAddress}</span>
                  </div>
                )}
                <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-[#2A241E]' : 'border-[#F2E8DC]'}`}>
                  <span className={isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}>Payment:</span>
                  <span className={`font-bold uppercase ${isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}`}>
                    {confirmedOrder.paymentMethod === 'upi' ? 'UPI' : 'Cash'}
                  </span>
                </div>

                <div className="pt-1">
                  <span className={`block mb-1 font-semibold ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                    Items:
                  </span>
                  {confirmedOrder.items.map((i, idx) => (
                    <div key={idx} className={`flex justify-between py-0.5 ${isDark ? 'text-[#D6D3D1]' : 'text-[#44403C]'}`}>
                      <span>{i.quantity}x {i.name}</span>
                      <span>₹{i.price}</span>
                    </div>
                  ))}
                  <div className={`flex justify-between font-black text-sm pt-2 border-t mt-2 ${
                    isDark ? 'border-[#2A241E]' : 'border-[#F2E8DC]'
                  }`}>
                    <span>Total Amount:</span>
                    <span className={isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}>
                      ₹{confirmedOrder.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={() => sendOrderToWhatsApp(confirmedOrder)}
                  className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order to WhatsApp (+91 88149 44441)</span>
                </button>

                <div className="flex gap-2">
                  <a
                    href={`tel:${businessConfig.phone.replace(/\s+/g, '')}`}
                    className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold text-center flex items-center justify-center gap-1.5 border transition-colors ${
                      isDark
                        ? 'bg-[#1F1C19] hover:bg-[#2A241E] text-[#FAF5EE] border-[#2C2620]'
                        : 'bg-[#FFFDF9] hover:bg-[#FAF6EF] text-[#1C1917] border-[#D8CEBE]'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Call Cafe</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className={`flex-1 py-2.5 px-3 rounded-full text-xs font-bold text-center ${
                      isDark ? 'bg-[#2A241E] text-[#FAF5EE]' : 'bg-[#1C1917] text-white'
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pickup / Delivery toggle */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
                }`}>
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      orderType === 'pickup'
                        ? (isDark
                            ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                            : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                        : (isDark
                            ? 'bg-[#1F1C19] border-[#2C2620] text-[#A8A29E]'
                            : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#57534E]')
                    }`}
                  >
                    <div className="text-xs font-bold">🛍️ Self Pickup</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                      Garhi Birbal Rd, Indri
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      orderType === 'delivery'
                        ? (isDark
                            ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                            : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                        : (isDark
                            ? 'bg-[#1F1C19] border-[#2C2620] text-[#A8A29E]'
                            : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#57534E]')
                    }`}
                  >
                    <div className="text-xs font-bold">🛵 Home Delivery</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                      Across Indri town
                    </div>
                  </button>
                </div>
                {errors.orderType && <p className="text-[11px] text-red-500 mt-1">{errors.orderType}</p>}
              </div>

              {/* Name and Phone */}
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
                    placeholder="e.g. Aman Deep"
                    className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                      isDark
                        ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                        : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-500 mt-0.5">{errors.name}</p>}
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
                        : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === 'delivery' && (
                <div className={`p-3.5 rounded-2xl border space-y-2 ${
                  isDark
                    ? 'bg-[#1F1C19] border-[#2C2620]'
                    : 'bg-[#FFFDF9] border-[#E8DBC5]'
                }`}>
                  <div>
                    <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                      Delivery Address in Indri *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House / Street, Colony or Ward, Indri"
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none ${
                        isDark
                          ? 'bg-[#141210] border-[#2A241E] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                          : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                      }`}
                    />
                    {errors.deliveryAddress && (
                      <p className="text-[11px] text-red-500 mt-0.5">{errors.deliveryAddress}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Nearby Landmark (e.g. Near Patwar Khana, Main Chowk)"
                      className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                        isDark
                          ? 'bg-[#141210] border-[#2A241E] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                          : 'bg-[#FAF6EF] border-[#E0D4C3] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Time & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                    Timing
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={`w-full px-3 py-2 rounded-full border text-xs focus:outline-none ${
                      isDark
                        ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] focus:border-[#F59E0B]'
                        : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] focus:border-[#E59A19]'
                    }`}
                  >
                    <option value="ASAP (25-35 mins)">ASAP (~25–35 mins)</option>
                    <option value="In 45 minutes">In 45 minutes</option>
                    <option value="In 1 hour">In 1 hour</option>
                    <option value="Evening (07:00 PM - 08:00 PM)">Evening (07:00 PM - 08:00 PM)</option>
                    <option value="Night (08:30 PM - 09:30 PM)">Night (08:30 PM - 09:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className={`text-xs font-bold block mb-1 ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                    Notes
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra napkins, less spicy"
                    className={`w-full px-3.5 py-2.5 rounded-full border text-xs focus:outline-none ${
                      isDark
                        ? 'bg-[#1F1C19] border-[#2C2620] text-[#FAF5EE] placeholder-[#78716C] focus:border-[#F59E0B]'
                        : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#1C1917] placeholder-[#A8A29E] focus:border-[#E59A19]'
                    }`}
                  />
                </div>
              </div>

              {/* Payment selection */}
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1.5 ${
                  isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'
                }`}>
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? (isDark
                            ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                            : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                        : (isDark
                            ? 'bg-[#1F1C19] border-[#2C2620] text-[#A8A29E]'
                            : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#57534E]')
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <QrCode className="w-4 h-4 text-[#F59E0B]" />
                      <span>UPI / QR</span>
                    </div>
                    <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                      GPay, PhonePe, Paytm
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod(orderType === 'delivery' ? 'cash_on_delivery' : 'cash_on_pickup')}
                    className={`p-2.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      paymentMethod !== 'upi'
                        ? (isDark
                            ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#FAF5EE]'
                            : 'bg-[#E59A19]/15 border-[#E59A19] text-[#1C1917]')
                        : (isDark
                            ? 'bg-[#1F1C19] border-[#2C2620] text-[#A8A29E]'
                            : 'bg-[#FFFDF9] border-[#E8DBC5] text-[#57534E]')
                    }`}
                  >
                    <div className="font-bold text-xs">
                      {orderType === 'delivery' ? '💵 Cash on Delivery' : '💵 Cash on Pickup'}
                    </div>
                    <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                      Pay at handover
                    </span>
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                isDark
                  ? 'bg-[#1F1C19] border-[#2C2620]'
                  : 'bg-[#FFFDF9] border-[#E8DBC5]'
              }`}>
                <div className={`flex justify-between ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                  <span>Subtotal:</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className={`flex justify-between ${isDark ? 'text-[#A8A29E]' : 'text-[#57534E]'}`}>
                    <span>Delivery Charge:</span>
                    <span>{deliveryFee === 0 ? 'FREE (above ₹399)' : `₹${deliveryFee}`}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-semibold">
                    <span>Discount:</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className={`pt-1.5 border-t flex justify-between font-black text-sm ${
                  isDark ? 'border-[#26201B] text-[#FAF5EE]' : 'border-[#F2E8DC] text-[#1C1917]'
                }`}>
                  <span>Total:</span>
                  <span className={isDark ? 'text-[#F59E0B]' : 'text-[#B45309]'}>
                    ₹{finalTotal}
                  </span>
                </div>
              </div>

              {/* Submit & Cancel Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
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
                <button
                  type="submit"
                  className={`w-full flex-1 py-3.5 px-4 rounded-full font-black text-sm tracking-wide shadow-md cursor-pointer transition-transform active:scale-95 ${
                    isDark
                      ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#121110] shadow-[#F59E0B]/20'
                      : 'bg-[#E59A19] hover:bg-[#D9880A] text-white shadow-[#E59A19]/25 font-extrabold'
                  }`}
                >
                  Confirm & Place Order (₹{finalTotal})
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

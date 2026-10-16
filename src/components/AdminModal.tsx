import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  ShoppingBag,
  Calendar,
  Settings,
  Tag,
  DollarSign,
  ArrowLeft
} from 'lucide-react';
import { MenuItem, OrderStatus } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    categories,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    businessConfig,
    updateBusinessConfig,
    promotions,
    updatePromotions,
    resetToDefaults,
    theme
  } = useRestaurant();

  const isDark = theme === 'chargrill-dark';

  // Keyboard shortcut: Close on ESC key
  useEffect(() => {
    if (!isAdminOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, setIsAdminOpen]);

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu' | 'settings' | 'offers'>('orders');

  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [itemForm, setItemForm] = useState<{
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    isVeg: boolean;
    available: boolean;
  }>({
    name: '',
    category: 'pizza',
    description: '',
    price: 199,
    image: '',
    isVeg: true,
    available: true
  });

  const [settingsForm, setSettingsForm] = useState(businessConfig);

  if (!isAdminOpen) return null;

  const handleOpenAdd = () => {
    setEditItemId(null);
    setItemForm({
      name: '',
      category: categories[0]?.id || 'pizza',
      description: '',
      price: 199,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      available: true
    });
    setIsEditingItem(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditItemId(item.id);
    setItemForm({
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      image: item.image,
      isVeg: item.isVeg,
      available: item.available
    });
    setIsEditingItem(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemForm.name.trim()) return;

    if (editItemId) {
      updateMenuItem(editItemId, itemForm);
    } else {
      addMenuItem(itemForm);
    }
    setIsEditingItem(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig(settingsForm);
    alert('Cafe settings updated successfully!');
  };

  const orderStatusSteps: OrderStatus[] = ['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED'];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsAdminOpen(false);
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-colors duration-300 animate-in zoom-in-95 duration-150 ${
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
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              isDark ? 'bg-[#F59E0B] text-[#121110]' : 'bg-[#E59A19] text-white'
            }`}>
              <Settings className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h3 className={`font-extrabold text-base ${isDark ? 'text-[#FAF5EE]' : 'text-[#1C1917]'}`}>
                Owner Dashboard
              </h3>
              <p className={`text-xs ${isDark ? 'text-[#A8A29E]' : 'text-[#78716C]'}`}>
                CharGrill Cafe, Garhi Birbal Road, Indri
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isDark
                  ? 'bg-[#221E1A] hover:bg-[#2C2621] text-[#FAF5EE] border-[#362F27]'
                  : 'bg-[#FFFDF9] hover:bg-[#FAF6EF] text-[#57534E] border-[#E0D4C3]'
              }`}
              title="Close dashboard (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
              <span className="text-[10px] opacity-60 font-mono ml-0.5">Esc</span>
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border transition-colors ${
                isDark
                  ? 'bg-[#221E1A] hover:bg-red-950/60 hover:text-red-300 text-[#FAF5EE] border-[#362F27]'
                  : 'bg-[#FFFDF9] hover:bg-red-50 hover:text-red-700 text-[#57534E] border-[#E0D4C3]'
              }`}
              aria-label="Close dashboard"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex items-center gap-1 px-4 sm:px-6 pt-2 border-b overflow-x-auto scrollbar-none ${
          isDark ? 'border-[#26201B] bg-[#181614]' : 'border-[#E5D7C2] bg-[#FAF6EF]'
        }`}>
          <button
            onClick={() => { setActiveTab('orders'); setIsEditingItem(false); }}
            className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#E59A19] text-[#B45309]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('reservations'); setIsEditingItem(false); }}
            className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'reservations'
                ? 'border-[#E59A19] text-[#B45309]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Bookings ({reservations.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('menu'); setIsEditingItem(false); }}
            className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'menu'
                ? 'border-[#E59A19] text-[#B45309]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Menu & Prices ({menuItems.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setIsEditingItem(false); }}
            className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#E59A19] text-[#B45309]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Cafe Info</span>
          </button>

          <button
            onClick={() => { setActiveTab('offers'); setIsEditingItem(false); }}
            className={`px-4 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'offers'
                ? 'border-[#E59A19] text-[#B45309]'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Offers</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 text-left">
          {/* ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#1C1917]">Live Order Queue</h4>
              {orders.length === 0 ? (
                <div className="py-12 text-center text-[#78716C] bg-white rounded-2xl border border-[#EBE2D5]">
                  No orders placed yet.
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="p-3.5 rounded-2xl bg-white border border-[#EBE2D5] space-y-2 text-xs shadow-xs">
                    <div className="flex justify-between items-center border-b border-[#F2E8DC] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#B45309] bg-[#FAF6EF] px-2 py-0.5 rounded-full border border-[#E0D4C3]">
                          #{ord.orderNumber}
                        </span>
                        <span className="font-bold text-[#1C1917]">{ord.customerName}</span>
                        <a href={`tel:${ord.customerPhone}`} className="text-[#E59A19]">({ord.customerPhone})</a>
                      </div>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold px-2 py-1 rounded-full bg-[#FAF6EF] border border-[#E0D4C3]"
                      >
                        {orderStatusSteps.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div className="text-[#57534E]">
                      {ord.orderType === 'delivery' ? `🛵 Delivery: ${ord.deliveryAddress}` : '🛍️ Self Pickup at Cafe'}
                      <span className="block text-[11px] text-[#78716C]">Time: {ord.preferredTime} · Payment: {ord.paymentMethod.toUpperCase()}</span>
                    </div>

                    <div className="pt-1 border-t border-[#F2E8DC] flex justify-between font-bold text-[#1C1917]">
                      <span>Items: {ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</span>
                      <span className="text-[#B45309]">₹{ord.total}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#1C1917]">Table Booking Requests</h4>
              {reservations.length === 0 ? (
                <div className="py-12 text-center text-[#78716C] bg-white rounded-2xl border border-[#EBE2D5]">
                  No table bookings yet.
                </div>
              ) : (
                reservations.map((res) => (
                  <div key={res.id} className="p-3.5 rounded-2xl bg-white border border-[#EBE2D5] flex items-center justify-between text-xs shadow-xs">
                    <div>
                      <div className="font-bold text-[#1C1917]">
                        #{res.referenceNumber} · {res.name} ({res.phone})
                      </div>
                      <div className="text-[#57534E]">
                        Date: {res.date} at {res.timeSlot} · {res.guests} Guests
                      </div>
                      {res.specialRequest && <div className="text-[11px] text-[#78716C]">Note: {res.specialRequest}</div>}
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => updateReservationStatus(res.id, 'CONFIRMED')}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          res.status === 'CONFIRMED' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateReservationStatus(res.id, 'REJECTED')}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          res.status === 'REJECTED' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MENU */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-[#1C1917]">Menu & Pricing</h4>
                {!isEditingItem && (
                  <button
                    onClick={handleOpenAdd}
                    className="px-3.5 py-1.5 rounded-full bg-[#E59A19] hover:bg-[#D9880A] text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                )}
              </div>

              {isEditingItem ? (
                <form onSubmit={handleSaveItem} className="p-4 rounded-2xl bg-white border border-[#E59A19] space-y-3 text-xs">
                  <div className="flex justify-between font-bold text-[#1C1917]">
                    <span>{editItemId ? 'Edit Item' : 'New Item'}</span>
                    <button type="button" onClick={() => setIsEditingItem(false)} className="text-[#78716C]">Cancel</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Item name"
                      value={itemForm.name}
                      onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-[#FAF6EF] border border-[#E0D4C3]"
                    />
                    <select
                      value={itemForm.category}
                      onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-[#FAF6EF] border border-[#E0D4C3]"
                    >
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      required
                      placeholder="Price"
                      value={itemForm.price}
                      onChange={(e) => setItemForm({ ...itemForm, price: Number(e.target.value) })}
                      className="px-3 py-2 rounded-xl bg-[#FAF6EF] border border-[#E0D4C3]"
                    />
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={itemForm.image}
                      onChange={(e) => setItemForm({ ...itemForm, image: e.target.value })}
                      className="px-3 py-2 rounded-xl bg-[#FAF6EF] border border-[#E0D4C3]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={itemForm.description}
                    onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF6EF] border border-[#E0D4C3]"
                  />
                  <div className="flex justify-end gap-2">
                    <button type="submit" className="px-4 py-2 rounded-full bg-[#E59A19] text-white font-bold">
                      Save
                    </button>
                  </div>
                </form>
              ) : null}

              <div className="space-y-2">
                {menuItems.map((it) => (
                  <div key={it.id} className="p-2.5 rounded-2xl bg-white border border-[#EBE2D5] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={it.image} alt={it.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <div className="font-bold text-[#1C1917]">{it.name}</div>
                        <div className="text-[#78716C]">₹{it.price} · {it.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleOpenEdit(it)} className="p-1 text-[#78716C] hover:text-[#1C1917]">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${it.name}?`)) deleteMenuItem(it.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-3 text-xs">
              <h4 className="text-sm font-bold text-[#1C1917]">Business Info & Hours</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#78716C] mb-1">Name</label>
                  <input
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D4C3]"
                  />
                </div>
                <div>
                  <label className="block text-[#78716C] mb-1">Phone</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D4C3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#78716C] mb-1">Address</label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D4C3]"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset to verified defaults?')) {
                      resetToDefaults();
                      setIsAdminOpen(false);
                    }
                  }}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#D8CEBE] text-[#78716C] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#E59A19] hover:bg-[#D9880A] text-white font-bold"
                >
                  Save Settings
                </button>
              </div>
            </form>
          )}

          {/* OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-3 text-xs">
              <h4 className="text-sm font-bold text-[#1C1917]">Active Offers & Promo Codes</h4>
              {promotions.map((pr) => (
                <div key={pr.id} className="p-3 rounded-2xl bg-white border border-[#EBE2D5] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#1C1917]">{pr.title}</div>
                    <div className="text-[#78716C]">Code: {pr.code}</div>
                  </div>
                  <button
                    onClick={() => {
                      const updated = promotions.map(p => p.id === pr.id ? { ...p, active: !p.active } : p);
                      updatePromotions(updated);
                    }}
                    className={`px-3 py-1 rounded-full font-bold ${
                      pr.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {pr.active ? 'Active' : 'Off'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

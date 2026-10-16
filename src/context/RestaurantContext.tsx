import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  MenuItem,
  Category,
  CartItem,
  Order,
  Reservation,
  BusinessConfig,
  Promotion,
  OrderType,
  PaymentMethod
} from '../types/restaurant';
import {
  DEFAULT_BUSINESS_CONFIG,
  DEFAULT_CATEGORIES,
  DEFAULT_MENU_ITEMS,
  DEFAULT_PROMOTIONS
} from '../data/defaultData';

interface RestaurantContextType {
  menuItems: MenuItem[];
  categories: Category[];
  businessConfig: BusinessConfig;
  promotions: Promotion[];
  cart: CartItem[];
  orders: Order[];
  reservations: Reservation[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedItemForCustomize: MenuItem | null;
  setSelectedItemForCustomize: (item: MenuItem | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isBookModalOpen: boolean;
  setIsBookModalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  cartCount: number;
  cartSubtotal: number;
  appliedPromo: Promotion | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  addToCart: (
    item: MenuItem,
    quantity?: number,
    size?: { name: string; price: number },
    addons?: { name: string; price: number }[],
    instructions?: string
  ) => void;
  updateCartQuantity: (cartItemId: string, newQty: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  placeOrder: (details: {
    customerName: string;
    customerPhone: string;
    orderType: OrderType;
    deliveryAddress?: string;
    landmark?: string;
    preferredTime: string;
    specialInstructions?: string;
    paymentMethod: PaymentMethod;
  }) => Order;
  bookTable: (details: {
    name: string;
    phone: string;
    date: string;
    timeSlot: string;
    guests: number;
    seatingPreference: 'Indoor' | 'Cozy Corner' | 'Group Booth' | 'Any';
    specialRequest?: string;
  }) => Reservation;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateReservationStatus: (reservationId: string, status: Reservation['status']) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  updateBusinessConfig: (updates: Partial<BusinessConfig>) => void;
  updatePromotions: (promotions: Promotion[]) => void;
  resetToDefaults: () => void;
  isOpenNow: boolean;
  theme: 'chargrill-dark' | 'warm-cream';
  setTheme: (theme: 'chargrill-dark' | 'warm-cream') => void;
  toggleTheme: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'chargrill_indri_menu_v4',
  BUSINESS: 'chargrill_indri_business_v4',
  PROMOTIONS: 'chargrill_indri_promotions_v4',
  CART: 'chargrill_indri_cart_v4',
  ORDERS: 'chargrill_indri_orders_v4',
  RESERVATIONS: 'chargrill_indri_reservations_v4',
  THEME: 'chargrill_indri_theme_v5',
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with localStorage fallback
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      return saved ? JSON.parse(saved) : DEFAULT_MENU_ITEMS;
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  const [categories] = useState<Category[]>(DEFAULT_CATEGORIES);

  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BUSINESS);
      return saved ? JSON.parse(saved) : DEFAULT_BUSINESS_CONFIG;
    } catch {
      return DEFAULT_BUSINESS_CONFIG;
    }
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMOTIONS);
      return saved ? JSON.parse(saved) : DEFAULT_PROMOTIONS;
    } catch {
      return DEFAULT_PROMOTIONS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        // Seed an initial recent order for demonstration
        {
          id: 'ord-seed-1',
          orderNumber: 'CG-8401',
          createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
          customerName: 'Aman Deep',
          customerPhone: '9812345678',
          orderType: 'pickup',
          preferredTime: 'ASAP',
          paymentMethod: 'cash_on_pickup',
          items: [
            { menuItemId: 'pizza-3', name: 'Peppy Paneer Tikka Pizza', quantity: 1, sizeName: 'Medium (9")', price: 419 },
            { menuItemId: 'shakes-1', name: 'Signature Oreo Thickshake', quantity: 2, price: 258 }
          ],
          subtotal: 677,
          deliveryFee: 0,
          discount: 50,
          total: 627,
          status: 'COMPLETED',
          estimatedPrepTimeMinutes: 25
        }
      ];
    } catch {
      return [];
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'res-seed-1',
          referenceNumber: 'CG-RES-201',
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          name: 'Vikram Kamboj',
          phone: '9876543210',
          date: new Date().toISOString().split('T')[0],
          timeSlot: '08:00 PM',
          guests: 4,
          seatingPreference: 'Cozy Corner',
          specialRequest: 'Evening family dinner & birthday dessert',
          status: 'CONFIRMED'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForCustomize, setSelectedItemForCustomize] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<Promotion | null>(null);

  // Theme Mode: OG Warm Cream & Honey (default) vs Dark Bistro
  const [theme, setThemeState] = useState<'chargrill-dark' | 'warm-cream'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'chargrill-dark' || saved === 'warm-cream') return saved;
      return 'warm-cream';
    } catch {
      return 'warm-cream';
    }
  });

  const setTheme = (newTheme: 'chargrill-dark' | 'warm-cream') => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'chargrill-dark' ? 'warm-cream' : 'chargrill-dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'chargrill-dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#121110';
      document.body.style.color = '#FAF5EE';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FAF6EF';
      document.body.style.color = '#1C1917';
    }
  }, [theme]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUSINESS, JSON.stringify(businessConfig));
    } catch (e) {
      console.error(e);
    }
  }, [businessConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROMOTIONS, JSON.stringify(promotions));
    } catch (e) {
      console.error(e);
    }
  }, [promotions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  // Real-time calculation of Open / Closed status
  const isOpenNow = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    const [openH, openM] = (businessConfig.openingTime || '10:30').split(':').map(Number);
    const [closeH, closeM] = (businessConfig.closingTime || '22:00').split(':').map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
  }, [businessConfig.openingTime, businessConfig.closingTime]);

  // Cart calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    size?: { name: string; price: number },
    addons?: { name: string; price: number }[],
    instructions?: string
  ) => {
    const basePrice = size ? size.price : item.price;
    const addonsTotal = addons ? addons.reduce((acc, curr) => acc + curr.price, 0) : 0;
    const unitPrice = basePrice + addonsTotal;

    // Check if duplicate configuration already exists in cart
    const sizeName = size ? size.name : 'standard';
    const addonsKey = addons ? addons.map(a => a.name).sort().join(',') : '';
    const existingIndex = cart.findIndex(
      ci => ci.menuItem.id === item.id &&
            (ci.selectedSize?.name || 'standard') === sizeName &&
            (ci.selectedAddons?.map(a => a.name).sort().join(',') || '') === addonsKey &&
            (ci.instructions || '') === (instructions || '')
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + quantity;
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newQty,
        totalPrice: newQty * updated[existingIndex].unitPrice
      };
      setCart(updated);
    } else {
      const newCartItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        menuItem: item,
        quantity,
        selectedSize: size,
        selectedAddons: addons,
        instructions,
        unitPrice,
        totalPrice: unitPrice * quantity
      };
      setCart(prev => [...prev, newCartItem]);
    }
  };

  const updateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? { ...item, quantity: newQty, totalPrice: newQty * item.unitPrice }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const matched = promotions.find(p => p.active && p.code?.toUpperCase() === cleanCode);
    if (!matched) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cleanCode === 'CHARGRILL50' && cartSubtotal < 399) {
      return { success: false, message: 'CHARGRILL50 requires minimum order of ₹399' };
    }
    setAppliedPromo(matched);
    return { success: true, message: `Applied ${matched.title} successfully!` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const placeOrder = (details: {
    customerName: string;
    customerPhone: string;
    orderType: OrderType;
    deliveryAddress?: string;
    landmark?: string;
    preferredTime: string;
    specialInstructions?: string;
    paymentMethod: PaymentMethod;
  }): Order => {
    const deliveryFee = details.orderType === 'delivery'
      ? (cartSubtotal >= businessConfig.freeDeliveryThreshold ? 0 : businessConfig.deliveryFee)
      : 0;

    let discount = 0;
    if (appliedPromo) {
      if (appliedPromo.code === 'CHARGRILL50') {
        discount = 50;
      } else if (appliedPromo.code === 'BOGOPIZZA') {
        discount = 80;
      } else if (appliedPromo.code === 'SUNDAYTACO') {
        discount = 60;
      } else if (appliedPromo.code === 'PIZZA300') {
        discount = 50;
      } else {
        discount = 30;
      }
    }

    const total = Math.max(0, cartSubtotal + deliveryFee - discount);
    const orderNumber = `CG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: details.customerName,
      customerPhone: details.customerPhone,
      orderType: details.orderType,
      deliveryAddress: details.deliveryAddress,
      landmark: details.landmark,
      preferredTime: details.preferredTime || 'ASAP (25–35 mins)',
      specialInstructions: details.specialInstructions,
      paymentMethod: details.paymentMethod,
      items: cart.map(item => ({
        menuItemId: item.menuItem.id,
        name: item.menuItem.name,
        quantity: item.quantity,
        sizeName: item.selectedSize?.name,
        addons: item.selectedAddons?.map(a => a.name),
        price: item.totalPrice
      })),
      subtotal: cartSubtotal,
      deliveryFee,
      discount,
      total,
      status: 'NEW',
      estimatedPrepTimeMinutes: details.orderType === 'delivery' ? 35 : 20
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const bookTable = (details: {
    name: string;
    phone: string;
    date: string;
    timeSlot: string;
    guests: number;
    seatingPreference: 'Indoor' | 'Cozy Corner' | 'Group Booth' | 'Any';
    specialRequest?: string;
  }): Reservation => {
    const refNumber = `CG-RES-${Math.floor(100 + Math.random() * 900)}`;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      referenceNumber: refNumber,
      createdAt: new Date().toISOString(),
      name: details.name,
      phone: details.phone,
      date: details.date,
      timeSlot: details.timeSlot,
      guests: details.guests,
      seatingPreference: details.seatingPreference,
      specialRequest: details.specialRequest,
      status: 'PENDING'
    };

    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const updateReservationStatus = (reservationId: string, status: Reservation['status']) => {
    setReservations(prev =>
      prev.map(res => (res.id === reservationId ? { ...res, status } : res))
    );
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const updateBusinessConfig = (updates: Partial<BusinessConfig>) => {
    setBusinessConfig(prev => ({ ...prev, ...updates }));
  };

  const updatePromotions = (newPromos: Promotion[]) => {
    setPromotions(newPromos);
  };

  const resetToDefaults = () => {
    setMenuItems(DEFAULT_MENU_ITEMS);
    setBusinessConfig(DEFAULT_BUSINESS_CONFIG);
    setPromotions(DEFAULT_PROMOTIONS);
    setThemeState('warm-cream');
    localStorage.removeItem(STORAGE_KEYS.MENU);
    localStorage.removeItem(STORAGE_KEYS.BUSINESS);
    localStorage.removeItem(STORAGE_KEYS.PROMOTIONS);
    localStorage.removeItem(STORAGE_KEYS.THEME);
  };

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        categories,
        businessConfig,
        promotions,
        cart,
        orders,
        reservations,
        isCartOpen,
        setIsCartOpen,
        selectedItemForCustomize,
        setSelectedItemForCustomize,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBookModalOpen,
        setIsBookModalOpen,
        isAdminOpen,
        setIsAdminOpen,
        cartCount,
        cartSubtotal,
        appliedPromo,
        applyPromoCode,
        removePromo,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        bookTable,
        updateOrderStatus,
        updateReservationStatus,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        updateBusinessConfig,
        updatePromotions,
        resetToDefaults,
        isOpenNow,
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};

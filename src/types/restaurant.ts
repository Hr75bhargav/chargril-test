export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  priceNote?: string; // e.g. "Regular" or "Price available at cafe"
  isVeg: boolean;
  isPopular?: boolean;
  isSpecial?: boolean;
  image: string;
  available: boolean;
  toppings?: string;
  subCategory?: string;
  sizes?: { name: string; price: number }[];
  addonOptions?: { name: string; price: number }[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description?: string;
}

export interface CartItemOption {
  size?: { name: string; price: number };
  addons?: { name: string; price: number }[];
  instructions?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: { name: string; price: number };
  selectedAddons?: { name: string; price: number }[];
  instructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'pickup' | 'delivery';
export type PaymentMethod = 'upi' | 'cash_on_pickup' | 'cash_on_delivery';
export type OrderStatus = 'NEW' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  landmark?: string;
  preferredTime: string;
  specialInstructions?: string;
  paymentMethod: PaymentMethod;
  items: {
    menuItemId: string;
    name: string;
    quantity: number;
    sizeName?: string;
    addons?: string[];
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  estimatedPrepTimeMinutes: number;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED';

export interface Reservation {
  id: string;
  referenceNumber: string;
  createdAt: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingPreference: 'Indoor' | 'Cozy Corner' | 'Group Booth' | 'Any';
  specialRequest?: string;
  status: ReservationStatus;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'Google Review' | 'Local Guide';
  text: string;
  recommendedDishes?: string[];
}

export interface Promotion {
  id: string;
  title: string;
  dayText: string;
  description: string;
  code?: string;
  badge?: string;
  active: boolean;
}

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsappPhone: string;
  priceRange: string;
  googleRating: number;
  reviewCount: number;
  openingTime: string; // "10:30"
  closingTime: string; // "22:00"
  closingTimeDisplay: string; // "10:00 PM"
  openingHoursDisplay: string; // "10:30 AM – 10:00 PM"
  popularTimeNote: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl: string;
  deliveryEnabled: boolean;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minOrderAmount: number;
  deliveryAreaNotice: string;
  allowTableBooking: boolean;
  bookingNotice: string;
}

export type ThemeMode = 'chargrill-dark' | 'warm-cream';

import { MenuItem, Category, Review, Promotion, BusinessConfig } from '../types/restaurant';

export const DEFAULT_BUSINESS_CONFIG: BusinessConfig = {
  name: 'CharGrill Cafe & Pizzeria',
  legalName: 'Char Grill Cafe & Pizzeria',
  tagline: 'Pizza. Burgers. Shakes. Good Times.',
  shortDescription: 'Freshly prepared food and a casual cafe experience in the heart of Indri.',
  address: 'Near Patwar Khana, Garhi Birbal Road, Indri (Karnal)',
  landmark: 'Near Patwar Khana',
  city: 'Indri',
  state: 'Haryana',
  pincode: '132041',
  phone: '88149 44441',
  whatsappPhone: '+918814944441',
  priceRange: '₹200–₹400 per person',
  googleRating: 4.3,
  reviewCount: 343,
  openingTime: '10:30',
  closingTime: '22:00',
  closingTimeDisplay: '10:00 PM',
  openingHoursDisplay: '10:30 AM – 10:00 PM (Daily)',
  popularTimeNote: 'Peak hours around 8:00 PM',
  instagramHandle: '@char_grill_indri',
  instagramUrl: 'https://www.instagram.com/char_grill_indri/',
  facebookUrl: 'https://www.facebook.com/people/Char-Grill-Indri/100083204856012/',
  deliveryEnabled: true,
  deliveryFee: 30,
  freeDeliveryThreshold: 399,
  minOrderAmount: 170, // Official minimum delivery order
  deliveryAreaNotice: 'Fast home delivery across Indri (Minimum order ₹170). Garhi Birbal Rd, Court, Main Chowk.',
  allowTableBooking: true,
  bookingNotice: 'Table requests & Party Hall bookings (₹300/hr, free above ₹2,000) confirmed promptly on WhatsApp.'
};

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'combos', name: 'Offers & Combos', iconName: 'Tag', description: 'Wednesday BOGO, Sunday Taco, Combos & Party Hall' },
  { id: 'pizza', name: 'Pizzas', iconName: 'Pizza', description: 'Single, Double topping, Simple Veg, Veg 1, Veg 2, Veg 3' },
  { id: 'burgers', name: 'Burgers', iconName: 'Sandwich', description: 'Junior, Veggie, Cheesy, Paneer Jalapeno, Maharaja' },
  { id: 'sandwiches', name: 'Sandwiches', iconName: 'UtensilsCrossed', description: 'Veg, Corn, Cheesy, Makhni Pasta, Paneer Toast' },
  { id: 'pasta', name: 'Pasta', iconName: 'Soup', description: 'White, Red, Tandoori, Mix & Makhni sauce' },
  { id: 'fries-sides', name: 'Fries & Sides', iconName: 'Sparkles', description: 'Fries, Cheese fingers, Zingy parcel, Garlic bread' },
  { id: 'wraps-tacos', name: 'Wraps & Tacos', iconName: 'Flame', description: 'Veg & Paneer wraps, Veg & Achari tacos' },
  { id: 'chinese', name: 'Chinese Starters', iconName: 'Flame', description: 'Honey Chilli Potato, Manchurian, Chilli Paneer' },
  { id: 'noodles-maggi', name: 'Noodles & Maggi', iconName: 'UtensilsCrossed', description: 'Veg, Hakka, Cheese noodles & spicy Maggi' },
  { id: 'momos-rolls', name: 'Momos & Rolls', iconName: 'Sparkles', description: 'Kurkure momos, Paneer momos & Spring rolls' },
  { id: 'shakes-drinks', name: 'Shakes & Drinks', iconName: 'Coffee', description: 'Oreo shake, Kit Kat, Mojitos, Cold coffee & Desserts' },
  { id: 'salads', name: 'Salads', iconName: 'Sparkles', description: 'Peanut masala, Lemon salad & Saucy salad' }
];

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // ==========================================
  // SPECIAL OFFERS & COMBOS
  // ==========================================
  {
    id: 'combo-1',
    name: 'Combo 1 (Junior Burger + Fries + Coke)',
    category: 'combos',
    description: 'Value Meal: 1 Junior Burger + Salted Fries + Chilled Coke.',
    price: 100,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'combo-2',
    name: 'Combo 2 (Grilled Sandwich + Fries + Vanilla Shake)',
    category: 'combos',
    description: 'Meal Special: 1 Crisp Grilled Sandwich + Fries + Thick Chilled Vanilla Shake.',
    price: 150,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'offer-5-pizzas',
    name: 'Pizza Offer — Any 5 Single-Topping Pizzas',
    category: 'combos',
    description: 'Mega Feast: Choose any 5 Single-Topping Pizzas (Onion, Capsicum, Corn, Tomato, Soya) for just ₹300!',
    price: 300,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'party-hall',
    name: 'Party Hall Booking (Per Hour)',
    category: 'combos',
    description: 'AC party hall for birthdays & celebrations: ₹300 per hour. 100% FREE on food orders above ₹2,000!',
    price: 300,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 1. BURGERS
  // ==========================================
  {
    id: 'burger-junior',
    name: 'Junior Burger',
    category: 'burgers',
    description: 'Toasted bun with light herb potato patty and creamy dressing.',
    price: 40,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'burger-veggie',
    name: 'Veggie Burger',
    category: 'burgers',
    description: 'Crispy spiced vegetable patty, tomato slice, crunchy lettuce, and house mayo.',
    price: 50,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'burger-cheesy',
    name: 'Cheesy Burger',
    category: 'burgers',
    description: 'Crisp veg patty with a slice of melted cheese and creamy cheese sauce.',
    price: 60,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'burger-paneer-jalapeno',
    name: 'Paneer Jalapeno Burger',
    category: 'burgers',
    description: 'Tender cottage cheese patty topped with zesty jalapeños and spicy mayo.',
    price: 70,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'burger-maharaja',
    name: 'Maharaja Burger',
    category: 'burgers',
    description: 'Double stacked patties with double cheese, fresh onions, tomatoes, and smoky dressing.',
    price: 90,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'burger-chargrill',
    name: 'Char-Grill Burger',
    category: 'burgers',
    description: 'Signature supreme burger! Jumbo spiced paneer patty, melted cheese slice, grilled onion, and special sauce.',
    price: 100,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 2. SANDWICHES
  // ==========================================
  {
    id: 'sand-veg',
    name: 'Veg Sandwich',
    category: 'sandwiches',
    description: 'Fresh sliced bread filled with cucumber, tomato, capsicum, and mint chutney, toasted golden.',
    price: 60,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'sand-corn',
    name: 'Corn Sandwich',
    category: 'sandwiches',
    description: 'Sweet American corn tossed with creamy spread, herbs, and toasted crisp.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'sand-cheesy',
    name: 'Cheesy Sandwich',
    category: 'sandwiches',
    description: 'Loaded with melted mozzarella and cheddar cheese blend with oregano sprinkle.',
    price: 80,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'sand-makhni-pasta',
    name: 'Makhni Pasta Sandwich',
    category: 'sandwiches',
    description: 'Fusion delight! Rich makhni sauce penne pasta stuffed inside toasted butter bread.',
    price: 90,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'sand-paneer-jalapeno',
    name: 'Paneer Jalapeno Sandwich',
    category: 'sandwiches',
    description: 'Spiced paneer cubes with tangy pickled jalapeños, onions, and melted cheese.',
    price: 90,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'sand-paneer-toast',
    name: 'Paneer Toast',
    category: 'sandwiches',
    description: 'Thick buttered bread generously crusted with tandoori spiced paneer and herbs, grilled crisp.',
    price: 100,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 3. PASTA
  // ==========================================
  {
    id: 'pasta-white',
    name: 'White Sauce Pasta',
    category: 'pasta',
    description: 'Customer favourite! Penne pasta tossed in velvety garlic Alfredo cream with butter and herbs.',
    price: 100,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281084?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pasta-red',
    name: 'Red Sauce Pasta',
    category: 'pasta',
    description: 'Penne cooked in tangy sun-ripened tomato concassé, garlic, basil, and red chilli flakes.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pasta-tandoori',
    name: 'Tandoori Pasta',
    category: 'pasta',
    description: 'Spicy Indian fusion pasta tossed in smoky tandoori sauce with bell peppers and onions.',
    price: 110,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281084?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pasta-mix',
    name: 'Mix Sauce Pasta',
    category: 'pasta',
    description: 'Pink sauce pasta: Perfect balance of rich cream white sauce and tangy Italian tomato red sauce.',
    price: 110,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pasta-makhni',
    name: 'Makhni Pasta',
    category: 'pasta',
    description: 'Rich buttery Indian makhani gravy tossed with boiled penne, cream, and roasted spices.',
    price: 110,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281084?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 4. FRIES & SIDES
  // ==========================================
  {
    id: 'fries-small',
    name: 'Small Fries',
    category: 'fries-sides',
    description: 'Crispy salted golden potato french fries (snack size).',
    price: 50,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'fries-french',
    name: 'French Fries',
    category: 'fries-sides',
    description: 'Full portion golden crispy salted fries, hot from the fryer.',
    price: 70,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'fries-peri-peri',
    name: 'Peri-Peri Fries',
    category: 'fries-sides',
    description: 'Golden fries dusted generously with zesty African peri-peri masala.',
    price: 90,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'fries-masala',
    name: 'Masala Fries',
    category: 'fries-sides',
    description: 'Spiced chatpata masala dusted crispy french fries.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'fries-saucy',
    name: 'Saucy Fries',
    category: 'fries-sides',
    description: 'Crisp fries smothered in tangy spicy house sauces and mayonnaise drizzle.',
    price: 120,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'side-cheese-finger',
    name: 'Cheese Finger',
    category: 'fries-sides',
    description: 'Crispy breaded golden finger snacks filled with gooey melted cheese.',
    price: 130,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'side-zingy-parcel',
    name: 'Zingy Parcel',
    category: 'fries-sides',
    description: 'Golden baked flaky pastry parcel stuffed with tangy spiced creamy filling.',
    price: 40,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'side-paneer-parcel',
    name: 'Paneer Parcel',
    category: 'fries-sides',
    description: 'Baked parcel filled with tandoori spiced paneer and creamy herb sauce.',
    price: 50,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'side-garlic-bread',
    name: 'Garlic Bread',
    category: 'fries-sides',
    description: 'Toasted baguette brushed with fresh garlic herb butter.',
    price: 60,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'side-stuffed-garlic-bread',
    name: 'Stuffed Garlic Bread',
    category: 'fries-sides',
    description: 'Warm, soft freshly baked garlic bread stuffed with sweet corn, jalapeños, and gooey cheese.',
    price: 90,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'side-calzone-pocket',
    name: 'Calzone Pocket',
    category: 'fries-sides',
    description: 'Italian folded pizza pocket stuffed with mozzarella cheese, tomato marinara, and veggies.',
    price: 90,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 5. WRAPS & TACOS
  // ==========================================
  {
    id: 'wrap-veg',
    name: 'Veg Wrap',
    category: 'wraps-tacos',
    description: 'Crispy veggie filling with onions, capsicum, and creamy sauce rolled in a soft grilled tortilla.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'wrap-cheesy',
    name: 'Cheesy Wrap',
    category: 'wraps-tacos',
    description: 'Loaded with melted cheese, crispy patty strips, lettuce, and tangy dressing in a warm wrap.',
    price: 80,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'wrap-paneer',
    name: 'Paneer Wrap',
    category: 'wraps-tacos',
    description: 'Spiced marinated paneer tikka cubes with onions, capsicum, and tandoori mayo wrap.',
    price: 90,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'wrap-paneer-crunchy',
    name: 'Paneer Crunchy Wrap',
    category: 'wraps-tacos',
    description: 'Crispy batter-coated fried paneer tenders with garlic dip and fresh salad in a toasted roll.',
    price: 110,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'taco-veg',
    name: 'Veg Taco',
    category: 'wraps-tacos',
    description: 'Crispy Mexican folded taco shell filled with seasoned veggies, salsa, and melted cheese.',
    price: 90,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'taco-achari',
    name: 'Achari Taco',
    category: 'wraps-tacos',
    description: 'Crisp taco filled with spicy achari pickle flavoured stuffing and tangy creamy dressing.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'taco-paneer',
    name: 'Paneer Taco',
    category: 'wraps-tacos',
    description: 'Taco loaded with juicy spiced cottage cheese cubes, sweet corn, jalapeños, and cheese.',
    price: 120,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 6. DRINKS, COFFEE & SHAKES
  // ==========================================
  {
    id: 'drink-fruit-beer',
    name: 'Fruit Beer (Non-Alcoholic)',
    category: 'shakes-drinks',
    description: 'Sweet, fizzy, refreshing non-alcoholic fruit malt drink.',
    price: 50,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'drink-fresh-lime',
    name: 'Fresh Lime Soda',
    category: 'shakes-drinks',
    description: 'Refreshing sweet & salted fresh lime juice with chilled sparkling soda.',
    price: 60,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'drink-virgin-mojito',
    name: 'Virgin Mojito',
    category: 'shakes-drinks',
    description: 'Muddled fresh mint leaves, lime wedges, sugar syrup, and fizzy soda over crushed ice.',
    price: 70,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'drink-watermelon-mojito',
    name: 'Watermelon Mojito',
    category: 'shakes-drinks',
    description: 'Chilled watermelon syrup with fresh mint, lime, and crushed ice cooler.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'drink-spicy-mango-mojito',
    name: 'Spicy Mango Mojito',
    category: 'shakes-drinks',
    description: 'Sweet mango pulp with a fiery kick of green chilli, mint, and soda.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'drink-blueberry-mojito',
    name: 'Blue Berry Mojito',
    category: 'shakes-drinks',
    description: 'Vibrant sweet blueberry cooler muddled with fresh mint and soda.',
    price: 80,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'coffee-hot',
    name: 'Hot Coffee',
    category: 'shakes-drinks',
    description: 'Steaming hot brewed aromatic coffee with frothy milk.',
    price: 50,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'coffee-cold',
    name: 'Cold Coffee',
    category: 'shakes-drinks',
    description: 'Smooth blended iced espresso with chilled whole milk and chocolate drizzle.',
    price: 80,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'shake-vanilla',
    name: 'Vanilla Shake',
    category: 'shakes-drinks',
    description: 'Classic rich and creamy Madagascar vanilla milkshake.',
    price: 60,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'shake-chocolate',
    name: 'Chocolate Shake',
    category: 'shakes-drinks',
    description: 'Thick creamy chocolate gelato blended with chilled milk and syrup.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'shake-strawberry',
    name: 'Strawberry Shake',
    category: 'shakes-drinks',
    description: 'Sweet pink strawberry milkshake blended smooth.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'shake-butterscotch',
    name: 'Butterscotch Shake',
    category: 'shakes-drinks',
    description: 'Crunchy butterscotch praline and caramel blended with rich milk.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'shake-oreo',
    name: 'Oreo Shake',
    category: 'shakes-drinks',
    description: 'Crowd favourite! Crumbled Oreo cookies blended with vanilla ice cream and chocolate fudge.',
    price: 80,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    available: true,
    addonOptions: [{ name: 'Extra Ice Cream Scoop', price: 15 }]
  },
  {
    id: 'shake-kitkat',
    name: 'Kit Kat Shake',
    category: 'shakes-drinks',
    description: 'Crispy Kit Kat wafer bars blended into rich creamy chocolate shake.',
    price: 80,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    available: true,
    addonOptions: [{ name: 'Extra Ice Cream Scoop', price: 15 }]
  },
  {
    id: 'shake-black-currant',
    name: 'Black Current Shake',
    category: 'shakes-drinks',
    description: 'Fruity black currant shake with intense berry flavours.',
    price: 90,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'dessert-chocolava',
    name: 'Chocolava',
    category: 'shakes-drinks',
    description: 'Warm chocolate cake with a molten liquid chocolate fudge center.',
    price: 70,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'dessert-chocolava-icecream',
    name: 'Chocolava with Ice Cream',
    category: 'shakes-drinks',
    description: 'Hot molten chocolava cake paired with a scoop of chilled vanilla ice cream.',
    price: 90,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 7. PIZZAS (A. Single-Topping)
  // ==========================================
  {
    id: 'pizza-soya',
    name: 'Soya Pizza (Single-Topping)',
    category: 'pizza',
    subCategory: 'Single-Topping',
    description: 'Fresh dough base baked with juicy soya chunks and melted mozzarella cheese.',
    price: 49,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pizza-onion',
    name: 'Onion Pizza (Single-Topping)',
    category: 'pizza',
    subCategory: 'Single-Topping',
    description: 'Fresh dough base topped with crunchy sliced red onions and mozzarella.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pizza-capsicum',
    name: 'Capsicum Pizza (Single-Topping)',
    category: 'pizza',
    subCategory: 'Single-Topping',
    description: 'Crisp green bell peppers on fresh tomato herb sauce and mozzarella.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pizza-corn',
    name: 'Corn Pizza (Single-Topping)',
    category: 'pizza',
    subCategory: 'Single-Topping',
    description: 'Sweet golden corn kernels with 100% mozzarella on hand-kneaded crust.',
    price: 70,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'pizza-tomato',
    name: 'Tomato Pizza (Single-Topping)',
    category: 'pizza',
    subCategory: 'Single-Topping',
    description: 'Juicy sliced red tomatoes and Italian herbs with bubbling cheese.',
    price: 70,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // PIZZAS (B. Double-Topping)
  // ==========================================
  {
    id: 'pizza-onion-capsicum',
    name: 'Onion & Capsicum Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Classic combo of crunchy onions and crisp green capsicum.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 80 },
      { name: 'Medium', price: 220 }
    ],
    addonOptions: [
      { name: 'Cheese Burst', price: 50 },
      { name: 'Extra Cheese', price: 30 }
    ]
  },
  {
    id: 'pizza-capsicum-corn',
    name: 'Capsicum & Corn Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Sweet American corn paired with fresh green capsicum.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 80 },
      { name: 'Medium', price: 220 }
    ]
  },
  {
    id: 'pizza-onion-jalapeno',
    name: 'Onion & Jalapeno Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Crisp red onions with spicy tangy sliced jalapeños.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 80 },
      { name: 'Medium', price: 220 }
    ]
  },
  {
    id: 'pizza-onion-corn',
    name: 'Onion & Corn Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Sweet corn and diced red onions baked on mozzarella cheese.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 80 },
      { name: 'Medium', price: 220 }
    ]
  },
  {
    id: 'pizza-corn-mushroom',
    name: 'Corn & Mushroom Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Juicy button mushrooms and sweet golden corn.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 80 },
      { name: 'Medium', price: 220 }
    ]
  },
  {
    id: 'pizza-paneer-onion',
    name: 'Paneer & Onion Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Tender cottage cheese cubes with red onions on fresh tomato sauce.',
    price: 100,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 100 },
      { name: 'Medium', price: 240 }
    ]
  },
  {
    id: 'pizza-corn-paneer',
    name: 'Corn & Paneer Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Sweet corn kernels and fresh malai paneer with mozzarella.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 100 },
      { name: 'Medium', price: 240 }
    ]
  },
  {
    id: 'pizza-capsicum-paneer',
    name: 'Capsicum & Paneer Pizza',
    category: 'pizza',
    subCategory: 'Double-Topping',
    description: 'Crisp green capsicum and spiced cottage cheese cubes.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 100 },
      { name: 'Medium', price: 240 }
    ]
  },

  // ==========================================
  // PIZZAS (C. Simple Veg Pizza)
  // ==========================================
  {
    id: 'pizza-margherita',
    name: 'Margherita Pizza',
    category: 'pizza',
    subCategory: 'Simple Veg',
    description: '100% Mozzarella cheese on classic Italian herb marinara and fresh dough.',
    price: 100,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 100 },
      { name: 'Medium', price: 200 },
      { name: 'Large', price: 320 }
    ],
    addonOptions: [
      { name: 'Cheese Burst', price: 50 },
      { name: 'Extra Cheese', price: 30 }
    ]
  },
  {
    id: 'pizza-cheese-corn',
    name: 'Cheese & Corn Pizza',
    category: 'pizza',
    subCategory: 'Simple Veg',
    description: 'Double cheese with juicy sweet American corn on hand-stretched base.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 100 },
      { name: 'Medium', price: 200 },
      { name: 'Large', price: 320 }
    ]
  },
  {
    id: 'pizza-cheese-mushroom',
    name: 'Cheese & Mushroom Pizza',
    category: 'pizza',
    subCategory: 'Simple Veg',
    description: 'Sliced button mushrooms smothered in melted mozzarella cheese.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 100 },
      { name: 'Medium', price: 200 },
      { name: 'Large', price: 320 }
    ]
  },

  // ==========================================
  // PIZZAS (D. Veg 1 Pizza)
  // ==========================================
  {
    id: 'pizza-double-cheese',
    name: 'Double Cheese Pizza',
    category: 'pizza',
    subCategory: 'Veg 1',
    description: 'Loaded with double layers of bubbling mozzarella and liquid cheese.',
    price: 150,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 150 },
      { name: 'Medium', price: 280 },
      { name: 'Large', price: 380 }
    ],
    addonOptions: [
      { name: 'Cheese Burst', price: 50 },
      { name: 'Extra Cheese', price: 30 }
    ]
  },
  {
    id: 'pizza-farmhouse',
    name: 'Farm House Pizza',
    category: 'pizza',
    subCategory: 'Veg 1',
    toppings: 'Onion, Capsicum, Tomato, Mushroom',
    description: 'Toppings: Crisp onion, capsicum, ripe tomato, and fresh button mushrooms.',
    price: 150,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 150 },
      { name: 'Medium', price: 280 },
      { name: 'Large', price: 380 }
    ]
  },
  {
    id: 'pizza-spicy-tangy',
    name: 'Spicy Tangy Pizza',
    category: 'pizza',
    subCategory: 'Veg 1',
    toppings: 'Corn, Jalapeno, Red Paprika',
    description: 'Toppings: Sweet corn, tangy jalapeños, and fiery red paprika.',
    price: 150,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 150 },
      { name: 'Medium', price: 280 },
      { name: 'Large', price: 380 }
    ]
  },
  {
    id: 'pizza-malai-chaap',
    name: 'Malai Chaap Pizza',
    category: 'pizza',
    subCategory: 'Veg 1',
    toppings: 'Onion, Chaap',
    description: 'Toppings: Tender malai soya chaap pieces and red onions.',
    price: 150,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 150 },
      { name: 'Medium', price: 280 },
      { name: 'Large', price: 380 }
    ]
  },
  {
    id: 'pizza-paneer-makhani',
    name: 'Paneer Makhani Pizza',
    category: 'pizza',
    subCategory: 'Veg 1',
    toppings: 'Onion, Capsicum, Paneer',
    description: 'Toppings: Rich makhani sauce base with soft paneer, onion, and capsicum.',
    price: 150,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 150 },
      { name: 'Medium', price: 280 },
      { name: 'Large', price: 380 }
    ]
  },

  // ==========================================
  // PIZZAS (E. Veg 2 Pizza)
  // ==========================================
  {
    id: 'pizza-kadhai-paneer',
    name: 'Kadhai Paneer Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Onion, Capsicum, Paneer',
    description: 'Toppings: Kadhai masala marinated cottage cheese, onion, and bell peppers.',
    price: 180,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },
  {
    id: 'pizza-tandoori-paneer-tikka',
    name: 'Tandoori Paneer Tikka Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Capsicum, Paneer',
    description: 'Toppings: Char-grilled tandoori paneer tikka cubes, capsicum, and herbs.',
    price: 180,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },
  {
    id: 'pizza-kadhai-chaap',
    name: 'Kadhai Chaap Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Jalapeno, Capsicum, Chaap',
    description: 'Toppings: Soya chaap tossed in kadhai spice, jalapeño, and capsicum.',
    price: 180,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },
  {
    id: 'pizza-tandoori-chaap',
    name: 'Tandoori Chaap Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Jalapeno, Onion, Chaap',
    description: 'Toppings: Tandoori roasted soya chaap, jalapeño slices, and onions.',
    price: 180,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },
  {
    id: 'pizza-spicy-paneer',
    name: 'Spicy Paneer Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Capsicum, Red Paprika, Paneer',
    description: 'Toppings: Fiery spiced paneer, crispy capsicum, and hot red paprika.',
    price: 180,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },
  {
    id: 'pizza-indo-tandoori',
    name: 'Indo Tandoori Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Tandoori Paneer, Capsicum, Red Paprika, Mushroom',
    description: 'Toppings: Tandoori paneer, fresh mushrooms, capsicum, and red paprika.',
    price: 180,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },
  {
    id: 'pizza-achari',
    name: 'Achari Pizza',
    category: 'pizza',
    subCategory: 'Veg 2',
    toppings: 'Corn, Jalapeno, Red Paprika',
    description: 'Toppings: Tangy achari flavoured sauce with sweet corn, jalapeño, and paprika.',
    price: 180,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 180 },
      { name: 'Medium', price: 320 },
      { name: 'Large', price: 460 }
    ]
  },

  // ==========================================
  // PIZZAS (F. Veg 3 Pizza)
  // ==========================================
  {
    id: 'pizza-veggie-deluxe',
    name: 'Veggie Deluxe Pizza',
    category: 'pizza',
    subCategory: 'Veg 3',
    toppings: 'Onion, Capsicum, Corn, Mushroom, Paneer',
    description: 'Toppings: Five premium veggies — Onion, capsicum, sweet corn, mushrooms, and paneer.',
    price: 200,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 200 },
      { name: 'Medium', price: 350 },
      { name: 'Large', price: 500 }
    ]
  },
  {
    id: 'pizza-veg-mexican',
    name: 'Veg Mexican Pizza',
    category: 'pizza',
    subCategory: 'Veg 3',
    toppings: 'Onion, Capsicum, Tomato, Jalapeno',
    description: 'Toppings: Mexican herb seasoning, onion, capsicum, ripe tomato, and jalapeños.',
    price: 200,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 200 },
      { name: 'Medium', price: 350 },
      { name: 'Large', price: 500 }
    ]
  },
  {
    id: 'pizza-gourmet',
    name: 'Gourmet Pizza',
    category: 'pizza',
    subCategory: 'Veg 3',
    toppings: 'Corn, Jalapeno, Black Olive, Extra Cheese',
    description: 'Toppings: Sweet corn, tangy jalapeños, imported black olives, and double extra cheese.',
    price: 200,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 200 },
      { name: 'Medium', price: 350 },
      { name: 'Large', price: 500 }
    ]
  },
  {
    id: 'pizza-veggie-paradise',
    name: 'Veggie Paradise Pizza',
    category: 'pizza',
    subCategory: 'Veg 3',
    toppings: 'Corn, Jalapeno, Mushroom, Black Olives, Tomato, Extra Cheese',
    description: 'Toppings: Golden corn, jalapeños, mushrooms, black olives, tomato, and extra cheese.',
    price: 200,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 200 },
      { name: 'Medium', price: 350 },
      { name: 'Large', price: 500 }
    ]
  },
  {
    id: 'pizza-veggie-loaded',
    name: 'Veggie Loaded Pizza',
    category: 'pizza',
    subCategory: 'Veg 3',
    toppings: 'Onion, Capsicum, Tomato, Mushroom, Corn, Olives, Jalapeno, Extra Cheese',
    description: 'The ultimate supreme! Every single vegetable topping with generous extra mozzarella cheese.',
    price: 200,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
    available: true,
    sizes: [
      { name: 'Regular', price: 200 },
      { name: 'Medium', price: 350 },
      { name: 'Large', price: 500 }
    ],
    addonOptions: [
      { name: 'Cheese Burst', price: 50 },
      { name: 'Extra Cheese', price: 30 }
    ]
  },

  // ==========================================
  // 8. CHINESE STARTERS & MAIN COURSE
  // ==========================================
  {
    id: 'main-chilli-potato',
    name: 'Chilli Potato',
    category: 'chinese',
    description: 'Crispy potato fingers tossed with capsicum, onion, and chilli garlic glaze.',
    price: 130,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-crispy-corn',
    name: 'Crispy Corn',
    category: 'chinese',
    description: 'Golden fried sweet corn kernels tossed with lemon, chatpata masala, and scallions.',
    price: 140,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-honey-chilli-potato',
    name: 'Honey Chilli Potato',
    category: 'chinese',
    description: 'CharGrill bestseller! Crispy potato fingers glazed in honey, chilli garlic paste, and sesame seeds.',
    price: 150,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-chilli-mushroom',
    name: 'Chilli Mushroom',
    category: 'chinese',
    description: 'Tender batter-fried button mushrooms tossed in spicy Indo-Chinese dark sauce.',
    price: 150,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-chilli-chana',
    name: 'Chilli Chana',
    category: 'chinese',
    description: 'Crispy fried chickpeas tossed with green chillies, garlic, and oriental spices.',
    price: 150,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-manchurian',
    name: 'Manchurian (Dry / Gravy)',
    category: 'chinese',
    description: 'Crispy minced vegetable balls cooked in ginger, garlic, green chilli, and soy glaze.',
    price: 150,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-chilli-paneer',
    name: 'Chilli Paneer (Dry / Gravy)',
    category: 'chinese',
    description: 'Succulent malai paneer cubes tossed with bell peppers, onions, and spicy Sichuan sauce.',
    price: 180,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-mushroom-duplex',
    name: 'Mushroom Duplex',
    category: 'chinese',
    description: 'Crispy breaded button mushrooms stuffed with spiced cheese and herbs.',
    price: 150,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-channa-chaat',
    name: 'Channa Chaat',
    category: 'chinese',
    description: 'Zesty boiled kabuli chana with chopped onions, tomatoes, lemon, and tangy chaat masala.',
    price: 130,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-chilli-chaap',
    name: 'Chilli Chaap',
    category: 'chinese',
    description: 'Fried soya chaap fingers tossed in spicy wok with capsicum, onion, and chilli garlic sauce.',
    price: 150,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'main-manchurian-noodle',
    name: 'Manchurian & Noodle Combo',
    category: 'chinese',
    description: 'Classic meal bowl: Veg Hakka noodles served with savoury Veg Manchurian balls.',
    price: 150,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 9. NOODLES & MAGGI
  // ==========================================
  {
    id: 'maggi-veg',
    name: 'Veg Maggi',
    category: 'noodles-maggi',
    description: 'Steaming hot Maggi noodles cooked with chopped onions, capsicum, and peas.',
    price: 50,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'maggi-punjabi',
    name: 'Punjabi Maggi',
    category: 'noodles-maggi',
    description: 'Spicy street-style Maggi prepared with authentic Punjabi butter tadka.',
    price: 60,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'maggi-paneer',
    name: 'Paneer Maggi',
    category: 'noodles-maggi',
    description: 'Loaded with soft cottage cheese (paneer) cubes, butter, and extra herbs.',
    price: 70,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'noodle-veg',
    name: 'Veg Noodle',
    category: 'noodles-maggi',
    description: 'Wok tossed noodles with shredded cabbage, carrots, bell peppers, and light soy sauce.',
    price: 90,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'noodle-chilli-garlic',
    name: 'Chilli Garlic Noodle',
    category: 'noodles-maggi',
    description: 'Spicy noodles stir-fried with crushed red chillies, charred garlic flakes, and scallions.',
    price: 100,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'noodle-hakka',
    name: 'Veg Hakka Noodle',
    category: 'noodles-maggi',
    description: 'Traditional Hakka eggless noodles tossed on blazing wok with crisp julienned vegetables.',
    price: 120,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'noodle-cheese',
    name: 'Cheese Noodle',
    category: 'noodles-maggi',
    description: 'Sizzling noodles crowned with a thick layer of melted cheese and Italian seasonings.',
    price: 150,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 10. MOMOS & SPRING ROLLS
  // ==========================================
  {
    id: 'momo-veggie-lite',
    name: 'Veggie Lite Momos (6 Pcs)',
    category: 'momos-rolls',
    description: 'Delicate steamed dumplings stuffed with finely minced vegetables and ginger.',
    price: 80,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=80',
    available: true,
    addonOptions: [{ name: 'Extra Dip', price: 10 }]
  },
  {
    id: 'momo-paneer',
    name: 'Paneer Momos (6 Pcs)',
    category: 'momos-rolls',
    description: 'Steamed dumplings packed with spiced malai paneer, served with spicy red chutney.',
    price: 100,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80',
    available: true,
    addonOptions: [{ name: 'Extra Dip', price: 10 }]
  },
  {
    id: 'momo-kurkure',
    name: 'Crunchy Kurkure Momos (6 Pcs)',
    category: 'momos-rolls',
    description: 'Super crunchy! Momos rolled in seasoned Kurkure coating and deep fried golden.',
    price: 120,
    isVeg: true,
    isPopular: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=80',
    available: true,
    addonOptions: [{ name: 'Extra Dip', price: 10 }]
  },
  {
    id: 'momo-paneer-kurkure',
    name: 'Paneer Kurkure Momos (6 Pcs)',
    category: 'momos-rolls',
    description: 'Paneer dumplings coated with loud crunchy crust, served with garlic dip and red chutney.',
    price: 140,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=700&q=80',
    available: true,
    addonOptions: [{ name: 'Extra Dip', price: 10 }]
  },
  {
    id: 'roll-veg',
    name: 'Veg Spring Roll',
    category: 'momos-rolls',
    description: 'Golden fried pastry rolls stuffed with sautéed Chinese vegetables.',
    price: 100,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'roll-paneer',
    name: 'Paneer Spring Roll',
    category: 'momos-rolls',
    description: 'Crispy rolls filled with seasoned paneer shreds and veggies.',
    price: 120,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'roll-kurkure',
    name: 'Kurkure Spring Roll',
    category: 'momos-rolls',
    description: 'Spring roll coated in extra crunchy Kurkure batter for maximum crunch.',
    price: 140,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'roll-paneer-kurkure',
    name: 'Paneer Kurkure Spring Roll',
    category: 'momos-rolls',
    description: 'Paneer stuffed spring roll in crunchy batter crust with house dips.',
    price: 160,
    isVeg: true,
    isSpecial: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    available: true
  },

  // ==========================================
  // 11. SALADS
  // ==========================================
  {
    id: 'salad-peanut',
    name: 'Peanut Masala',
    category: 'salads',
    description: 'Roasted crunchy peanuts tossed with onions, tomatoes, green chillies, and lemon juice.',
    price: 80,
    isVeg: true,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'salad-lemon',
    name: 'Lemon Salad',
    category: 'salads',
    description: 'Crisp cucumbers, juicy tomatoes, onions, and carrots with fresh lemon dressing.',
    price: 110,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    available: true
  },
  {
    id: 'salad-saucy',
    name: 'Saucy Salad',
    category: 'salads',
    description: 'Fresh chopped vegetable salad tossed in creamy Italian herb and mayo dressing.',
    price: 110,
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    available: true
  }
];

export const DEFAULT_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-wed-bogo',
    title: 'Wednesday BOGO Pizza',
    dayText: 'Every Wednesday',
    description: 'Buy 1 Medium Pizza and get 1 Medium Pizza completely FREE! Authentic CharGrill tradition.',
    badge: 'Wednesday BOGO',
    code: 'BOGOPIZZA',
    active: true
  },
  {
    id: 'promo-sun-taco',
    title: 'Sunday Free Taco Offer',
    dayText: 'Every Sunday',
    description: 'Buy any medium or large pizza with a 750 ml soft drink and get a Veg Taco completely free!',
    badge: 'Sunday Special',
    code: 'SUNDAYTACO',
    active: true
  },
  {
    id: 'promo-5-pizzas',
    title: 'Any 5 Single-Topping Pizzas for ₹300',
    dayText: 'All Week Offer',
    description: 'Choose any 5 Single-Topping Pizzas for just ₹300! Unbeatable group value meal in Indri.',
    badge: '₹300 Feast',
    code: 'PIZZA300',
    active: true
  },
  {
    id: 'promo-party-hall',
    title: 'Party Hall ₹300/hr (Free > ₹2,000)',
    dayText: 'Birthdays & Events',
    description: 'Private AC party hall: ₹300 per hour, or 100% FREE on food orders above ₹2,000.',
    badge: 'Party Hall',
    code: 'PARTYHALL',
    active: true
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Rudra Mandhan',
    rating: 5,
    date: 'Verified Google Review',
    source: 'Google Review',
    text: 'Highly recommended for vegetarians as the entire menu is pure veg. Honey chilli potato, kurkure momos, and pizza are fantastic. Cool atmosphere to sit with friends in Indri.',
    recommendedDishes: ['Honey Chilli Potato', 'Crunchy Kurkure Momos']
  },
  {
    id: 'rev-2',
    author: 'Siruuu Kamboj',
    rating: 5,
    date: 'Verified Google Review',
    source: 'Google Review',
    text: 'Prompt service and the pizza base is clearly fresh dough. Wednesday BOGO offer is unbeatable. Highly recommend!',
    recommendedDishes: ['Tandoori Paneer Tikka Pizza', 'Cheese Noodle']
  },
  {
    id: 'rev-3',
    author: 'Divyam Dhiman',
    rating: 4,
    date: 'Verified Google Review',
    source: 'Google Review',
    text: 'Good place near Patwar Khana on Garhi Birbal Road. Shakes are thick and tasty, especially the Oreo shake. Very reasonable prices between ₹200-₹400.',
    recommendedDishes: ['Oreo Shake', 'Combo 1 (₹100)']
  }
];

export const INSTAGRAM_HIGHLIGHTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    caption: 'Any 5 Single-Topping Pizzas for just ₹300! Best pizza deal in Indri 🍕 #CharGrillIndri',
    likes: '284',
    tag: '#5Pizzas300'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
    caption: 'Crunchy Kurkure Momos (₹120) with spicy red dip & garlic mayo! 🥟✨',
    likes: '342',
    tag: '#KurkureMomos'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    caption: 'Combo 1 (Junior Burger + Fries + Coke) for just ₹100! 🍔🍟',
    likes: '419',
    tag: '#Combo1'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    caption: 'Sizzling Chilli Garlic Noodles & Manchurian bowl on Garhi Birbal Road 🍜',
    likes: '390',
    tag: '#ChilliGarlicNoodles'
  }
];

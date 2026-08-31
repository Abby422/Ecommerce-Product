// Re-exported from the modules that own each slice of the demo data.
export { CATEGORIES, PRODUCTS, PROMO_CODES, SHIPPING_METHODS, FREE_SHIPPING_THRESHOLD } from './catalogue';
export { REVIEWS, reviewDate } from './reviews';
export { IMG } from './images';

export const USERS = [
  {
    User_Id: 1,
    Name: 'Abigail Theuri',
    userName: 'abby422',
    Email: 'admin@spacejoy.demo',
    User_role: 'Admin',
    IsDeleted: false,
    password: 'demo1234',
  },
  {
    User_Id: 2,
    Name: 'Jordan Mwangi',
    userName: 'jordanm',
    Email: 'shopper@spacejoy.demo',
    User_role: 'User',
    IsDeleted: false,
    password: 'demo1234',
  },
  {
    User_Id: 3,
    Name: 'Priya Raman',
    userName: 'priyar',
    Email: 'priya@example.com',
    User_role: 'User',
    IsDeleted: false,
    password: 'demo1234',
  },
  {
    User_Id: 4,
    Name: 'Sam Otieno',
    userName: 'samo',
    Email: 'sam@example.com',
    User_role: 'User',
    IsDeleted: false,
    password: 'demo1234',
  },
];

export const DEMO_ADMIN = { email: 'admin@spacejoy.demo', password: 'demo1234' };
export const DEMO_SHOPPER = { email: 'shopper@spacejoy.demo', password: 'demo1234' };

// A little order history, so the admin dashboard and the account page have
// something to show on a first visit.
export const SEED_ORDERS = [
  {
    id: 'SJ-24019',
    userId: 2,
    placedDaysAgo: 4,
    status: 'In transit',
    items: [
      { Product_id: 20, Product_name: 'Ceramic Pendant Light', quantity: 2, Product_price: 185 },
      { Product_id: 16, Product_name: 'Oak Cutting Board', quantity: 1, Product_price: 95 },
    ],
    shipping: 12,
    discount: 0,
  },
  {
    id: 'SJ-23884',
    userId: 2,
    placedDaysAgo: 26,
    status: 'Delivered',
    items: [
      { Product_id: 9, Product_name: 'Washed Linen Bedding Set', quantity: 1, Product_price: 260 },
    ],
    shipping: 12,
    discount: 26,
  },
  {
    id: 'SJ-23640',
    userId: 3,
    placedDaysAgo: 58,
    status: 'Delivered',
    items: [
      { Product_id: 2, Product_name: 'Emerald Velvet Sofa', quantity: 1, Product_price: 1180 },
      { Product_id: 7, Product_name: 'Handwoven Wool Rug', quantity: 1, Product_price: 520 },
    ],
    shipping: 0,
    discount: 170,
  },
];

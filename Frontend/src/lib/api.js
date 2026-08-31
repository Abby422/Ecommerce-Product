// The single place the app talks to a server.
//
// If VITE_API_URL is set the calls go to the real Express backend. If it is not
// — the deployed portfolio build — they resolve against the bundled demo
// database instead. Components only ever see the resolved data, so nothing
// downstream needs to know which mode is active.

import axios from 'axios';
import { demoDb } from './demo/store';

const API_URL = import.meta.env.VITE_API_URL?.trim();
const AUTH_URL = import.meta.env.VITE_AUTH_URL?.trim() || API_URL;

export const IS_DEMO = !API_URL;

const TOKEN_KEY = 'spacejoy.token';

export const tokenStore = {
  get: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      token ? localStorage.setItem(TOKEN_KEY, token) : localStorage.removeItem(TOKEN_KEY);
    } catch {
      // Storage unavailable; the token stays in Redux for this page view only.
    }
  },
};

function client(baseURL) {
  const instance = axios.create({ baseURL, timeout: 15000 });
  // The old code never sent the JWT it worked so hard to issue.
  instance.interceptors.request.use((config) => {
    const token = tokenStore.get();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
}

const shop = API_URL ? client(API_URL) : null;
const auth = AUTH_URL ? client(AUTH_URL) : null;

// A touch of latency so loading states are visible rather than flashing.
const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

async function demo(fn, ms) {
  await delay(ms);
  return fn();
}

export const api = {
  // ---- catalogue -------------------------------------------------------
  async getProducts({ pageNumber = 1, rowNumber = 12, sort = 'featured', ...filters } = {}) {
    if (IS_DEMO) return demo(() => demoDb.listProducts({ pageNumber, rowNumber, sort, ...filters }));
    // The backend exposes this as POST and expects the paging window in the body.
    const { data } = await shop.post('/allProducts', { pageNumber, rowNumber, sort, ...filters });
    return { items: data?.data ?? [], total: data?.total ?? (data?.data?.length ?? 0) };
  },

  async getFacets() {
    if (IS_DEMO) return demo(() => demoDb.facets(), 80);
    const { data } = await shop.get('/facets');
    return data?.data ?? { counts: {}, minPrice: 0, maxPrice: 0 };
  },

  async searchProducts(query) {
    if (IS_DEMO) return demo(() => demoDb.searchProducts(query));
    const { data } = await shop.get('/search', { params: { query } });
    return data?.Data ?? [];
  },

  async suggest(query) {
    // Deliberately quick: this fires while the shopper is still typing.
    if (IS_DEMO) return demo(() => demoDb.suggest(query), 90);
    const { data } = await shop.get('/search', { params: { query, limit: 6 } });
    return (data?.Data ?? []).slice(0, 6);
  },

  async getProduct(id) {
    if (IS_DEMO) return demo(() => demoDb.getProduct(id));
    const { data } = await shop.get(`/product/${id}`);
    return data?.data?.[0] ?? null;
  },

  async getRelated(id) {
    if (IS_DEMO) return demo(() => demoDb.relatedProducts(id), 120);
    const { data } = await shop.get(`/product/${id}/related`);
    return data?.data ?? [];
  },

  async getReviews(id) {
    if (IS_DEMO) return demo(() => demoDb.reviewsFor(id), 120);
    const { data } = await shop.get(`/product/${id}/reviews`);
    return data?.data ?? [];
  },

  async addReview(review) {
    if (IS_DEMO) return demo(() => demoDb.addReview(review));
    const { data } = await shop.post(`/product/${review.productId}/reviews`, review);
    return data;
  },

  // ---- recently viewed / wishlist --------------------------------------
  recordView(id) {
    if (IS_DEMO) demoDb.recordView(id);
  },

  async getRecentlyViewed(excludeId) {
    if (IS_DEMO) return demo(() => demoDb.recentlyViewed(excludeId), 60);
    return [];
  },

  async getWishlist() {
    if (IS_DEMO) return demo(() => demoDb.wishlist(), 80);
    const { data } = await shop.get('/wishlist');
    return data?.data ?? [];
  },

  getWishlistIds() {
    return IS_DEMO ? demoDb.wishlistIds() : [];
  },

  async toggleWishlist(id) {
    if (IS_DEMO) return demo(() => demoDb.toggleWishlist(id), 60);
    const { data } = await shop.post('/wishlist', { id });
    return data;
  },

  // ---- checkout --------------------------------------------------------
  async getShippingMethods() {
    if (IS_DEMO) return demo(() => demoDb.shippingMethods(), 80);
    const { data } = await shop.get('/shipping');
    return data?.data ?? [];
  },

  getFreeShippingThreshold() {
    return IS_DEMO ? demoDb.freeShippingThreshold() : 500;
  },

  async applyPromo(code) {
    if (IS_DEMO) return demo(() => demoDb.validatePromo(code), 300);
    const { data } = await shop.post('/promo', { code });
    return data;
  },

  async placeOrder(order) {
    if (IS_DEMO) return demo(() => demoDb.createOrder(order), 700);
    const { data } = await shop.post('/checkout', order);
    return data;
  },

  async getOrders(userId) {
    if (IS_DEMO) return demo(() => demoDb.ordersFor(userId));
    const { data } = await shop.get('/orders');
    return data?.data ?? [];
  },

  async getOrder(id) {
    if (IS_DEMO) return demo(() => demoDb.getOrder(id));
    const { data } = await shop.get(`/orders/${id}`);
    return data?.data ?? null;
  },

  // ---- auth ------------------------------------------------------------
  async login({ email, password }) {
    if (IS_DEMO) {
      return demo(() => {
        const user = demoDb.findUserByEmail(email);
        if (!user) throw Object.assign(new Error('Email not found, please sign up'), { status: 404 });
        if (user.password !== password) {
          throw Object.assign(new Error('Wrong password, try again'), { status: 403 });
        }
        const { password: _password, ...safe } = user;
        return { user: safe, email: user.Email, role: user.User_role, token: `demo.${user.User_Id}` };
      });
    }
    const { data } = await auth.post('/login', { email, password });
    return data;
  },

  async register({ userName, email, Name, password }) {
    if (IS_DEMO) {
      return demo(() => {
        const user = demoDb.registerUser({ userName, email, Name, password });
        return { user, email: user.Email, role: user.User_role, token: `demo.${user.User_Id}` };
      });
    }
    const { data } = await auth.post('/register', { userName, email, Name, password });
    return data;
  },

  async adminLogin({ email, password }) {
    if (IS_DEMO) {
      const result = await this.login({ email, password });
      if (result.role !== 'Admin') {
        throw Object.assign(new Error('That account is not an administrator'), { status: 403 });
      }
      return result;
    }
    // Route name is /adminLogin — the old client called /adminogin and 404'd.
    const { data } = await auth.post('/adminLogin', { email, password });
    return data;
  },

  async getUsers() {
    if (IS_DEMO) return demo(() => demoDb.listUsers());
    const { data } = await auth.get('/getAllUsers');
    return data?.data ?? [];
  },

  // ---- admin -----------------------------------------------------------
  async getAdminProducts() {
    if (IS_DEMO) return demo(() => demoDb.listAdminProducts());
    const { data } = await shop.get('/adminProducts');
    return data?.data ?? [];
  },

  async addProduct(product) {
    if (IS_DEMO) return demo(() => demoDb.addProduct(product));
    const { data } = await shop.post('/addProduct', product);
    return data;
  },

  async getOneProduct(id) {
    if (IS_DEMO) return demo(() => demoDb.getProduct(id));
    const { data } = await shop.get(`/getOneProduct/${id}`);
    return data?.data ?? null;
  },

  async updateProduct(product) {
    if (IS_DEMO) return demo(() => demoDb.updateProduct(product));
    const { data } = await shop.post('/updateProduct', product);
    return data;
  },

  async deleteProduct(id) {
    if (IS_DEMO) return demo(() => demoDb.deleteProduct(id));
    const { data } = await shop.post('/deleteProduct', { id });
    return data;
  },

  async setAdmin({ userID, role }) {
    if (IS_DEMO) return demo(() => demoDb.setRole(userID, role));
    const { data } = await shop.post('/setAdmin', { userID, role });
    return data;
  },

  async getStats() {
    if (IS_DEMO) return demo(() => demoDb.stats());
    const products = await this.getAdminProducts();
    return {
      products: products.length,
      inventoryValue: products.reduce((sum, p) => sum + p.Product_price * p.Quantity, 0),
      orders: 0,
      revenue: 0,
      users: (await this.getUsers()).length,
      lowStock: products.filter((p) => p.Quantity > 0 && p.Quantity <= 5).length,
      outOfStock: products.filter((p) => p.Quantity === 0).length,
    };
  },

  async getRecentOrders(limit = 5) {
    if (IS_DEMO) return demo(() => demoDb.recentOrders(limit));
    const { data } = await shop.get('/orders', { params: { limit } });
    return data?.data ?? [];
  },
};

// Turns an axios error, a thrown demo error, or anything else into a string a
// component can put on screen.
export function errorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback;
  return (
    error.response?.data?.message ||
    error.response?.data?.Message ||
    error.message ||
    fallback
  );
}

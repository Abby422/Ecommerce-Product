// An in-memory database for demo mode, mirrored into localStorage so that admin
// edits, orders and wishlists survive a refresh. Everything here is per-browser
// and disposable — clearDemoData() puts it back to the seed.

import { PRODUCTS, PROMO_CODES, SHIPPING_METHODS, FREE_SHIPPING_THRESHOLD } from './catalogue';
import { REVIEWS } from './reviews';
import { USERS, SEED_ORDERS } from './fixtures';

const KEY = 'spacejoy.demo.v2';
const DAY = 86400000;

const seed = () => ({
  products: structuredClone(PRODUCTS),
  users: structuredClone(USERS),
  reviews: structuredClone(REVIEWS),
  orders: SEED_ORDERS.map((order) => ({
    ...structuredClone(order),
    placedAt: new Date(Date.now() - order.placedDaysAgo * DAY).toISOString(),
    subtotal: order.items.reduce((sum, i) => sum + i.Product_price * i.quantity, 0),
    total:
      order.items.reduce((sum, i) => sum + i.Product_price * i.quantity, 0) +
      order.shipping -
      order.discount,
  })),
  wishlist: [],
  recentlyViewed: [],
  nextProductId: Math.max(...PRODUCTS.map((p) => p.Product_id)) + 1,
  orderSeq: 24020,
});

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    // Guard against a half-written or stale-shaped payload.
    if (!Array.isArray(parsed?.products) || !Array.isArray(parsed?.users)) return seed();
    return { ...seed(), ...parsed };
  } catch {
    return seed();
  }
}

let db = read();

function commit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    // Private browsing or a full quota — demo still works for this page view.
  }
}

export function clearDemoData() {
  db = seed();
  commit();
}

const live = () => db.products.filter((p) => !p.isDeleted);

const matches = (product, { category, categories, minPrice, maxPrice, inStock, onSale, minRating, query }) => {
  if (category && product.Category !== category) return false;
  if (categories?.length && !categories.includes(product.Category)) return false;
  if (minPrice != null && product.Product_price < minPrice) return false;
  if (maxPrice != null && product.Product_price > maxPrice) return false;
  if (inStock && product.Quantity <= 0) return false;
  if (onSale && product.Discount <= 0) return false;
  if (minRating != null && product.Rating < minRating) return false;
  if (query) {
    const q = query.trim().toLowerCase();
    const hay = `${product.Product_name} ${product.Product_description} ${product.Category}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
};

const SORTERS = {
  featured: (a, b) => b.Rating * b.Review_count - a.Rating * a.Review_count,
  'price-asc': (a, b) => a.Product_price - b.Product_price,
  'price-desc': (a, b) => b.Product_price - a.Product_price,
  rating: (a, b) => b.Rating - a.Rating || b.Review_count - a.Review_count,
  newest: (a, b) => b.Product_id - a.Product_id,
  name: (a, b) => a.Product_name.localeCompare(b.Product_name),
};

export const demoDb = {
  // ---- catalogue -------------------------------------------------------
  listProducts({ pageNumber = 1, rowNumber = 12, sort = 'featured', ...filters } = {}) {
    const filtered = live().filter((p) => matches(p, filters));
    const sorted = [...filtered].sort(SORTERS[sort] ?? SORTERS.featured);
    const start = (pageNumber - 1) * rowNumber;
    return { items: sorted.slice(start, start + rowNumber), total: filtered.length };
  },

  // Bounds and per-category counts for the filter sidebar, computed against
  // everything so the facets do not vanish as you narrow the results.
  facets() {
    const all = live();
    const counts = {};
    all.forEach((p) => {
      counts[p.Category] = (counts[p.Category] ?? 0) + 1;
    });
    const prices = all.map((p) => p.Product_price);
    return {
      counts,
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
      onSale: all.filter((p) => p.Discount > 0).length,
      inStock: all.filter((p) => p.Quantity > 0).length,
    };
  },

  searchProducts(query) {
    return live().filter((p) => matches(p, { query }));
  },

  // Short list for the search-as-you-type dropdown.
  suggest(query, limit = 6) {
    const q = String(query ?? '').trim().toLowerCase();
    if (q.length < 2) return [];
    const starts = [];
    const contains = [];
    live().forEach((p) => {
      const name = p.Product_name.toLowerCase();
      if (name.startsWith(q)) starts.push(p);
      else if (name.includes(q) || p.Category.includes(q)) contains.push(p);
    });
    return [...starts, ...contains].slice(0, limit);
  },

  getProduct(id) {
    return live().find((p) => p.Product_id === Number(id)) ?? null;
  },

  // Same category first, then anything else, never the product itself.
  relatedProducts(id, limit = 4) {
    const product = this.getProduct(id);
    if (!product) return [];
    const others = live().filter((p) => p.Product_id !== product.Product_id);
    const sameCategory = others.filter((p) => p.Category === product.Category);
    const rest = others.filter((p) => p.Category !== product.Category);
    return [...sameCategory, ...rest]
      .sort((a, b) => b.Rating - a.Rating)
      .slice(0, limit);
  },

  reviewsFor(id) {
    return db.reviews.filter((r) => r.productId === Number(id));
  },

  addReview({ productId, author, rating, body }) {
    const review = {
      id: `${productId}-u${Date.now()}`,
      productId: Number(productId),
      author,
      rating: Number(rating),
      body,
      verified: true,
      daysAgo: 0,
      mine: true,
    };
    db.reviews.unshift(review);

    // Fold the new rating into the product's average.
    const product = db.products.find((p) => p.Product_id === Number(productId));
    if (product) {
      const total = product.Rating * product.Review_count + review.rating;
      product.Review_count += 1;
      product.Rating = Math.round((total / product.Review_count) * 10) / 10;
    }
    commit();
    return review;
  },

  // ---- recently viewed / wishlist --------------------------------------
  recordView(id) {
    const productId = Number(id);
    db.recentlyViewed = [productId, ...db.recentlyViewed.filter((p) => p !== productId)].slice(0, 8);
    commit();
  },

  recentlyViewed(excludeId) {
    return db.recentlyViewed
      .filter((id) => id !== Number(excludeId))
      .map((id) => this.getProduct(id))
      .filter(Boolean);
  },

  wishlist() {
    return db.wishlist.map((id) => this.getProduct(id)).filter(Boolean);
  },

  wishlistIds() {
    return [...db.wishlist];
  },

  toggleWishlist(id) {
    const productId = Number(id);
    db.wishlist = db.wishlist.includes(productId)
      ? db.wishlist.filter((p) => p !== productId)
      : [productId, ...db.wishlist];
    commit();
    return db.wishlist.includes(productId);
  },

  // ---- checkout --------------------------------------------------------
  shippingMethods() {
    return structuredClone(SHIPPING_METHODS);
  },

  freeShippingThreshold() {
    return FREE_SHIPPING_THRESHOLD;
  },

  validatePromo(code) {
    const found = PROMO_CODES.find(
      (p) => p.code.toLowerCase() === String(code ?? '').trim().toLowerCase(),
    );
    if (!found) throw Object.assign(new Error('That code is not recognised.'), { status: 404 });
    return structuredClone(found);
  },

  createOrder({ userId, items, shipping = 0, discount = 0, address, shippingMethod }) {
    const subtotal = items.reduce((sum, i) => sum + i.Product_price * i.quantity, 0);
    const order = {
      id: `SJ-${db.orderSeq++}`,
      userId: userId ?? null,
      items: items.map(({ Product_id, Product_name, quantity, Product_price }) => ({
        Product_id,
        Product_name,
        quantity,
        Product_price,
      })),
      address,
      shippingMethod,
      shipping,
      discount,
      subtotal,
      total: subtotal + shipping - discount,
      status: 'Processing',
      placedAt: new Date().toISOString(),
    };
    db.orders.unshift(order);

    // Draw the ordered units down from stock, as a real checkout would.
    items.forEach((item) => {
      const product = db.products.find((p) => p.Product_id === item.Product_id);
      if (!product) return;
      product.Quantity = Math.max(0, product.Quantity - item.quantity);
      product.IsAvailable = product.Quantity > 0;
    });

    commit();
    return order;
  },

  ordersFor(userId) {
    if (userId == null) return [];
    return db.orders.filter((o) => o.userId === Number(userId));
  },

  getOrder(id) {
    return db.orders.find((o) => o.id === id) ?? null;
  },

  // ---- admin -----------------------------------------------------------
  listAdminProducts() {
    return db.products.filter((p) => !p.isDeleted);
  },

  addProduct({ categoryName, productName, productDesc, productImg, productPrice, quantity }) {
    const product = {
      Product_id: db.nextProductId++,
      Product_name: productName,
      Product_description: productDesc,
      Product_price: Number(productPrice) || 0,
      List_price: Number(productPrice) || 0,
      Product_image: productImg,
      Product_images: [productImg],
      Quantity: Number(quantity) || 0,
      Discount: 0,
      Category: categoryName,
      Rating: 0,
      Review_count: 0,
      Details: {},
      IsAvailable: Number(quantity) > 0,
      isDeleted: false,
      SKU: `SJ-${String(db.nextProductId).padStart(4, '0')}`,
    };
    db.products.push(product);
    commit();
    return product;
  },

  updateProduct({ id, name, desc, price, quantity, discount }) {
    const product = db.products.find((p) => p.Product_id === Number(id));
    if (!product) return null;
    Object.assign(product, {
      Product_name: name ?? product.Product_name,
      Product_description: desc ?? product.Product_description,
      Product_price: Number(price) || 0,
      Quantity: Number(quantity) || 0,
      Discount: Number(discount) || 0,
      IsAvailable: (Number(quantity) || 0) > 0,
    });
    commit();
    return product;
  },

  deleteProduct(id) {
    const product = db.products.find((p) => p.Product_id === Number(id));
    if (!product) return false;
    product.isDeleted = true;
    commit();
    return true;
  },

  listUsers() {
    return db.users.map(({ password: _password, ...safe }) => safe);
  },

  findUserByEmail(email) {
    return db.users.find((u) => u.Email.toLowerCase() === String(email ?? '').toLowerCase()) ?? null;
  },

  registerUser({ userName, email, Name, password }) {
    if (this.findUserByEmail(email)) {
      throw Object.assign(new Error('email is already a user please login'), { status: 409 });
    }
    if (db.users.some((u) => u.userName?.toLowerCase() === String(userName).toLowerCase())) {
      throw Object.assign(new Error('Username is already taken'), { status: 409 });
    }
    const user = {
      User_Id: Math.max(0, ...db.users.map((u) => u.User_Id)) + 1,
      Name,
      userName,
      Email: email,
      User_role: 'User',
      IsDeleted: false,
      password,
    };
    db.users.push(user);
    commit();
    const { password: _password, ...safe } = user;
    return safe;
  },

  setRole(userID, role) {
    const user = db.users.find((u) => u.User_Id === Number(userID));
    if (!user) return false;
    user.User_role = role;
    commit();
    return true;
  },

  stats() {
    const products = live();
    return {
      products: products.length,
      inventoryValue: products.reduce((sum, p) => sum + p.Product_price * p.Quantity, 0),
      orders: db.orders.length,
      revenue: db.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0),
      users: db.users.length,
      lowStock: products.filter((p) => p.Quantity > 0 && p.Quantity <= 5).length,
      outOfStock: products.filter((p) => p.Quantity === 0).length,
    };
  },

  recentOrders(limit = 5) {
    return db.orders.slice(0, limit);
  },
};

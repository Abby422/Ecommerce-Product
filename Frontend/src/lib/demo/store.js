// An in-memory database for demo mode, mirrored into localStorage so that admin
// edits survive a refresh. Everything here is per-browser and disposable —
// clearDemoData() puts it back to the seed.

import { PRODUCTS, USERS } from './fixtures';

const KEY = 'spacejoy.demo.v1';

const seed = () => ({
  products: structuredClone(PRODUCTS),
  users: structuredClone(USERS),
  orders: [],
  nextProductId: Math.max(...PRODUCTS.map((p) => p.Product_id)) + 1,
});

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    // Guard against a half-written or stale-shaped payload.
    if (!Array.isArray(parsed?.products) || !Array.isArray(parsed?.users)) return seed();
    return parsed;
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

export const demoDb = {
  listProducts({ pageNumber = 1, rowNumber = 12 } = {}) {
    const start = (pageNumber - 1) * rowNumber;
    return live().slice(start, start + rowNumber);
  },

  countProducts() {
    return live().length;
  },

  searchProducts(query) {
    const q = String(query ?? '').trim().toLowerCase();
    if (!q) return live();
    return live().filter(
      (p) =>
        p.Product_name.toLowerCase().includes(q) ||
        p.Product_description.toLowerCase().includes(q) ||
        p.Category.toLowerCase().includes(q),
    );
  },

  getProduct(id) {
    return live().find((p) => p.Product_id === Number(id)) ?? null;
  },

  listAdminProducts() {
    return db.products.filter((p) => !p.isDeleted);
  },

  addProduct({ categoryName, productName, productDesc, productImg, productPrice, quantity }) {
    const product = {
      Product_id: db.nextProductId++,
      Product_name: productName,
      Product_description: productDesc,
      Product_price: Number(productPrice) || 0,
      Product_image: productImg,
      Quantity: Number(quantity) || 0,
      Discount: 0,
      Category: categoryName,
      IsAvailable: true,
      isDeleted: false,
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
      const error = new Error('email is already a user please login');
      error.status = 409;
      throw error;
    }
    if (db.users.some((u) => u.userName?.toLowerCase() === String(userName).toLowerCase())) {
      const error = new Error('Username is already taken');
      error.status = 409;
      throw error;
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

  createOrder(order) {
    db.orders.push({ ...order, id: db.orders.length + 1, placedAt: new Date().toISOString() });
    commit();
  },

  stats() {
    const products = live();
    return {
      products: products.length,
      inventoryValue: products.reduce((sum, p) => sum + p.Product_price * p.Quantity, 0),
      orders: db.orders.length,
      revenue: db.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0),
      users: db.users.length,
    };
  },
};

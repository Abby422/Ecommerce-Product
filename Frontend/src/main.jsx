import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import store from './redux/store';
import App from './App';
import ProtectedRoute from './Components/common/ProtectedRoute';
import { ToastProvider } from './Components/common/Toast';

import LandingPage from './Components/LandingPage/LandingPage';
import Shop from './Components/Shop/Shop';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';
import OrderConfirmation from './Components/Orders/OrderConfirmation';
import Account from './Components/Account/Account';
import Wishlist from './Components/Wishlist/Wishlist';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AdminLogin from './Components/Admin/adminLogin';
import AdminPage from './Components/Admin/adminComponents/adminPage';
import Dashboard from './Components/Admin/adminComponents/dashboard';
import AddProduct from './Components/Admin/adminComponents/addProduct';
import UpdateProduct from './Components/Admin/adminComponents/updateProduct';
import ProductUpdate from './Components/Admin/adminComponents/productUpdate';
import DeleteProduct from './Components/Admin/adminComponents/deleteProduct';
import SetAdmin from './Components/Admin/adminComponents/setAdmin';
import NotFound from './Components/404 page/notAdminPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<LandingPage />} />
              <Route path="shop" element={<Shop />} />
              <Route path="category/:slug" element={<Shop />} />
              <Route path="product/:productId" element={<ProductDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order/:orderId" element={<OrderConfirmation />} />

              <Route element={<ProtectedRoute />}>
                <Route path="account" element={<Account />} />
              </Route>

              {/* The old search route; keep it working as a redirect. */}
              <Route path="search" element={<Navigate to="/shop" replace />} />
              <Route path="notFound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminLogin" element={<AdminLogin />} />

            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin" element={<AdminPage />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="updateProduct" element={<UpdateProduct />} />
                <Route path="updateProduct/:id" element={<ProductUpdate />} />
                <Route path="deleteProduct" element={<DeleteProduct />} />
                <Route path="setAdmin" element={<SetAdmin />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import store from './redux/store';
import App from './App';
import ProtectedRoute from './Components/common/ProtectedRoute';

import LandingPage from './Components/LandingPage/LandingPage';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Cart from './Components/Cart/Cart';
import Search from './Components/Search/Search';
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
import NotAdminPage from './Components/404 page/notAdminPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="search" element={<Search />} />
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

          <Route path="/notFound" element={<NotAdminPage />} />
          <Route path="*" element={<NotAdminPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

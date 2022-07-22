import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Adminlogin from './Components/Admin/adminLogin';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import LandingPage from './Components/LandingPage/LandingPage';
import Cart from './Components/Cart/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path='/:productId' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/admin' element={<Adminlogin />} />
      </Routes>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


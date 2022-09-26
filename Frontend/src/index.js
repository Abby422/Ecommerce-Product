
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Adminlogin from "./Components/Admin/adminLogin";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import LandingPage from "./Components/LandingPage/LandingPage";
import Cart from "./Components/Cart/Cart";
import AdminPage from "./Components/Admin/adminComponents/adminPage";
import Dashboard from "./Components/Admin/adminComponents/dashboard";
import AddProduct from "./Components/Admin/adminComponents/addProduct";
import UpdateProduct from "./Components/Admin/adminComponents/updateProduct";
import DeleteProduct from "./Components/Admin/adminComponents/deleteProduct";
import SetAdmin from "./Components/Admin/adminComponents/setAdmin";
import Search from "./Components/Search/Search";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ProductUpdate from "./Components/Admin/adminComponents/productUpdate";
import NotAdminPage from './Components/404 page/notAdminPage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:search" element={<Search />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminLogin" element={<Adminlogin />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/addProduct" element={<AddProduct />} />
            <Route path="/admin/updateProduct" element={<UpdateProduct />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/DeleteProduct" element={<DeleteProduct />} />
            <Route path="/admin/setAdmin" element={<SetAdmin />} />
            <Route path="/admin/updateProduct/:id" element={<ProductUpdate />} />
          </Route>
          <Route path='/notFound' element={<NotAdminPage/>}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

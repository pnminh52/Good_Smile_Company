import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/product/ProductList";
import ProductAdd from "./pages/admin/product/ProductAdd";
import ProductEdit from "./pages/admin/product/ProductEdit";
import CategoryList from "./pages/admin/category/CategoryList";
import CategoryAdd from "./pages/admin/category/CategoryAdd";
import CategoryEdit from "./pages/admin/category/CategoryEdit";
import NewAdd from "./pages/admin/new/NewAdd";
import NewUpdate from "./pages/admin/new/NewUpdate";
import OrderSuccess from "./pages/user/OrderSuccess";
import { useSocket } from "./context/SocketContext";
import useToast from "./hook/useToast";

import UserGuide from "./pages/user/guide/UserGuide";

import Homepage from "./pages/user/Homepage";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import NotFound from "./pages/user/NotFound";
import UserLayout from "./layouts/UserLayout";

import AdminLayout from "./layouts/AdminLayout";
import ProductDetails from "./pages/user/ProductDetails";
import ListProduct from "./pages/user/ListProduct";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import News from "./pages/user/News";
import Cart from "./pages/user/Cart";
import CheckOut from "./pages/user/CheckOut";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import Wishlist from "./pages/user/Wishlist";
import SearchByKeyword from "./pages/user/SearchByKeyword";
import { useLogout } from "./hook/useLogout";
import { setLogoutRef } from "./hook/useAuth";
import NewList from "./pages/admin/new/NewList";
import PaymentReturn from "./pages/user/PaymentReturn";
import PreviousShop from "./pages/user/guide/PreviousShop";
import AboutPayments from "./pages/user/guide/AboutPayments";
import DeliveryAndShipping from "./pages/user/guide/DeliveryAndShipping";
import ImportanNote from "./pages/user/guide/ImportanNote";
import Coupons from "./pages/user/guide/Coupons";
import OrderList from "./pages/admin/order/OrderList";
import OrderDetails from "./pages/admin/order/OrderDetails";
import UserList from "./pages/admin/user/UserList";
import useAuth from "./hook/useAuth";





function App() {
  const {logout} = useAuth()
  const toast = useToast()
  const socket = useSocket()
  useEffect(() => {
    if (!socket) return;
  
    socket.on("force-logout", ({ reason }) => {
      toast.error(reason || "Your session has been terminated.");
  
      setTimeout(() => {
        logout();
      }, 1000); 
    });
  
    return () => socket.off("force-logout");
  }, [socket, toast, logout]);
  
  
  return (
    <div className="select-none">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

function AppContent() {
  const logout = useLogout();

  useEffect(() => {
    setLogoutRef(() => logout);
  }, [logout]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

      <Routes>
        {/* User */}

  
      <Route element={<UserLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<ListProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchByKeyword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/new" element={<News />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/order" element={<Order />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/payment-return" element={<PaymentReturn />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
          
          <Route path="/guide/user-guide" element={<UserGuide />} />
          <Route path="/guide/previous-shop" element={<PreviousShop />} />
          <Route path="/guide/about-payments" element={<AboutPayments />} />
          <Route
            path="/guide/delivery-and-shipping"
            element={<DeliveryAndShipping />}
          />
          <Route path="/guide/importan" element={<ImportanNote />} />
          <Route path="/guide/coupons" element={<Coupons />} />
        </Route>
   

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news" element={<NewList />} />
          <Route path="news/add" element={<NewAdd />} />
          <Route path="news/edit/:id" element={<NewUpdate />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<ProductAdd />} />
          <Route path="products/edit/:id" element={<ProductEdit />} />
          <Route path="users" element={<UserList />} />

          <Route path="orders/:id" element={<OrderDetails/>} />
          <Route path="orders" element={<OrderList />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<CategoryAdd />} />
          <Route path="categories/edit/:id" element={<CategoryEdit />} />
        </Route>
      </Routes>
      {/* <Chatbot /> */}
    </>
  );
}

export default App;

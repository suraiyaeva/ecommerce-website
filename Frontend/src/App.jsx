import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage.jsx";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import DashboardLayout from "./Pages/Admin/DashboardLayout.jsx";
import Dashboard from "./Pages/Admin/Dashboard.jsx";
import Users from "./Pages/Admin/Users.jsx";
import Products from "./Pages/Admin/Products.jsx";
import Orders from "./Pages/Admin/Orders.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./Pages/AboutPage.jsx";
import Shop from "./Pages/Shop.jsx";
import Contact from "./Pages/Contact.jsx";
import Profile from "./Pages/Profile.jsx";
import Categories from "./Pages/Admin/Categories.jsx";
import UpdateCategory from "./Pages/Admin/UpdateCategory.jsx";
import AddProduct from "./Pages/Admin/AddProduct.jsx";
import UpdateProduct from "./Pages/Admin/UpdateProduct.jsx";
import ProductDetails from "./Pages/Admin/ProductDetails.jsx";
import CartPage from "./Pages/CartPage.jsx";
import CheckoutPage from "./Pages/CheckoutPage.jsx";
import ContactPage from "./Pages/ContactPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/*Admin ROutes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />

          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/update/:slug" element={<UpdateCategory />} />
          <Route
            path="products/update/:productId"
            element={<UpdateProduct />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

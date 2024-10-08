// src/App.js
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import CategoryPage from './Pages/CategoryPage';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Components/Cart/Cart';
import NotFound from './Pages/NotFound';
import Login from './Components/Login_Register/Login';
import Register from './Components/Login_Register/Register';
import ProductDetails from './Pages/ProductDetails/';
import ForgotPassword from './Components/Login_Register/ForgotPassword';
import Payment from './Pages/Payment';
import SearchProduct from './Pages/SearchProduct';
import ReturnPolicy from './Components/Footer/ReturnPolicy';
import Dashboard from './Components/Admin_Side/Dashboard';
import { CartProvider } from './Context/CartContext';
import PaymentMethod from './Components/Footer/PaymentMethod';
import AllProducts from './Components/Admin_Side/AllProducts';
import AllCustomers from './Components/Admin_Side/AllCustomers';
import AllOrders from './Components/Admin_Side/AllOrders';
import EditProduct from './Components/Admin_Side/EditProduct';
import AddProduct from './Components/Admin_Side/AddProducts';
import CustomerOrder from './Components/Admin_Side/CustomerOrder';
import Security from './Components/Footer/Security';
import FAQ from './Components/Footer/FAQ';
import ProtectedRoute from './Components/Admin_Side/ProtectedRoute';
import ProtectRoute from './Components/Cart/ProtectRoute';
import Sidebar from './Components/Admin_Side/Sidebar'; // Import Sidebar

function App() {
  const location = useLocation();

  // Routes where the footer should not be shown (admin-related routes)
  const noFooterRoutes = [
    '/admin',
    '/admin-dashboard',
    '/all-products',
    '/all-customers',
    '/all-orders',
    '/add-product',
    '/customer-order',
    '/edit-product',
  ];

  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protect the /cart route */}
        <Route
          path="/cart"
          element={
            <ProtectRoute>
              <Cart />
            </ProtectRoute>
          }
        />
        
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/payment-methods" element={<PaymentMethod />} />
        <Route path="/security" element={<Security />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin Routes with Sidebar Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Sidebar />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="all-customers" element={<AllCustomers />} />
          <Route path="all-orders" element={<AllOrders />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="customer-order/:customerId" element={<CustomerOrder />} />
        </Route>
      </Routes>

      {!noFooterRoutes.some((path) => location.pathname.startsWith(path)) && <Footer />}
    </CartProvider>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import CategoryPage from './Pages/CategoryPage';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
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
import AllCustomers from './Components/Admin_Side/AllCustomers'
import EditProduct from './Components/Admin_Side/EditProduct';

function App() {
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
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/all-customers" element={<AllCustomers />} />
        <Route path="/edit-product/:id" element={<EditProduct />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />    
        <Route path="/payment-methods" element={<PaymentMethod />} />        
    
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;

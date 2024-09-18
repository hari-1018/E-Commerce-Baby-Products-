import './App.css'
import { Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop' 
import CategoryPage from './Pages/CategoryPage'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import NotFound from './Pages/NotFound'
import Login from './Components/Login_Register/Login'
import Register from './Components/Login_Register/Register'
import ProductDetails from './Pages/ProductDetails/';
import ForgotPassword from './Components/Login_Register/ForgotPassword';

function App() {

  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/shop" element={<Shop />}/>
          <Route path="/category/:category" element={<CategoryPage />}/> 
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </>
  )
}

export default App

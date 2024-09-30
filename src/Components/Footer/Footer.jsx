import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-pink-400 py-8">
      {/* Main footer content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4">

        {/* BABY-BUDS Section */}
        <div>
          <h2 className="text-lg text-yellow-400 font-bold mb-4">BABY-BUDS</h2>
          <p className="text-sm font-bold text-white hover:text-blue-500">
            Baby-Buds is your last word for all baby essentials. From toys to clothing, we ensure quality products for your little ones.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h3>
          <ul>
            <li className="mb-2 font-bold text-white"><a href="/" className="hover:text-blue-500">Home</a></li>
            <li className="mb-2 font-bold text-white"><a href="/shop" className="hover:text-blue-500">Shop</a></li>
            <li className="mb-2 font-bold text-white"><a href="/about" className="hover:text-blue-500">About Us</a></li>
            <li className="mb-2 font-bold text-white"><a href="/contact" className="hover:text-blue-500">Contact Us</a></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Help</h3>
          <ul>
            <li className="mb-2 font-bold text-white"><a href="/return-policy" className="hover:text-blue-500">Return Policy</a></li>
            <li className="mb-2 font-bold text-white"><a href="/payment-methods" className="hover:text-blue-500">Payment Methods</a></li>
            <li className="mb-2 font-bold text-white"><a href="/security" className="hover:text-blue-500">Security</a></li>
            <li className="mb-2 font-bold text-white"><a href="/faq" className="hover:text-blue-500">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact</h3>
          <p className="text-sm font-bold text-white hover:text-blue-500">SMS Street, Calicut City</p>
          <p className="text-sm font-bold text-white hover:text-blue-500">Email: info@baby-buds.com</p>
          <p className="text-sm font-bold text-white hover:text-blue-500">Phone: +91 9876543210</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-xl text-blue-600 hover:text-blue-800 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-xl text-pink-600 hover:text-pink-800 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-xl text-blue-400 hover:text-blue-600 transition duration-300" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-300 pt-4">
        <p className="text-sm font-bold text-yellow-400 hover:text-blue-500 transition duration-300">© 2024 BABY-BUDS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

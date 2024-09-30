
const Security = () => {
  return (
    <div className="security p-6 bg-gray-100 rounded-lg shadow-lg max-w-7xl mt-20 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-pink-500 text-center">Security Measures</h1>
      <p className="text-gray-700 mb-6">
        At <strong className="text-blue-500">Baby Buds</strong>, the security of your personal information is our top priority. We have implemented multiple layers of security to protect your data throughout the shopping experience.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-blue-500">Data Protection</h2>
      <p className="text-gray-700 mb-4">
        We use industry-standard SSL encryption to protect your personal information, including your name, address, and payment details, during transmission. This ensures that your data is kept confidential and secure.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-blue-500">Secure Payment Processing</h2>
      <p className="text-gray-700 mb-4">
        All payment transactions are processed through trusted payment gateways that comply with the Payment Card Industry Data Security Standard (PCI DSS). We do not store any payment information on our servers, ensuring that your financial data remains secure.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-blue-500">Privacy Policy</h2>
      <p className="text-gray-700 mb-4">
        Our privacy policy outlines how we collect, use, and protect your personal information. We are committed to maintaining your privacy and will never sell or share your data with third parties without your consent.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-blue-500">Account Security</h2>
      <p className="text-gray-700 mb-4">
        We encourage our customers to create strong, unique passwords for their accounts and to change them regularly. If you suspect any unauthorized access to your account, please contact us immediately so we can assist you.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-blue-500">Customer Support</h2>
      <p className="text-gray-700 mb-4">
        If you have any questions or concerns regarding the security of your information or our policies, feel free to reach out to our customer service team at <a href="mailto:info@babybuds.com" className="text-blue-600 underline">info@babybuds.com</a>. We are here to help you with any inquiries.
      </p>

      <p className="text-gray-700">
        Thank you for trusting Baby Buds with your shopping experience. Your safety is our priority!
      </p>
    </div>
  );
};

export default Security;

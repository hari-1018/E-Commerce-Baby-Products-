
const PaymentMethods = () => {
  return (
    <div className="payment-methods p-6 bg-gray-100 rounded-lg shadow-lg max-w-7xl mt-20 mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-pink-500 text-center">Payment Methods</h1>
      <p className="text-gray-700 mb-6">
        At <strong>Baby Buds</strong>, we offer a variety of secure and convenient payment options to make your shopping experience as smooth as possible. Our payment methods are designed to cater to your preferences and ensure a hassle-free checkout process.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Accepted Payment Methods</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li><strong>Credit/Debit Cards:</strong> We accept all major credit and debit cards, including Visa, MasterCard, American Express, and Discover. Simply enter your card details at checkout, and the payment will be processed securely through our payment gateway.</li>
        <li><strong>PayPal:</strong> You can choose to pay via PayPal for a fast and secure transaction. You will be redirected to the PayPal site to complete your purchase.</li>
        <li><strong>Apple Pay & Google Pay:</strong> If you’re using a mobile device, you can use Apple Pay or Google Pay for quick, contactless payments with just a few taps.</li>
        <li><strong>Bank Transfers:</strong> We also accept direct bank transfers. You will be provided with our bank details during checkout, and your order will be processed once the payment is confirmed.</li>
        <li><strong>Gift Cards & Store Credit:</strong> If you have a Baby Buds gift card or store credit, simply apply it at checkout to use your balance towards your purchase.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Security & Privacy</h2>
      <p className="text-gray-700 mb-6">
        We take your privacy and the security of your payment information seriously. Our website uses secure SSL encryption to ensure that all sensitive data is protected during the transaction process. Your payment details are never stored on our servers and are handled through trusted payment gateways.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Frequently Asked Questions</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li><strong>Are there any additional fees?</strong> No, we do not charge any extra fees for processing your payments. However, your bank or payment provider may apply a transaction fee for international purchases.</li>
        <li><strong>Can I split payments?</strong> At this time, we do not support split payments across multiple methods.</li>
        <li><strong>Why was my payment declined?</strong> If your payment was declined, it may be due to incorrect card details, insufficient funds, or bank restrictions. Please try again or contact your bank for further information.</li>
      </ul>

      <p className="text-gray-700 mb-6">
        If you encounter any issues during checkout or have questions about our payment methods, feel free to reach out to our customer service team at <a href="mailto:info@babybuds.com" className="text-blue-600 underline">info@babybuds.com</a>. We’re here to help!
      </p>

      <p className="text-gray-700">
        Thank you for shopping with Baby Buds, where your convenience and security are our top priority.
      </p>
    </div>
  );
};

export default PaymentMethods;

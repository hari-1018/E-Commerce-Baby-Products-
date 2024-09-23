import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="return-policy p-6 bg-gray-100 rounded-lg shadow-lg max-w-7xl mt-20 mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-pink-500 text-center">Return Policy</h1>
      <p className="text-gray-700 mb-6">
        At <strong>Baby Buds</strong>, we are committed to ensuring you are completely satisfied with your purchase. However, we understand that there may be instances where a product does not meet your expectations. That’s why we offer a simple and hassle-free return policy, designed to make the process as smooth as possible for you.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Eligibility for Returns</h2>
      <p className="text-gray-700 mb-4">To be eligible for a return, your item must meet the following conditions:</p>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li><strong>Product Condition:</strong> The item must be unused, undamaged, and in its original packaging, including any accessories, manuals, and documentation.</li>
        <li><strong>Return Window:</strong> Returns must be initiated within <strong>7 days</strong> of the delivery date. Items returned after this period may not be eligible for a refund or exchange.</li>
        <li><strong>Proof of Purchase:</strong> A valid receipt or proof of purchase is required for all returns. Without proof, we regret that we may not be able to process your return.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Non-Returnable Items</h2>
      <p className="text-gray-700 mb-4">Some items are not eligible for return, including but not limited to:</p>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li><strong>Personalized items</strong> or those made-to-order specifically for you.</li>
        <li><strong>Final sale items</strong>, clearance, or discounted products.</li>
        <li><strong>Opened personal care products</strong>, due to health and hygiene reasons.</li>
      </ul>
      <p className="text-gray-700 mb-6">If you’re unsure whether your product qualifies for a return, feel free to reach out to our customer service team for clarification.</p>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">How to Initiate a Return</h2>
      <p className="text-gray-700 mb-4">To begin the return process, follow these simple steps:</p>
      <ol className="list-decimal list-inside mb-6 text-gray-700">
        <li className="mb-2">
          <strong>Contact Us:</strong> Send an email to our customer service team at <a href="mailto:info@babybuds.com" className="text-blue-600 underline">info@babybuds.com</a>. Please include the following details:
          <ul className="list-disc list-inside ml-6 mt-2">
            <li>Your <strong>order number</strong>.</li>
            <li>A <strong>brief description</strong> of the reason for the return.</li>
            <li>If applicable, include <strong>photos of the product</strong>, especially if it arrived damaged or defective.</li>
          </ul>
        </li>
        <li className="mb-2"><strong>Shipping Instructions:</strong> Once your return request is approved, we will provide you with return shipping instructions, including the return address and any shipping labels if necessary. Customers are responsible for return shipping costs unless the product arrived damaged or defective.</li>
        <li><strong>Pack Your Item:</strong> Ensure the product is securely packaged to avoid damage during transit. Reuse the original packaging if possible.</li>
      </ol>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Refund Process</h2>
      <p className="text-gray-700 mb-4">
        Once we receive and inspect your returned item, you will be notified of the approval or rejection of your refund based on the product’s condition and eligibility.
      </p>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>If <strong>approved</strong>, your refund will be processed, and a credit will automatically be applied to your original method of payment within <strong>5-7 business days</strong>.</li>
        <li>If the item does not meet our return eligibility criteria, we will notify you with further details, and the product will be shipped back to you.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Exchanges</h2>
      <p className="text-gray-700 mb-6">
        If you wish to exchange an item for a different size, color, or variant, please contact our customer service team. Exchanges are subject to product availability.
      </p>

      <h2 className="text-xl font-semibold mb-3 text-gray-800">Late or Missing Refunds</h2>
      <p className="text-gray-700 mb-4">If you haven’t received your refund within the expected time frame, please:</p>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>Double-check your bank account or payment method.</li>
        <li>Contact your credit card company or bank, as processing times may vary.</li>
        <li>If you’ve done all of the above and still have not received your refund, contact us at <a href="mailto:info@babybuds.com" className="text-blue-600 underline">info@babybuds.com</a>, and we will assist you further.</li>
      </ul>

      <p className="text-gray-700 mb-4">
        At Baby Buds, we strive to make your shopping experience enjoyable and stress-free. If you have any questions or concerns about our return policy, please don't hesitate to reach out to us at any time.
      </p>
      <p className="text-gray-700">We look forward to serving you and ensuring your complete satisfaction!</p>
    </div>
  );
};

export default ReturnPolicy;

import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-28">
      <h2 className="text-2xl font-bold mb-4 text-center">Return Policy</h2>
      <p className="mb-4">
        At Baby Buds, we understand that sometimes products may not meet your expectations. That&apos;s why we offer a hassle-free return policy.
      </p>
      <h3 className="text-xl font-semibold mb-2">Eligibility for Returns</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Products must be unused and in the original packaging.</li>
        <li>Returns are accepted within 30 days of purchase.</li>
        <li>Proof of purchase is required for all returns.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">How to Initiate a Return</h3>
      <p className="mb-4">
        To start a return, please contact our customer service team at <strong>info@babybuds.com</strong> with your order number and the reason for the return.
      </p>
      <h3 className="text-xl font-semibold mb-2">Refund Process</h3>
      <p>
        Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days.
      </p>
    </div>
  );
};

export default ReturnPolicy;

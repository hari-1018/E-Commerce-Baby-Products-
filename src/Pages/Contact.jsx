

const Contact = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-700">We’d love to hear from you! Please fill out the form below or reach us via our contact information.</p>
        </div>
        <div className="flex flex-wrap">
          {/* Contact Form */}
          <div className="w-full lg:w-1/2 px-4">
            <form className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded" placeholder="Your Name" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Your Email" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" className="w-full p-2 border border-gray-300 rounded" rows="4" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Send Message</button>
            </form>
          </div>
          {/* Store Information */}
          <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
            <div className="bg-white p-8 rounded-lg shadow-lg mt-16">
              <h3 className="text-xl font-bold mb-4">Store Information</h3>
              <p className="text-gray-700 mb-2"><strong>Address:</strong> 123 Baby Lane, Cute Town, CA 12345</p>
              <p className="text-gray-700 mb-2"><strong>Phone:</strong> (123) 456-7890</p>
              <p className="text-gray-700 mb-4"><strong>Email:</strong> contact@babyshop.com</p>
              <p className="text-gray-700"><strong>Business Hours:</strong> Mon-Fri 9:00 AM - 6:00 PM</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600">Facebook</a>
                <a href="#" className="text-blue-500 hover:text-blue-600">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

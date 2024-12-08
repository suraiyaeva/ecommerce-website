import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-6">
          Discover the best deals on our wide range of products.
        </p>
        <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow hover:bg-gray-200">
          Shop Now
        </button>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Product Card */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Product Name
            </h3>
            <p className="text-gray-500">$99.99</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
          {/* Duplicate Product Cards as needed */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Product Name
            </h3>
            <p className="text-gray-500">$49.99</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center bg-white shadow rounded-lg p-6">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              📦
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-500">
              Get your orders delivered in record time.
            </p>
          </div>
          <div className="text-center bg-white shadow rounded-lg p-6">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              🔒
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-500">Your transactions are safe with us.</p>
          </div>
          <div className="text-center bg-white shadow rounded-lg p-6">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              📞
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-500">
              We’re here to help whenever you need.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
        <p className="mb-6">Join thousands of happy customers today.</p>
        <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow hover:bg-gray-200">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HomePage;

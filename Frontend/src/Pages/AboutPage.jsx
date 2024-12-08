import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Learn more about who we are, what we do, and our mission.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2024, our mission has been to provide the best services
            to our customers. What started as a small idea has grown into
            something impactful. We believe in quality, trust, and innovation,
            and we strive to make a difference every day.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to deliver exceptional products and services that
            improve lives. We are committed to sustainable practices, customer
            satisfaction, and community growth.
          </p>
        </section>

        {/* Section 3: Team */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Example Team Member */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-3"></div>
              <p className="text-gray-700 font-medium">John Doe</p>
              <p className="text-gray-500 text-sm">Founder & CEO</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-3"></div>
              <p className="text-gray-700 font-medium">Jane Smith</p>
              <p className="text-gray-500 text-sm">CTO</p>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Want to Learn More About Us?
          </h2>
          <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition">
            Contact Us
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

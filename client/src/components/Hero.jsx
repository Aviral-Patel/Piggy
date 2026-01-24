import React from 'react';

const Hero = () => {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image */}
        <div className="order-2 md:order-1">
          <img
            src="https://images.unsplash.com"
            alt="Hero Visual"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="order-1 md:order-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 leading-tight">
            Build Your Future <span className="text-blue-600">Together</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Create stunning, modern, and responsive hero sections with ease.
            Our components are designed to boost user engagement and look great
            on any screen size.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
            <button className="text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

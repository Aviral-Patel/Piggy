import React from 'react';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <div className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Side: Image */}
        <div className="order-2 md:order-1">
          <img
            src={logo}
            alt="Hero Visual"
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right Side: Content */}
        <div className="order-1 md:order-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 leading-tight">
            Your Expenses Finally<br />
            <span className="text-primary">Organized</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Easily track your income and expenses, categorize your spending, and stay on top of your budget — all in one simple, intuitive app.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300">
              Signup
            </button>
            <button className="text-primary px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="w-full px-4 py-2 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* Logo Image - src will be updated later */}
            <img 
              src="" 
              alt="Piggy Logo" 
              className="h-10 w-10"
            />
            <a href="/" className="text-3xl font-bold text-blue-600">
              Piggy
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#login" className="border px-4 py-2 rounded-lg hover:bg-gray-200 transition">Log In</a>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 p-2 rounded"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-3">
            <a href="#login" className="block text-gray-700 hover:text-blue-600 transition">Log In</a>
            <button className="block w-full bg-blue-600 px-4 py-2 rounded text-white text-center hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
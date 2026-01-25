import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/p_round.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="w-full px-4 py-2 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-0.5">
            <img 
              src={logo} 
              alt="Piggy Logo" 
              className="h-14 w-14"
            />
            <Link to="/" className="text-3xl font-bold italic text-primary">
              Piggy
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-primary px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300">
              Log In
            </Link>
            <Link to="/signup" className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary p-2 rounded"
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
            <Link to="/login" className="block text-primary px-8 py-3 rounded-full font-semibold hover:bg-secondary transition duration-300 text-center">
              Log In
            </Link>
            <Link to="/signup" className="block w-full bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300 text-center">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
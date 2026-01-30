import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/p_round.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Check if admin is logged in
  const isAdminAuthenticated = () => {
    return !!localStorage.getItem('adminToken');
  };

  const handleLogout = () => {
    if (isAdminAuthenticated()) {
      localStorage.removeItem('adminToken');
      // Also clear any user tokens to prevent redirect to dashboard
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } else {
      logout();
      navigate('/');
    }
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md dark:shadow-gray-950/50">
      <div className="w-full px-4 py-2 sm:px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-0.5">
            <img 
              src={logo} 
              alt="Piggy Logo" 
              className="h-14 w-14"
            />
            <Link to="/" className="text-3xl font-bold italic text-primary dark:text-secondary">
              Piggy
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark/Light mode toggle - left of Login/Dashboard */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700 transition duration-300"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {isAdminAuthenticated() ? (
              // Admin Authenticated View
              <>
                <Link 
                  to="/admin/dashboard" 
                  className="text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : isAuthenticated() ? (
              // Authenticated User View
              <>
                
                <Link 
                  to="/dashboard" 
                  className="text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              // Guest User View
              <>
                <div className="relative group inline-block">
                  <button 
                    type="button"
                    className="relative z-10 text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 inline-block cursor-pointer"
                  >
                    Log In
                  </button>
                  <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-gray-950/50 py-1 min-w-[140px] border border-gray-200 dark:border-gray-700">
                      <Link 
                        to="/login" 
                        className="block text-primary dark:text-secondary px-6 py-2.5 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 text-center text-sm whitespace-nowrap mx-1"
                      >
                        As User
                      </Link>
                      <Link 
                        to="/admin" 
                        className="block text-primary dark:text-secondary px-6 py-2.5 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 text-center text-sm whitespace-nowrap mx-1"
                      >
                        As Admin
                      </Link>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/signup" 
                  className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-secondary dark:hover:bg-gray-700 transition duration-300"
              title={isDark ? 'Light mode' : 'Dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary p-2 rounded"
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
            {isAdminAuthenticated() ? (
              // Admin Authenticated Mobile View
              <>
                <div className="text-center text-gray-700 dark:text-gray-300 font-medium py-2">
                  Admin
                </div>
                <Link 
                  to="/admin/dashboard" 
                  className="block text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 text-center"
                >
                  Admin Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300 text-center"
                >
                  Logout
                </button>
              </>
            ) : isAuthenticated() ? (
              // Authenticated User Mobile View
              <>
                <div className="text-center text-gray-700 dark:text-gray-300 font-medium py-2">
                  Welcome, {user?.username}!
                </div>
                <Link 
                  to="/dashboard" 
                  className="block text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 text-center"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300 text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              // Guest User Mobile View
              <>
                <Link 
                  to="/login" 
                  className="block text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 text-center"
                >
                  As User
                </Link>
                <Link 
                  to="/admin" 
                  className="block text-primary dark:text-secondary px-8 py-3 rounded-full font-semibold hover:bg-secondary dark:hover:bg-gray-700 transition duration-300 text-center"
                >
                  As Admin
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-tertiary transition duration-300 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
import React, { useState, useEffect } from 'react';
import { FaHeart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

const Header = () => {
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleAccount = () => setAccountOpen(!accountOpen);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="sticky top-0 z-1 bg-white text-gray-900 p-4 border-b-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <img src={logo} alt="Logo" className="w-30 h-10" /> {/* Use the imported image */}
          <select className="bg-gray-100 text-gray-900 p-3 rounded">
            <option>Options</option>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
            {/* Add more categories here */}
          </select>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded bg-gray-100 text-gray-900 w-96"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center cursor-pointer">
            <FaHeart className="mr-1" />
            Favorites
          </div>
          <div className="relative">
            {isLoggedIn ? (
              <>
                <button onClick={toggleAccount} className="flex items-center">
                  <FaUser className="mr-1" />
                  My Account
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                    <a href="#" className="block px-4 py-2">Profile</a>
                    <a href="#" className="block px-4 py-2">Logout</a>
                  </div>
                )}
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <p className="mb-2">© 2024 Room Sharing. All rights reserved.</p>
            <p className="mb-2">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              {' | '}
              <a href="/terms-of-service" className="hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-white hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="text-white hover:text-blue-300 transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="text-white hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

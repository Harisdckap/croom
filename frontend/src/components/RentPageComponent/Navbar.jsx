import React from 'react';

const Navbar = ({ search, onSearchChange, onSearchSubmit }) => {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="/alllisting" className="text-gray-700 hover:text-blue-600 font-medium">All Listings</a>
          <a href="/rooms" className="text-gray-700 hover:text-blue-600 font-medium">Rooms</a>
          <a href="/roommates" className="text-gray-700 hover:text-blue-600 font-medium">Roommates</a>
          <a href="/pg" className="text-gray-700 hover:text-blue-600 font-medium">PG</a>
        </div>

        {/* Search Bar */}
        <form onSubmit={onSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search..."
            className="border rounded-lg py-2 px-4 w-64 focus:outline-none focus:border-blue-600"
          />
          <button type="submit" className="ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

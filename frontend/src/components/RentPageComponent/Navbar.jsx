import React from 'react';
import { MagnifyingGlassIcon, HomeIcon, UsersIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const Navbar = ({ search, onSearchChange, onSearchSubmit }) => {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="/AllExploreRooms" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <HomeIcon className="h-6 w-6 mr-1" />
            All Listings
          </a>
          <a href="/AllRoomsPage" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <HomeIcon className="h-6 w-6 mr-1" />
            Rooms
          </a>
          <a href="/Allroommates" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <UsersIcon className="h-6 w-6 mr-1" />
            Roommates
          </a>
          <a href="/pg" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
            <BuildingOfficeIcon className="h-6 w-6 mr-1" />
            PG
          </a>
        </div>

        {/* Search Bar */}
        <form onSubmit={onSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search..."
            className="border rounded-l-lg py-2 px-4 w-64 focus:outline-none focus:border-blue-600"
          />
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-r-lg hover:bg-blue-700 focus:outline-none">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

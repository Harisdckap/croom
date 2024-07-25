import React from 'react';
import alllistingImg from './image_icons/housesearch.png'
import roomsImg from './image_icons/room.png'
import roomatesImg from './image_icons/roommates.png'
import pgImg from './image_icons/pg.png'
const Navbar = ({ search, onSearchChange, onSearchSubmit }) => {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
        <img src={alllistingImg} alt="house icon" className="h-6 w-6" />
          <a href="/AllExploreRooms" className="text-gray-700 hover:text-blue-600 font-medium">All Listings</a>
          <img src={roomsImg} alt="rooms icon" className="h-6 w-6" />
          <a href="/AllRoomsPage" className="text-gray-700 hover:text-blue-600 font-medium">Rooms</a>
          <img src={roomatesImg} alt="roommates icon" className="h-6 w-6" />
          <a href="/Allroommates" className="text-gray-700 hover:text-blue-600 font-medium">Roommates</a>
          <img src={pgImg} alt="pg icon" className="h-6 w-6" />
          <a href="/pg" className="text-gray-700 hover:text-blue-600 font-medium">PG</a>
          
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
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;

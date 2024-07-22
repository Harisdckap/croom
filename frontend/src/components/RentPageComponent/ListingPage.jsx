import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import HomeNavBar from '../Header';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/properties?address=${address}&p=${page}`);
        setListings(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [address, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAddress(search);
    setPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleViewClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
  };

  return (
    <div>
      <HomeNavBar />
      <Navbar 
        search={search} 
        onSearchChange={handleSearchChange} 
        onSearchSubmit={handleSearchSubmit} 
      />

      <h1 className="text-4xl font-bold mb-8 text-center">All Listings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-4">
        {listings.length > 0 ? (
          listings.map(listing => (
            <div key={listing.id} className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-gray-700 mb-2">Location: {listing.location}</p>
              <p className="text-gray-700 mb-2">Price: ${listing.price}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleViewClick(listing)}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No listings found.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-8 px-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-400 ${page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-400 ${page === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          Next
        </button>
      </div>

      {selectedListing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedListing.title}</h2>
            <p className="text-gray-700 mb-2">Location: {selectedListing.location}</p>
            <p className="text-gray-700 mb-2">Price: ${selectedListing.price}</p>
            <p className="text-gray-700 mb-2">Rooms: {selectedListing.rooms}</p>
            <p className="text-gray-700 mb-2">Facilities: {selectedListing.facilities}</p>
            <p className="text-gray-700 mb-2">Contact: {selectedListing.contact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;

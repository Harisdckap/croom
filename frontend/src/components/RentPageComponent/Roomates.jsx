import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import HomeNavBar from '../Header';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons';

const AllRoommatesPage = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 6; // Define how many items per page

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/requirements?address=${address}&p=${page}`);
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

  const handleViewClick = (id) => {
    navigate(`/roomates/${id}`);
  };

  return (
    <div>
      <HomeNavBar />
      <Navbar 
        search={search} 
        onSearchChange={handleSearchChange} 
        onSearchSubmit={handleSearchSubmit} 
      />

      <h1 className="text-4xl font-bold mb-8 text-center">All Roommates</h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-4">
        {listings.length > 0 ? (
          listings.map(listing => (
            <div key={listing.id} className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
              <p className="text-gray-700 mb-2">Location: {listing.location}</p>
              <p className="text-gray-700 mb-2">Approx Rent: ${listing.approx_rent}</p>
              <p className="text-gray-700 mb-2">Looking For: {listing.looking_for}</p>
              <p className="text-gray-700 mb-2">Looking_Gender_For: {listing.looking_for_gender}</p>
              <p className="text-gray-700 mb-2">Highlights: {listing.highlights}</p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleViewClick(listing.id)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-600"
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No listings found.</p>
        )}
      </div>

      {listings.length >= itemsPerPage && (
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`p-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-400 ${page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="text-gray-700">Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`p-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-400 ${page === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllRoommatesPage;

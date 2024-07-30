import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import HomeNavBar from '../Header';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const PGListingPage = () => {
  const [pgListings, setPgListings] = useState([]);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchPgListings = async () => {
      console.log('Fetching PG listings...');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pg_listings', {
          params: {
            address: address,
            page: page,
            per_page: itemsPerPage
          }
        });
        console.log('API response:', response.data);
        setPgListings(response.data.data || []);
        setTotalPages(response.data.last_page || 0);
      } catch (error) {
        console.error('Error fetching PG listings:', error);
      }
    };

    fetchPgListings();
  }, [address, page]);


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAddress(search);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleViewClick = (id) => {
    navigate(`/pg_listing/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HomeNavBar />
      <Navbar
        search={search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">All PG Listings</h1>

      <motion.div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {pgListings.length > 0 ? (
          pgListings.map(pg => (
            <motion.div
              key={pg.id}
              className="border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6">
                {pg.pg_files && pg.pg_files.length > 0 ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${pg.pg_files[0]}`}
                    alt="PG Photo"
                    className="w-full h-60 object-cover rounded-lg shadow-lg"
                    onError={(e) =>
                      (e.target.src = '')
                    }
                  />
                ) : (
                  <p className="text-gray-500 text-center">No photo available.</p>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{pg.pg_name}</h2>
              <p className="text-gray-700 mb-2">Address: {pg.pg_address}</p>
              <p className="text-gray-700 mb-2">Single Occupancy Price: ${pg.single_occupancy}</p>
              <p className="text-gray-700 mb-2">Double Occupancy Price: ${pg.double_occupancy}</p>
              <p className="text-gray-700 mb-2">Triple Occupancy Price: ${pg.triple_occupancy}</p>
              <p className="text-gray-700 mb-2">Post Content: {pg.pg_post_content}</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleViewClick(pg.id)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-600"
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  View
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No PG listings found.</p>
        )}
      </motion.div>

      {totalPages > 1 && (
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
    </motion.div>
  );
};

export default PGListingPage;

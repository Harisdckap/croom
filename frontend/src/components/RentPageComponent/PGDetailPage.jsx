import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeNavBar from '../Header';
import { FaMapMarkerAlt, FaDollarSign, FaBed, FaPhoneAlt, FaTag, FaUser, FaStar, FaPhone, FaComments } from 'react-icons/fa';

const PGDetailPage = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);

  useEffect(() => {
    const fetchPg = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/pg_listings/${id}`);
        setPg(response.data);
      } catch (error) {
        console.error('Error fetching PG details:', error);
      }
    };

    fetchPg();
  }, [id]);

  if (!pg) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <HomeNavBar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <div className="flex-none w-full lg:w-1/3 mb-6 lg:mb-0">
            {pg.photo ? (
              <img
                src={`http://127.0.0.1:8000/storage/${pg.photo}`}
                alt="PG Photo"
                className="w-full h-60 object-cover rounded-lg shadow-lg"
                onError={(e) =>
                  (e.target.src = '/path/to/fallback-image.jpg')
                }
              />
            ) : (
              <p className="text-gray-500 text-center">No photo available.</p>
            )}

            {/* Buttons Section */}
            <div className="mt-6 flex gap-4">
              <a
                href={`tel:${pg.contact}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
              >
                <FaPhone className="text-lg" />
                Call
              </a>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
                <FaComments className="text-lg" />
                Chat
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{pg.title}</h1>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center text-lg text-gray-600"
              >
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                <span>{pg.location}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center text-lg text-gray-600"
              >
                <FaDollarSign className="mr-2 text-gray-500" />
                <span>${pg.price}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center text-lg text-gray-600"
              >
                <FaBed className="mr-2 text-gray-500" />
                <span>Capacity: {pg.capacity}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center text-lg text-gray-600"
              >
                <FaTag className="mr-2 text-gray-500" />
                <span>Available Rooms: {pg.available_rooms}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center text-lg text-gray-600"
              >
                <FaUser className="mr-2 text-gray-500" />
                <span>Contact Person: {pg.contact_person}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center text-lg text-gray-600"
              >
                <FaStar className="mr-2 text-gray-500" />
                <span>Rating: {pg.rating}</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
          <p className="text-gray-600 mt-2">{pg.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PGDetailPage;

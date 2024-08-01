import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import HomeNavBar from '../Header';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('all');
  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/combined-listings', {
          params: {
            address: address,
            p: page,
            gender: gender, // Pass the gender filter to the API
            itemsPerPage: itemsPerPage,
          }
        });
        setListings(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [address, page, gender]); // Add gender to dependency array

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAddress(search);
    setPage(1);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setPage(1); // Reset to the first page when gender changes
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleViewClick = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    <div>
      <HomeNavBar />
      <Navbar 
        search={search} 
        onSearchChange={handleSearchChange} 
        onSearchSubmit={handleSearchSubmit} 
        gender={gender} 
        onGenderChange={handleGenderChange}
      />

      <h1 className="text-4xl font-bold mb-8 text-center">All Listings</h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-4">
        {listings.length > 0 ? (
          listings.map((listing, index) => (
            <div key={listing.id} className="border rounded-lg p-4 bg-white">
              <div className="mb-4">
                {listing.photo || listing.house_image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${listing.photo || listing.house_image}`} // Adjusted the image path
                    alt="Listing Photo"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) =>
                      (e.target.src = '/path/to/fallback-image.jpg')
                    } // Fallback image URL
                  />
                ) : (
                  <p className="text-gray-500 text-center">No photo available.</p>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2">{listing.title || listing.post}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700 mb-2">Location: {listing.location}</p>
                  <p className="text-gray-700 mb-2">Price: ${listing.price || listing.approx_rent}</p>
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Rooms: {listing.rooms || listing.number_of_people}</p>
                  <p className="text-gray-700 mb-2">Facilities: {listing.facilities || listing.highlights}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleViewClick(listing.id)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:ring-2 focus:ring-blue-600"
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="text-lg">{page} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;

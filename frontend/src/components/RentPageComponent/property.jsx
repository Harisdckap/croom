import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import HomeNavBar from '../Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PropertyPage = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('all');
  const [listingType, setListingType] = useState('all'); // Add state for listingType

  useEffect(() => {
    fetchListings();
  }, [searchParams]);

  const fetchListings = async () => {
    try {
      const params = {
        address: searchParams.get('address') || '',
        t: searchParams.get('t') || 'a',
        p: searchParams.get('p') || 1,
        gender: gender,
        listing_type: listingType, // Pass the listingType filter to the API
      };
      const response = await axios.get('http://127.0.0.1:8000/api/properties', { params });
      setListings(response.data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleListingTypeChange = (event) => {
    setListingType(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchParams({
      address: search,
      t: searchParams.get('t') || 'a',
      p: 1,
      gender: gender,
      
    });
  };

  const handleNavClick = (type) => {
    setSearchParams({
      address: searchParams.get('address') || '',
      t: type,
      p: 1,
      gender: gender,

    });
  };

  const handleViewClick = (id, location) => {
    console.log('ID:', id);
    console.log('Encoded ID:', btoa(id));
    console.log('Location:', location);
    console.log('Encoded Location:', encodeURIComponent(location));
    navigate(`/property/${btoa(id)}/${encodeURIComponent(location)}`);
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

      <h1 className="text-4xl font-bold mb-8 text-center">All Properties</h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 p-4">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing.id} className="border rounded-lg p-4 bg-white">
              <div className="mb-4">
                {listing.photo || listing.house_image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${listing.photo || listing.house_image}`} // Adjusted the image path
                    alt="Property Photo"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')} // Fallback image URL
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
                  onClick={() => handleViewClick(listing.id, listing.location)} // Pass location here
                  className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:ring-2 focus:ring-blue-600"
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2" />
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyPage;

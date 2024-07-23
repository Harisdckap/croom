import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HomeNavBar from '../Header';

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`);
        const fetchedListing = response.data;

        // Parse JSON strings to arrays
        fetchedListing.highlighted_features = fetchedListing.highlighted_features ? JSON.parse(fetchedListing.highlighted_features) : [];
        fetchedListing.amenities = fetchedListing.amenities ? JSON.parse(fetchedListing.amenities) : [];

        setListing(fetchedListing);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <HomeNavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{listing.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(listing.photos) && listing.photos.length > 0 ? (
            listing.photos.slice(0, 3).map((photo, index) => (
              <img
                key={index}
                src={`http://127.0.0.1:8000/storage/photos/${photo}`} // Adjust the source URL if needed
                alt={`Listing Photo ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-md"
              />
            ))
          ) : (
            <p className="text-gray-500">No photos available.</p>
          )}
        </div>
        <div className="mt-4">
          <p className="text-gray-700 mb-2">Location: {listing.location}</p>
          <p className="text-gray-700 mb-2">Price: ${listing.price}</p>
          <p className="text-gray-700 mb-2">Rooms: {listing.rooms}</p>
          <p className="text-gray-700 mb-2">Facilities: {listing.facilities}</p>
          <p className="text-gray-700 mb-2">Contact: {listing.contact}</p>
          <p className="text-gray-700 mb-2">Looking For: {listing.looking_for}</p>
          <p className="text-gray-700 mb-2">Occupancy: {listing.occupancy}</p>
          <div className="mb-2">
            <h3 className="text-lg font-semibold">Highlighted Features:</h3>
            {Array.isArray(listing.highlighted_features) && listing.highlighted_features.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {listing.highlighted_features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No highlighted features available.</p>
            )}
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold">Amenities:</h3>
            {Array.isArray(listing.amenities) && listing.amenities.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {listing.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No amenities available.</p>
            )}
          </div>
          <p className="text-gray-700 mb-1">Description: {listing.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;

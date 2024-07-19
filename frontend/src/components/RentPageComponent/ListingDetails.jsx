import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../RentPageComponent/Navbar";

const API_URL = "http://127.0.0.1:8000/api"; // Replace with your Laravel API base URL

const ListingHome = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/listings`)
      .then(response => {
        console.log(response.data);
        setListings(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-3 mt-20">Available Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center"
            >
              {/* Replace with your actual image URL */}
              <img
                src={`/storage/${listing.images[0]}`}
                alt={listing.title}
                className="w-full md:w-1/2 rounded-lg object-cover mb-4 md:mb-0 md:mr-4"
              />
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-bold mb-2">{listing.title}</h3>
                <p className="text-gray-700 mb-2">{listing.description}</p>
                <p className="text-gray-700 mb-4">{listing.price}</p>
                {/* Add more details or buttons as needed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingHome;

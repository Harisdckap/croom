import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaBed,
  FaPhoneAlt,
  FaTag,
  FaUser,
  FaStar,
  FaComments,
} from "react-icons/fa";
import { motion } from "framer-motion";
import HomeNavBar from "../Header";

const PropertyDetail = () => {
  const { id, location, listingType } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchProperty();
  }, [id, location, listingType]);

  const fetchProperty = async () => {
    try {
      const cleanLocation = location.trim();
      const encodedId = encodeURIComponent(id);
      const encodedLocation = encodeURIComponent(cleanLocation);
      const encodedListingType = encodeURIComponent(listingType);

      const response = await axios.get(`http://127.0.0.1:8000/api/property/${encodedId}/${encodedLocation}/${encodedListingType}`);
      setProperty(response.data.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  if (!property) {
    return <p>Loading property details...</p>;
  }

  const renderPropertyDetails = (type) => {
    switch (type) {
      case 'room':
        return (
          <>
            <DetailItem icon={<FaBed />} label="Rooms" value={property.rooms} />
            <DetailItem icon={<FaTag />} label="Facilities" value={property.facilities} />
          </>
        );
      case 'roommate':
        return (
          <>
            <DetailItem icon={<FaUser />} label="Looking For" value={property.looking_for_gender} />
            <DetailItem icon={<FaStar />} label="Occupancy" value={property.occupancy} />
          </>
        );
      case 'pg':
        return (
          <>
            <DetailItem icon={<FaTag />} label="Facilities" value={property.facilities} />
            <DetailItem icon={<FaStar />} label="Occupancy" value={property.occupancy} />
          </>
        );
      default:
        return <p>Details not available for this type.</p>;
    }
  };

  return (
    <div>
      <HomeNavBar />
      <motion.div
        className="container mx-auto p-6 bg-white shadow-lg pt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Section */}
          <motion.div
            className="flex-none w-full lg:w-1/3 mb-6 lg:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {property.photo ? (
              <img
                src={`http://127.0.0.1:8000/storage/${property.photo}`}
                alt="Property Photo"
                className="w-full h-60 object-cover rounded-lg shadow-lg"
                onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
              />
            ) : (
              <p className="text-gray-500 text-center">No photo available.</p>
            )}

            {/* Buttons Section */}
            <div className="mt-6 flex gap-4">
              <motion.a
                href={`tel:${property.contact}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPhoneAlt className="text-lg" />
                Call
              </motion.a>
              <motion.button
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaComments className="text-lg" />
                Chat
              </motion.button>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            className="flex-1"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{property.title}</h1>

            <div className="space-y-4">
              <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={property.location} />
              <DetailItem icon={<FaDollarSign />} label="Price" value={`$${property.price}`} />
              <DetailItem icon={<FaPhoneAlt />} label="Contact" value={property.contact} />

              {/* Render specific property details */}
              {renderPropertyDetails(property.listing_type)}
            </div>

            {/* Highlighted Features Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Highlighted Features</h3>
              {Array.isArray(property.highlighted_features) && property.highlighted_features.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                  {property.highlighted_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FaStar className="mr-2 text-yellow-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No highlighted features available.</p>
              )}
            </div>

            {/* Amenities Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Amenities</h3>
              {Array.isArray(property.amenities) && property.amenities.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-start">
                      <FaStar className="mr-2 text-green-500" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No amenities available.</p>
              )}
            </div>

            {/* Description Section */}
            <div className="mt-6">
              <p className="text-gray-700 text-lg">
                <strong>Description:</strong> {property.description}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Helper Component for rendering property details
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center text-lg text-gray-600">
    {icon && <span className="mr-2 text-gray-500">{icon}</span>}
    <p><strong>{label}:</strong> {value || 'Not available'}</p>
  </div>
);

export default PropertyDetail;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HomeNavBar from "../Header";
import {
    FaMapMarkerAlt,
    FaDollarSign,
    FaBed,
    FaPhoneAlt,
    FaTag,
    FaUser,
    FaStar,
    FaPhone,
    FaComments,
} from "react-icons/fa";

const ListingDetailPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/listings/${id}`
                );
                const fetchedListing = response.data;
                setListing(fetchedListing);
            } catch (error) {
                console.error("Error fetching listing:", error);
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
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section */}
                    <div className="flex-none w-full lg:w-1/3 mb-6 lg:mb-0">
                        {listing.photo ? (
                            <img
                                src={`http://127.0.0.1:8000/storage/${listing.photo}`} // Adjust this based on your actual image path
                                alt="Listing Photo"
                                className="w-full h-60 object-cover rounded-lg shadow-lg"
                                onError={(e) =>
                                    (e.target.src =
                                        "/path/to/fallback-image.jpg")
                                } // Fallback image URL
                            />
                        ) : (
                            <p className="text-gray-500 text-center">
                                No photo available.
                            </p>
                        )}

                        {/* Buttons Section */}
                        <div className="mt-6 flex gap-4">
                            <a
                                href={`tel:${listing.contact}`}
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
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                            {listing.title}
                        </h1>

                        <div className="space-y-4">
                            <div className="flex items-center text-lg text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {listing.location}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaDollarSign className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Price:</strong> ${listing.price}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaBed className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Rooms:</strong> {listing.rooms}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Facilities:</strong>{" "}
                                    {listing.facilities}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaPhoneAlt className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Contact:</strong> {listing.contact}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaUser className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Looking For:</strong>{" "}
                                    {listing.looking_for}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaStar className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Occupancy:</strong>{" "}
                                    {listing.occupancy}
                                </p>
                            </div>
                        </div>

                        {/* Highlighted Features Section */}
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                Highlighted Features
                            </h3>
                            {Array.isArray(listing.highlighted_features) &&
                            listing.highlighted_features.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                                    {listing.highlighted_features.map(
                                        (feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <FaStar className="mr-2 text-yellow-500" />
                                                {feature}
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    No highlighted features available.
                                </p>
                            )}
                        </div>

                        {/* Amenities Section */}
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                Amenities
                            </h3>
                            {Array.isArray(listing.amenities) &&
                            listing.amenities.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                                    {listing.amenities.map((amenity, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <FaStar className="mr-2 text-green-500" />
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">
                                    No amenities available.
                                </p>
                            )}
                        </div>

                        {/* Description Section */}
                        <div className="mt-6">
                            <p className="text-gray-700 text-lg">
                                <strong>Description:</strong>{" "}
                                {listing.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailPage;

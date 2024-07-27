import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HomeNavBar from "../Header";
import { FaMapMarkerAlt, FaDollarSign, FaBed, FaPhoneAlt, FaTag, FaUser, FaStar, FaPhone, FaComments } from "react-icons/fa";

const RoommatesDetailPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/requirements/${id}`);
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
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section */}
                    <div className="flex-none w-full lg:w-1/3 mb-6 lg:mb-0">
                        {listing.photo ? (
                            <img
                                src={`http://127.0.0.1:8000/storage/${listing.photo}`} // Adjust this based on your actual image path
                                alt="Listing Photo"
                                className="w-full h-60 object-cover rounded-lg shadow-lg"
                                onError={(e) =>
                                    (e.target.src = "/path/to/fallback-image.jpg")
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
                                    <strong>Location:</strong> {listing.location}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaDollarSign className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Approx Rent:</strong> ${listing.approx_rent}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaBed className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Room Type:</strong> {listing.room_type}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Highlights:</strong> {listing.highlights}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaUser className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Looking For:</strong> {listing.looking_for}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>PG Interested:</strong> {listing.pg_interested}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaStar className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Post:</strong> {listing.post}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Listing Type:</strong> {listing.listing_type}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoommatesDetailPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    FaUsers
} from "react-icons/fa";
import HomeNavBar from "../Header";

const RoommatesDetailPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/roommates/${id}`
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
                        {listing.house_image ? (
                            <img
                                src={`http://127.0.0.1:8000/storage/${listing.house_image}`}
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
                                <Link to="/PlanPage">
                                    {" "}
                                    <FaPhone className="text-lg" />
                                    Call
                                </Link>
                            </a>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
                                <Link to="/PlanPage">
                                    {" "}
                                    <FaComments className="text-lg" />
                                    Chat
                                </Link>
                            </button>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                            {listing.title}
                        </h1>

                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {listing.location}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaDollarSign className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Approx Rent:</strong> $
                                    {listing.approx_rent}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaBed className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Room Type:</strong>{" "}
                                    {listing.room_type}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Highlights:</strong>{" "}
                                    {listing.highlights}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaUser className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Looking For:</strong>{" "}
                                    {listing.looking_for}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaStar className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Post:</strong> {listing.post}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Listing Type:</strong>{" "}
                                    {listing.listing_type}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaUsers className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Occupancy:</strong>{" "}
                                    {listing.occupancy}
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className="flex items-center text-lg text-gray-600"
                            >
                                <FaUsers className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Number of People:</strong>{" "}
                                    {listing.number_of_people}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default RoommatesDetailPage;

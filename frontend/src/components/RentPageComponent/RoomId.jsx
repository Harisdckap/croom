import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
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
import { motion } from "framer-motion";

const RoomDetailPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/rooms/${id}`
                );
                const fetchedRoom = response.data;
                setRoom(fetchedRoom);
            } catch (error) {
                console.error("Error fetching room:", error);
            }
        };

        fetchRoom();
    }, [id]);

    if (!room) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <HomeNavBar />
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
                className="container mx-auto p-6 bg-white rounded-lg shadow-lg"
            >
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section */}
                    <motion.div 
                        initial={{ x: -100 }} 
                        animate={{ x: 0 }} 
                        transition={{ duration: 0.5 }}
                        className="flex-none w-full lg:w-1/3 mb-6 lg:mb-0"
                    >
                        {room.photo ? (
                            <img
                                src={`http://127.0.0.1:8000/storage/${room.photo}`} // Adjust this based on your actual image path
                                alt="Room Photo"
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
                                href={`tel:${room.contact}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                            >
                                <Link to="/PlanPage">
                                <FaPhone className="text-lg" />
                                Call
                                </Link>
                            </a>
                           <Link to="/PlanPage"><button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600">
                                <FaComments className="text-lg" />
                                Chat
                            </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Details Section */}
                    <motion.div 
                        initial={{ x: 100 }} 
                        animate={{ x: 0 }} 
                        transition={{ duration: 0.5 }}
                        className="flex-1"
                    >
                        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
                            {room.title}
                        </h1>

                        <div className="space-y-4">
                            <div className="flex items-center text-lg text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {room.location}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaDollarSign className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Price:</strong> ${room.price}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaBed className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Rooms:</strong> {room.rooms}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaTag className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Facilities:</strong>{" "}
                                    {room.facilities}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaPhoneAlt className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Contact:</strong> {room.contact}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaUser className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Looking For:</strong>{" "}
                                    {room.looking_for}
                                </p>
                            </div>
                            <div className="flex items-center text-lg text-gray-600">
                                <FaStar className="mr-2 text-gray-500" />
                                <p>
                                    <strong>Occupancy:</strong>{" "}
                                    {room.occupancy}
                                </p>
                            </div>
                        </div>

                        {/* Highlighted Features Section */}
                        <motion.div 
                            initial={{ y: 50 }} 
                            animate={{ y: 0 }} 
                            transition={{ duration: 0.5 }}
                            className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                Highlighted Features
                            </h3>
                            {Array.isArray(room.highlighted_features) &&
                            room.highlighted_features.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                                    {room.highlighted_features.map(
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
                        </motion.div>

                        {/* Amenities Section */}
                        <motion.div 
                            initial={{ y: 50 }} 
                            animate={{ y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md"
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                Amenities
                            </h3>
                            {Array.isArray(room.amenities) &&
                            room.amenities.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700 space-y-2 pl-5">
                                    {room.amenities.map((amenity, index) => (
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
                        </motion.div>

                        {/* Description Section */}
                        <motion.div 
                            initial={{ y: 50 }} 
                            animate={{ y: 0 }} 
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-6"
                        >
                            <p className="text-gray-700 text-lg">
                                <strong>Description:</strong>{" "}
                                {room.description}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default RoomDetailPage;

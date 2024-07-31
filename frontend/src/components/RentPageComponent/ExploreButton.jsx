import React from "react";
import { Link } from "react-router-dom";

const ExploreButton = () => {
    const address = "Chennai"; 
    const page = 0;
    const type = "a"; 

    // Construct the URL with query parameters
    const url = `/property?address=${encodeURIComponent(address)}&p=${page}&t=${type}`;

    return (
        <Link
            to={url}
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
        >
            Explore Rooms
        </Link>
    );
};

export default ExploreButton;

import React from "react";
import { useNavigate } from "react-router-dom";

const AddListingButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Check if the auth token is present
        const authToken = localStorage.getItem("auth_token");

        if (authToken) {
            // Navigate to the PostRequirementPage if auth token is present
            navigate("/PostRequirementPage");
        } else {
            // Navigate to the login page if auth token is not present
            navigate("/login");
        }
    };

    return (
        <button
            onClick={handleClick}
            className="text-blue-500 hover:underline ml-4 border-2 border-blue-500 px-4 py-2 rounded"
        >
            Add Listing
        </button>
    );
};

export default AddListingButton;

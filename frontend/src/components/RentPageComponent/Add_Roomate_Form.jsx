import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddRequirement.css";

const AddRequirement = () => {
    const [lookingFor, setLookingFor] = useState("Any");
    const [roomType, setRoomType] = useState("Single");
    const [pgInterested, setPgInterested] = useState("");
    const [highlights, setHighlights] = useState("");
    const [location, setLocation] = useState("");
    const [approxRent, setApproxRent] = useState("");
    const [post, setPost] = useState("");
    const [requirements, setRequirements] = useState([]); // Ensure this is initialized as an array

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/requirements"
                );
                if (Array.isArray(response.data)) {
                    // Ensure response data is an array
                    setRequirements(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching requirements:", error);
            }
        };

        fetchRequirements();
    }, []);

    const showToast = (message, type = "error") => {
        if (type === "success") {
            toast.success(message, { position: "top-center" });
        } else {
            toast.error(message, { position: "top-center" });
        }
    };

    const validateInputs = () => {
        if (!location) {
            showToast("Location is required");
            return false;
        }
        if (!roomType) {
            showToast("Room type is required");
            return false;
        }

        if (!approxRent || isNaN(approxRent)) {
            showToast("Valid approx rent amount is required");
            return false;
        }

        if (!pgInterested) {
            showToast("PG interested field is required");
            return false;
        }

        if (!highlights) {
            showToast("Highlights are required");
            return false;
        }

        if (!post) {
            showToast("Post is required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        const newRequirement = {
            location,
            looking_for: "Room",
            looking_for_gender: lookingFor,
            approx_rent: approxRent,
            room_type: roomType,
            highlights,
            pg_interested: pgInterested,
            post,
            listing_type: "roommates", // Default value
        };

        try {
            await axios.post(
                "http://127.0.0.1:8000/api/requirements",
                newRequirement
            );
            setRequirements((prevRequirements) => [
                ...prevRequirements,
                newRequirement,
            ]); // Use prevRequirements to avoid stale state
            // Reset form fields
            setLocation("");
            setApproxRent("");
            setPost("");
            setLookingFor("Any");
            setRoomType("Single");
            setHighlights("");
            setPgInterested("");
            showToast("Requirement added successfully!", "success");
        } catch (error) {
            console.error("Error adding requirement:", error);
            showToast("Failed to add requirement");
        }
    };

    const handleCancel = () => {
        // Reset form fields
        setLocation("");
        setApproxRent("");
        setPost("");
        setLookingFor("Any");
        setRoomType("Single");
        setHighlights("");
        setPgInterested("");
    };

    return (
        <div className="max-w-6xl mx-auto p-16 bg-white shadow-md rounded-md mt-4 relative">
            <div className="absolute top-4 right-4">
                <button
                    onClick={handleCancel}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Roommate For Your Room</h1>
                <p className="text-gray-500 mt-2">
                    So that other users can contact you
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-32 mt-12">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Add Your Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <fieldset className="border p-3 px-10">
                        <legend className="text-base font-medium text-gray-900">
                            Looking Gender For
                        </legend>
                        <div className="mt-2 space-x-4">
                            {["Male", "Female", "Any"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-8 py-3 border rounded-md text-sm font-medium ${
                                        lookingFor === option
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setLookingFor(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div className="flex gap-32 mt-16">
                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Approx Rent
                            </label>
                            <input
                                type="text"
                                value={approxRent}
                                onChange={(e) => setApproxRent(e.target.value)}
                                className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                            />
                        </div>
                    </div>
                    <fieldset className="border p-3 px-10">
                        <legend className="text-base font-medium text-gray-900">
                            Room Type
                        </legend>
                        <div className="mt-2 space-x-4">
                            {["Single", "Shared", "Any"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-8 py-3 border rounded-md text-sm font-medium ${
                                        roomType === option
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setRoomType(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div className="mt-10">
                    <h2 className="text-lg font-medium text-gray-900 mt-16">
                        Choose Highlights for Your Property
                    </h2>
                    <div className="mt-6 space-y-2 flex items-center justify-around">
                        {[
                            "Working full time",
                            "College student",
                            "25+ age",
                            "Working night shift",
                            "Pure vegetarian",
                        ].map((option) => (
                            <button
                                type="button"
                                key={option}
                                className={`mr-2 leading-tight rounded-lg bg-gray-100 px-7 py-2 hover:bg-gray-200 ${
                                    highlights === option
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => setHighlights(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-12 space-y-4">
                    <div className="flex gap-16">
                        <fieldset className="border w-1/2 py-3">
                            <legend className="text-base font-medium text-gray-900">
                                Are You Interested in PG Too?
                            </legend>
                            <div className="mt-2 space-x-4">
                                {["Yes", "No"].map((option) => (
                                    <button
                                        type="button"
                                        key={option}
                                        className={`px-8 py-3 border rounded-md text-sm font-medium ${
                                            pgInterested === option
                                                ? "bg-blue-500 text-white"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() => setPgInterested(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700">
                        Write More About Your Requirement
                    </label>
                    <textarea
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        rows="4"
                        className="locationInput mt-1 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm px-2 py-2"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRequirement;

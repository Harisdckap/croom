import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRequirement = () => {
    const [lookingFor, setLookingFor] = useState("Any");
    const [roomType, setRoomType] = useState("Single");
    const [highlights, setHighlights] = useState("");
    const [location, setLocation] = useState("");
    const [approxRent, setApproxRent] = useState("");
    const [post, setPost] = useState("");
    const [occupancy, setOccupancy] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [requirements, setRequirements] = useState([]);
    const [houseImage, setHouseImage] = useState(null); // Add state for image
    const [imagePreview, setImagePreview] = useState(null); // Add state for image preview
    const fileInputRef = useRef(); // Create a ref for file input

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/roommates");
                if (Array.isArray(response.data)) {
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
        if (!highlights) {
            showToast("Highlights are required");
            return false;
        }
        if (!post) {
            showToast("Post is required");
            return false;
        }
        if (!occupancy) {
            showToast("Occupancy is required");
            return false;
        }
        if (!numberOfPeople || isNaN(numberOfPeople)) {
            showToast("Valid number of people is required");
            return false;
        }
        if (!houseImage) {
            showToast("House image is required");
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHouseImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
    
        const formData = new FormData();
        formData.append("location", location);
        formData.append("looking_for", "Room");
        formData.append("looking_for_gender", lookingFor);
        formData.append("approx_rent", approxRent);
        formData.append("room_type", roomType);
        formData.append("highlights", highlights);
        formData.append("post", post);
        formData.append("listing_type", "roommates");
        formData.append("occupancy", occupancy);
        formData.append("number_of_people", numberOfPeople);
        formData.append("house_image", houseImage);
      console.log(formData);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/roommates", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Response:", response.data); // Log response data
            setRequirements((prevRequirements) => [
                ...prevRequirements,
                {
                    location,
                    looking_for: "Room",
                    looking_for_gender: lookingFor,
                    approx_rent: approxRent,
                    room_type: roomType,
                    highlights,
                    post,
                    listing_type: "roommates",
                    occupancy,
                    number_of_people: numberOfPeople,
                    house_image: URL.createObjectURL(houseImage)
                },
            ]);
            handleCancel(); // Reset the form
            showToast("Requirement added successfully!", "success");
        } catch (error) {
            console.error("Error adding requirement:", error);
            showToast(`Failed to add requirement: ${error.message}`); // Log detailed error
        }
    };
    

    const handleCancel = () => {
        setLocation("");
        setApproxRent("");
        setPost("");
        setLookingFor("Any");
        setRoomType("Single");
        setHighlights("");
        setOccupancy("");
        setNumberOfPeople("");
        setHouseImage(null);
        setImagePreview(null); // Clear image preview
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-md mt-4 relative">
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
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Add Your Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-base font-medium text-gray-900">Looking Gender For</legend>
                        <div className="mt-2 space-x-4">
                            {["Male", "Female", "Any"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Approx Rent</label>
                        <input
                            type="text"
                            value={approxRent}
                            onChange={(e) => setApproxRent(e.target.value)}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-base font-medium text-gray-900">Room Type</legend>
                        <div className="mt-2 space-x-4">
                            {["Single", "Double", "Triple"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Highlights</label>
                        <input
                            type="text"
                            value={highlights}
                            onChange={(e) => setHighlights(e.target.value)}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Description</label>
                        <textarea
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            className="mt-1 block w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Occupancy</label>
                        <input
                            type="text"
                            value={occupancy}
                            onChange={(e) => setOccupancy(e.target.value)}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of People</label>
                        <input
                            type="text"
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
                            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                </div>
                <div className="mt-8">
                    <label className="block text-sm font-medium text-gray-700">House Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                        className="mt-1 block w-full text-sm"
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Preview" className="max-w-xs h-auto rounded-md" />
                        </div>
                    )}
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-blue-500 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddRequirement;

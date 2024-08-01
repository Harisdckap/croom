

// export default AddRoomForm;
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "../RentPageComponent/Roomate.css";

const AddRoomForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        rooms: "",
        facilities: "",
        contact: "",
        looking_for_gender: "any",
        looking_for: "Roommate",
        occupancy: "any",
        photo: null,
        highlighted_features: [],
        amenities: [],
        description: "",
        listing_type: "room",
    });

    const highlightProperty = [
        "Working full time",
        "College student",
        "25+ age",
        "Working night shift",
        "Pure vegetarian",
    ];

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/requirements");
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
        if (!location.trim()) {
            showToast("Location is required");
            return false;
        }
        if (!roomType.trim()) {
            showToast("Room type is required");
            return false;
        }
        if (!approxRent.trim() || isNaN(approxRent) || approxRent <= 0) {
            showToast("Valid approx rent amount is required");
            return false;
        }
        if (selectedHighlights.length === 0) {
            showToast("At least one highlight is required");
            return false;
        }
        if (!post.trim()) {
            showToast("Post is required");
            return false;
        }
        if (!numPeople.trim() || isNaN(numPeople) || numPeople <= 0) {
            showToast("Valid number of people is required");
            return false;
        }
        if (!occupancy.trim()) {
            showToast("Occupancy is required");
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
            highlights: selectedHighlights.join(", "),
            post,
            listing_type: "roommates",
            occupancy,
            num_people: numPeople
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/listings",
                uploadData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Room added successfully:", response.data);
            setFormData({
                title: "",
                location: "",
                price: "",
                rooms: "",
                facilities: "",
                contact: "",
                looking_for_gender: "Any",
                looking_for: "male",
                occupancy: "any",
                photo: null,
                highlighted_features: [],
                amenities: [],
                description: "",
                listing_type: "room",
            });
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            showToast("Room added successfully", "success");
        } catch (error) {
            console.error("Error adding requirement:", error);
            showToast("Failed to add requirement");
        }
    };

    const handleCancel = () => {
        setLocation("");
        setApproxRent("");
        setPost("");
        setLookingFor("Any");
        setRoomType("Single");
        setSelectedHighlights([]);
        setOccupancy("");
        setNumPeople("");
    };

    const handleHighlightClick = (highlight) => {
        setSelectedHighlights((prevHighlights) =>
            prevHighlights.includes(highlight)
                ? prevHighlights.filter((item) => item !== highlight)
                : [...prevHighlights, highlight]
        );
    };

    const handleFileClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        console.log(files);
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-md shadow-md mt-4">
                  <div className="absolute top-6 right-[3.5rem]">
                <Link to="/PostRequirementPage">
                    <button
                        onClick={handleCancel}
                        className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
                        aria-label="Close"
                    >
                        X
                    </button>
                </Link> 
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
                                            ? "color"
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
                                type="number"
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
                                            ? "color"
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
                <div className="flex gap-32">
                    <div className="mt-11">
                        <label className="block text-sm font-medium text-gray-700">
                            Occupancy
                        </label>
                        <input
                            type="text"
                            value={occupancy}
                            onChange={(e) => setOccupancy(e.target.value)}
                            className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mt-11">
                        <label className="block text-sm font-medium text-gray-700">
                            Number of People
                        </label>
                        <input
                            type="number"
                            value={numPeople}
                            onChange={(e) => setNumPeople(e.target.value)}
                            className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Looking For Gender
                    </label>
                    <div className="mt-2 flex space-x-4">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    looking_for_gender: "any",
                                }))
                            }
                            className={`px-4 py-2 border ${
                                formData.looking_for_gender === "any"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-800"
                            } border-gray-800 rounded-md`}
                        >
                            Any
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    looking_for_gender: "male",
                                }))
                            }
                            className={`px-4 py-2 border ${
                                formData.looking_for_gender === "male"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-800"
                            } border-gray-800 rounded-md`}
                        >
                            Male
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    looking_for_gender: "female",
                                }))
                            }
                            className={`px-4 py-2 border ${
                                formData.looking_for_gender === "female"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-800"
                            } border-gray-800 rounded-md`}
                        >
                            Female
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Occupancy
                    </label>
                    <div className="mt-2 flex space-x-4">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    occupancy: "any",
                                }))
                            }
                            className={`px-4 py-2 border ${
                                formData.occupancy === "any"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-800"
                            } border-gray-800 rounded-md`}
                        >
                            Any
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    occupancy: "single",
                                }))
                            }
                            className={`px-4 py-2 border ${
                                formData.occupancy === "single"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-800"
                            } border-gray-800 rounded-md`}
                        >
                            Single
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    occupancy: "shared",
                                }))
                            }
                            className={`px-4 py-2 border ${
                                formData.occupancy === "shared"
                                    ? "bg-gray-800 text-white"
                                    : "bg-white text-gray-800"
                            } border-gray-800 rounded-md`}
                        >
                            Shared
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Photo
                    </label>
                    <input
                        name="photo"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 h-32 w-32 object-cover rounded-md"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Highlighted Features
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {allHighlightedFeatures.map((feature) => (
                            <button
                                type="button"
                                key={feature}
                                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                                    formData.highlighted_features.includes(
                                        feature
                                    )
                                        ? "color"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleFeatureClick(feature)}
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Amenities
                    </label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {allAmenities.map((amenity) => (
                            <button
                                type="button"
                                key={amenity}
                                className={`py-2 px-4 border rounded-md text-sm font-medium ${
                                    formData.amenities.includes(amenity)
                                        ? "color"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleAmenityClick(amenity)}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        rows="4"
                        className="locationInput mt-2 block w-full border border-gray-300 rounded-md shadow-sm sm:text-sm px-2 py-2"
                    ></textarea>
                </div>
                <div className="text-center ">
                    <button
                        type="submit"
                        className="px-8 py-2 color text-white font-medium rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
                <ToastContainer />
            </form>
        </div>
    );


    
};

export default AddRequirement;

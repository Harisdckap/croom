import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const AddRoomForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        price: "",
        room_type: "1RK",

        contact: "",
        looking_for_gender: "any",
        looking_for: "Roommate",
        occupancy: "Single Occupancy",
        photo: null,
        highlighted_features: [],
        amenities: [],
        description: "",
        listing_type: "room",
    });

    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const allHighlightedFeatures = [
        "Attached washroom",
        "Balcony",
        "Air conditioning",
        "Swimming pool",
        "Gym",
        "Parking",
    ];
    const allAmenities = [
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Hot Water",
        "Refrigerator",
        "Microwave",
    ];

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "photo") {
            const file = files[0];
            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "image/gif",
                "image/svg+xml",
            ];

            if (file && validTypes.includes(file.type)) {
                if (imagePreview) URL.revokeObjectURL(imagePreview);
                setImagePreview(URL.createObjectURL(file));
                setFormData((prevState) => ({ ...prevState, photo: file }));
            } else {
                showToast(
                    "Please upload a valid image (JPEG, PNG, JPG, GIF, SVG)."
                );
            }
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleFeatureClick = (feature) => {
        setFormData((prevState) => {
            const highlighted_features =
                prevState.highlighted_features.includes(feature)
                    ? prevState.highlighted_features.filter(
                          (f) => f !== feature
                      )
                    : [...prevState.highlighted_features, feature];
            return { ...prevState, highlighted_features };
        });
    };

    const handleAmenityClick = (amenity) => {
        setFormData((prevState) => {
            const amenities = prevState.amenities.includes(amenity)
                ? prevState.amenities.filter((a) => a !== amenity)
                : [...prevState.amenities, amenity];
            return { ...prevState, amenities };
        });
    };

    const showToast = (message, type = "error") => {
        if (type === "success") {
            toast.success(message, { position: "top-center" });
        } else {
            toast.error(message, { position: "top-center" });
        }
    };

    const validateInputs = () => {
        if (!formData.title) {
            showToast("Title is required");
            return false;
        }
        if (!formData.location) {
            showToast("Location is required");
            return false;
        }

        if (!formData.price || isNaN(formData.price)) {
            showToast("Valid rent amount is required");
            return false;
        }

        if (!formData.room_type) {
            showToast("Room type is required");
            return false;
        }

      

        if (!formData.contact) {
            showToast("Contact is required");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        const uploadData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== "photo") {
                const value = Array.isArray(formData[key])
                    ? JSON.stringify(formData[key])
                    : formData[key];
                uploadData.append(key, value);
            }
        });

        if (formData.photo) {
            uploadData.append("photo", formData.photo);
        }

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
                room_type: "1RK",
                contact: "",
                looking_for_gender: "any",
                looking_for: "Roommate",
                occupancy: "Single Occupancy",
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
            console.error(
                "There was an error adding the room:",
                error.response.data
            );
            showToast("There was an error adding the room.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-md shadow-md mt-4">
            <div className="absolute top-6 right-[3.5rem]">
                <Link to="/PostRequirementPage">
                    <button
                        className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
                        aria-label="Close"
                    >
                        X
                    </button>
                </Link>
            </div>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Add Room</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Title
                        </label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Location
                        </label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Price
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Room Type
                        </label>
                        <div className="mt-2 space-x-4">
                            {["1RK", "1BHK", "2BHK", "3BHK"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        formData.room_type === option
                                            ? "bg-gray-800 text-white"
                                            : "bg-white text-gray-800 hover:bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            room_type: option,
                                        }))
                                    }
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Contact
                        </label>
                        <input
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="Contact"
                            className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">
                            Looking For Gender
                        </label>
                        <div className="mt-2 space-x-4">
                            {["any", "male", "female"].map((option) => (
                                <button
                                    type="button"
                                    key={option}
                                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                        formData.looking_for_gender === option
                                            ? "bg-gray-800 text-white"
                                            : "bg-white text-gray-800 hover:bg-gray-100"
                                    }`}
                                    onClick={() =>
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            looking_for_gender: option,
                                        }))
                                    }
                                >
                                    {option.charAt(0).toUpperCase() +
                                        option.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">
                        Occupancy
                    </label>
                    <div className="mt-2 space-x-4">
                        {[
                            "Single Occupancy",
                            "Double Occupancy",
                            "Family Occupancy",
                            "Bachelor Occupancy",
                        ].map((option) => (
                            <button
                                type="button"
                                key={option}
                                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                    formData.occupancy === option
                                        ? "bg-gray-800 text-white"
                                        : "bg-white text-gray-800 hover:bg-gray-100"
                                }`}
                                onClick={() =>
                                    setFormData((prevState) => ({
                                        ...prevState,
                                        occupancy: option,
                                    }))
                                }
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

            
                <div className="mt-2 p-4 border-2 border-dashed border-gray-400">
                    <label className="block text-sm font-medium text-black">
                        Upload House Image
                    </label>
                    <input
                        ref={fileInputRef}
                        name="photo"
                        type="file"
                        onChange={handleChange}
                        accept="image/jpeg, image/png, image/jpg, image/gif, image/svg+xml"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4  file:border file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                className="max-h-40 rounded-md shadow-md"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">
                        Highlighted Features
                    </label>
                    <div className="mt-2 space-x-4">
                        {allHighlightedFeatures.map((feature) => (
                            <button
                                type="button"
                                key={feature}
                                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                    formData.highlighted_features.includes(
                                        feature
                                    )
                                        ? "bg-gray-800 text-white"
                                        : "bg-white text-gray-800 hover:bg-gray-100 border-gray-400"
                                }`}
                                onClick={() => handleFeatureClick(feature)}
                            >
                                {feature}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-black">
                        Amenities
                    </label>
                    <div className="mt-2 space-x-4">
                        {allAmenities.map((amenity) => (
                            <button
                                type="button"
                                key={amenity}
                                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                    formData.amenities.includes(amenity)
                                        ? "bg-gray-800 text-white"
                                        : "bg-white text-gray-800 hover:bg-gray-100 border-gray-400"
                                }`}
                                onClick={() => handleAmenityClick(amenity)}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-black">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm sm:text-sm"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-8 py-2 color text-white font-medium rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddRoomForm;

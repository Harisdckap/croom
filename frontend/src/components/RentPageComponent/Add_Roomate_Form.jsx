import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./AddRequirement.css";
import { Link } from "react-router-dom";

const AddRequirement = () => {
    const [lookingFor, setLookingFor] = useState("Any");
    const [roomType, setRoomType] = useState("Single");
    const [selectedHighlights, setSelectedHighlights] = useState([]);
    const [location, setLocation] = useState("");
    const [approxRent, setApproxRent] = useState("");
    const [post, setPost] = useState("");
    const [requirements, setRequirements] = useState([]);
    const [Occupency,setOccupency] = useState("")
    const [numPepole,setnumPepole] = useState("")

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
        if (!location) {
            showToast("Location is required");
            return false;
        }
        if (!roomType) {
            showToast("Room type is required");
            return false;
        }
        if (!approxRent) {
            showToast("Valid approx rent amount is required");
            return false;
        }
        if (!pgInterested) {
            showToast("PG interested field is required");
            return false;
        }
        if (selectedHighlights.length === 0) {
            showToast("At least one highlight is required");
            return false;
        }
        if (!post) {
            showToast("Post is required");
            return false;
        }
        if (!numPepole) {
            showToast("Number of pepole is required");
            return false;
        }
        if (!Occupency) {
            showToast("Occupency is required");
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
            pg_interested: pgInterested,
            post,
            listing_type: "roommates",
        };

        try {
            await axios.post("http://127.0.0.1:8000/api/requirements", newRequirement);
            setRequirements((prevRequirements) => [
                ...prevRequirements,
                newRequirement,
            ]);
            setLocation("");
            setApproxRent("");
            setPost("");
            setLookingFor("Any");
            setRoomType("Single");
            setSelectedHighlights([]);
            setPgInterested("");
            showToast("Requirement added successfully!", "success");
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
        setPgInterested("");
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
        <div className="max-w-6xl mx-auto p-16 bg-white shadow-md rounded-md mt-4 relative">
            <div className="absolute top-4 right-4">
               <Link to= "/PostRequirementPage" >
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
                <div className="flex gap-32 ">
                    <div className="mt-11">
                        <label className="block text-sm font-medium text-gray-700">
                         Occupency
                        </label>
                        <input
                            type="text"
                            value={Occupency}
                            onChange={(e) => setOccupency(e.target.value)}
                            className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div className="mt-11">
                        <label className="block text-sm font-medium text-gray-700">
                        Number of pepole
                        </label>
                        <input
                            type="text"
                            value={numPepole}
                            onChange={(e) => setnumPepole(e.target.value)}
                            className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    
                </div>
                <div className="mt-10">
                    <h2 className="text-lg font-medium text-gray-900 mt-16">
                        Choose Highlights for Your Property
                    </h2>
                    <div className="mt-6 space-y-2 flex items-center justify-around">
                        {highlightProperty.map((option) => (
                            <button
                                type="button"
                                key={option}
                                className={`mr-2 leading-tight rounded-lg bg-gray-100 px-7 py-2 hover:bg-gray-200 ${
                                    selectedHighlights.includes(option)
                                        ? "color"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleHighlightClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                <label className="text-sm text-gray-600 mt-12 block font-medium">
                    Upload 3 Photos of your room
                </label>
                <div className="grid place-items-center mt-2 border-2 border-dashed">
                    <div
                        role="button"
                        tabIndex="0"
                        className="w-full h-full"
                        onClick={handleFileClick}
                    >
                        <input
                            id="fileInput"
                            accept="image/png, image/jpg, image/webp, image/jpeg"
                            multiple
                            type="file"
                            autoComplete="off"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <div className="w-full h-full grid place-content-center p-3">
                            <label
                                htmlFor="fileInput"
                                className="text-sm text-gray-600"
                            >
                                <div className="bg-gray-100 upload-fonts w-full rounded-lg text-gray-600 flex flex-col items-center py-4 px-3 gap-0 mt-1 cursor-pointer md:text-xs md:gap-2 md:px-8 md:py-5">
                                    <img
                                        src="https://www.flatmate.in/upload-outline.svg"
                                        alt="upload-icon"
                                        className="w-5"
                                    />
                                    <p>Click or Drag Images To Upload</p>
                                    <p>(JPG, PNG, JPEG)</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <label className="block mt-10 text-sm font-medium text-gray-700">
                        Write More About Your Requirement
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
                        className="w-52 p-4 h-10 relative text py-2 mt-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-center text-white color hover:bg-indigo-700 focus:outline-none bgHover"
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

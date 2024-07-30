import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import HomeNavBar from "../Header";

const PropertyPage = () => {
    const [listings, setListings] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("all");

    useEffect(() => {
        fetchListings();
    }, [searchParams]);

    const fetchListings = async () => {
        try {
            const params = {
                address: searchParams.get("address") || "",
                t: searchParams.get("t") || "a",
                p: searchParams.get("p") || 1,
                gender: gender, // Pass the gender filter to the API
            };
            const response = await axios.get(
                "http://127.0.0.1:8000/api/properties",
                { params }
            );
            setListings(response.data.data);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({
            address: search,
            t: searchParams.get("t") || "a",
            p: 1,
            gender: gender, // Pass the gender filter to the query parameters
        });
    };

    const handleNavClick = (type) => {
        setSearchParams({
            address: searchParams.get("address") || "",
            t: type,
            p: 1,
            gender: gender, // Ensure gender is preserved
        });
    };

    return (
        <div>
            <HomeNavBar />
            <Navbar
                search={search}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                gender={gender}
                onGenderChange={handleGenderChange}
                setListingType={handleNavClick}
            />
            <div className="container mx-auto mt-8">
                {/* Render listings or roommates */}
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {listings.map((item) => (
                            <div key={item.id} className="p-4 border rounded-lg">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyPage;

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Navbar from './Navbar';
import HomeNavBar from '../Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const PropertyPage = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [gender, setGender] = useState('all');

    useEffect(() => {
        fetchListings();
    }, [searchParams]);

    const fetchListings = async () => {
        try {
            const params = {
                address: searchParams.get('address') || '',
                t: searchParams.get('t') || 'a',
                p: searchParams.get('p') || 1,
                gender: searchParams.get('gender') || 'all',
            };
            const response = await axios.get('http://127.0.0.1:8000/api/properties', { params });
            setListings(response.data.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('gender', event.target.value);
            return newParams;
        });
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({
            address: search,
            t: searchParams.get('t') || 'a',
            p: 1,
            gender: gender,
        });
    };

    const handleNavClick = (type) => {
        setSearchParams({
            address: searchParams.get('address') || '',
            t: type,
            p: 1,
            gender: gender,
        });
    };

    const handleViewClick = (id, location, listingType) => {
        const trimmedLocation = location.trim();
        navigate(`/property/${btoa(id)}/${encodeURIComponent(trimmedLocation)}/${listingType}`);
    };

    const renderSlider = (photos) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000, // 5000 milliseconds = 5 seconds
        };

        return (
            <Slider {...settings}>
                {photos.map((photo, index) => (
                    <div key={index}>
                        <img
                            src={`http://127.0.0.1:8000/storage/${photo}`}
                            alt="Property Photo"
                            className="w-full h-48 object-cover rounded-lg"
                            onError={(e) => (e.target.src = '/path/to/fallback-image.jpg')}
                        />
                    </div>
                ))}
            </Slider>
        );
    };

    const renderListing = (listing) => {
        let photos = [];
        if (listing.photos) {
            photos = JSON.parse(listing.photos).map(photo => photo.replace('\/', '/'));
        }

        switch (listing.listing_type) {
            case 'room':
                return (
                    <div key={listing.id} className="border rounded-lg p-4 bg-white">
                        <div className="mb-4">
                            {photos.length > 0 ? renderSlider(photos) : (
                                <p className="text-gray-500 text-center">No photo available.</p>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mb-2 gradient-text">{listing.title}</h2>
                        <div className="text-gray-700 mb-2 flex justify-between">
                            <div className="flex flex-col space-y-1">
                                <p>Location: {listing.location}</p>
                                <p>Price: &#8377;{listing.price}</p>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <p>Room Type: {listing.room_type}</p>
                                <p>Looking for: {listing.looking_for_gender}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handleViewClick(listing.id, listing.location, listing.listing_type)}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:ring-2 focus:ring-blue-600"
                            >
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                View
                            </button>
                        </div>
                    </div>
                );
            case 'pg':
                return (
                    <div key={listing.id} className="border rounded-lg p-4 bg-white">
                        <div className="mb-4">
                            {photos.length > 0 ? renderSlider(photos) : (
                                <p className="text-gray-500 text-center">No photo available.</p>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mb-2 gradient-text">{listing.pg_name}</h2>
                        <div className="text-gray-700 mb-2 flex justify-between">
                            <div className="flex flex-col space-y-1">
                                <p>Location: {listing.location}</p>
                                <p>Price: &#8377;{listing.occupancy_amount}</p>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <p>Type: {listing.pg_type}</p>
                                <p>Occupancy: {listing.occupancy_type}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handleViewClick(listing.id, listing.location, listing.listing_type)}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:ring-2 focus:ring-blue-600"
                            >
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                View
                            </button>
                        </div>
                    </div>
                );
            case 'roommates':
                return (
                    <div key={listing.id} className="border rounded-lg p-4 bg-white">
                        <div className="mb-4">
                            {photos.length > 0 ? renderSlider(photos) : (
                                <p className="text-gray-500 text-center">No photo available.</p>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mb-2 gradient-text">{listing.post}</h2>
                        <div className="text-gray-700 mb-2 flex justify-between">
                            <div className="flex flex-col space-y-1">
                                <p>Location: {listing.location}</p>
                                <p>Approx Rent: &#8377;{listing.approx_rent}</p>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <p>Number of People: {listing.number_of_people}</p>
                                <p>Looking for: {listing.looking_for_gender}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => handleViewClick(listing.id, listing.location, listing.listing_type)}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg focus:ring-2 focus:ring-blue-600"
                            >
                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                View
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
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
                onNavClick={handleNavClick}
            />
            <div className="max-w-6xl mx-auto py-10">
                {listings.length === 0 ? (
                    <p className="text-center text-gray-500">No listings found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map((listing) => renderListing(listing))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyPage;

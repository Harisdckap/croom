import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddRequirement.css";

const AddRequirement = () => {
  const [lookingFor, setLookingFor] = useState('Any');
  const [roomType, setRoomType] = useState('Single');
  const [pgInterested, setPgInterested] = useState('');
  const [highlights, setHighlights] = useState('');
  const [location, setLocation] = useState('');
  const [approxRent, setApproxRent] = useState('');
  const [post, setPost] = useState('');
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/requirements');
        setRequirements(response.data);
      } catch (error) {
        console.error('Error fetching requirements:', error);
      }
    };

    fetchRequirements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequirement = {
      location,
      looking_for: lookingFor,
      approx_rent: approxRent,
      room_type: roomType,
      highlights,
      pg_interested: pgInterested,
      post,
      listing_type: 'roommates', // Default value
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/requirements', newRequirement);
      setRequirements([...requirements, newRequirement]);
      // Reset form fields
      setLocation('');
      setApproxRent('');
      setPost('');
      setLookingFor('Any');
      setRoomType('Single');
      setHighlights('');
      setPgInterested('');
    } catch (error) {
      console.error('Error adding requirement:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-16 bg-white shadow-md rounded-md mt-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add your requirement</h1>
        <p className="text-gray-500 mt-2">so that other users can contact you</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-32 mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-700">Add Your Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              required
            />
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Looking for</legend>
            <div className="mt-2 space-x-4">
              {['Male', 'Female', 'Any'].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${
                    lookingFor === option ? 'color' : 'hover:bg-gray-100'
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
              <label className="block text-sm font-medium text-gray-700">Approx Rent</label>
              <input
                type="text"
                value={approxRent}
                onChange={(e) => setApproxRent(e.target.value)}
                className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
                required
              />
            </div>
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Room Type</legend>
            <div className="mt-2 space-x-4">
              {['Single', 'Shared', 'Any'].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${
                    roomType === option ? 'color' : 'hover:bg-gray-100'
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
          <h2 className="text-lg font-medium text-gray-900 mt-16">Choose Highlights for your property</h2>
          <div className="mt-6 space-y-2 flex items-center justify-around">
            {['Working full time', 'College student', '25+ age', 'Working night shift', 'Pure vegetarian'].map((option) => (
              <button
                type="button"
                key={option}
                className={`mr-2 leading-tight rounded-lg bg-gray-100 px-7 py-2 hover:bg-gray-200 ${highlights === option ? 'color' : 'hover:bg-gray-100'}`}
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
              <legend className="text-base font-medium text-gray-900">Are you interested in PG too?</legend>
              <div className="mt-2 space-x-4">
                {['Yes', 'No'].map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`px-8 py-3 border rounded-md text-sm font-medium ${
                      pgInterested === option ? 'color' : 'hover:bg-gray-100'
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
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Post</label>
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="locationInput mt-1 block px-2 py-3 border w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Requirement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequirement;

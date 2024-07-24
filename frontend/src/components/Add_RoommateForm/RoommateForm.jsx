import React, { useState } from 'react';
import "../Add_RoommateForm/Rommate.css";

export const RoommateForm = () => {
  const [lookingFor, setLookingFor] = useState('Any');
  const [roomType, setRoomType] = useState('Single');
  const [selectedHighlights, setSelectedHighlights] = useState([]);

  const handleFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const buttonLabels = [
    'Attached washroom',
    'Market nearby',
    'Attached balcony',
    'Close to metro station',
    'Public transport nearby',
    'Gated society',
    'No Restriction',
    'Newly built',
    'Separate washrooms',
    'House keeping',
    'Gym nearby',
    'Park nearby'
  ];

  const Amenities = [
    'TV',
    'Fridge',
    'kichen',
    'Wifi',
    'Machine',
    'AC',
    'PowerBackup',
    'Cook',
    'Parking'
  ];


  const toggleHighlight = (label) => {
    setSelectedHighlights((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-16 bg-white rounded-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add your requirement</h1>
        <p className="text-gray-500 mt-2">so that other users can contact you</p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-32 mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-700">Add Your Location</label>
            <input
              type="text"
              className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Looking for</legend>
            <div className="mt-2 space-x-4">
              {['Male', 'Female', 'Any'].map((option) => (
                <button
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
                className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Room Type</legend>
            <div className="mt-2 space-x-4">
              {['Single', 'Shared', 'Any'].map((option) => (
                <button
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
      </div>
      <label className="text-sm text-gray-600 block font-medium">Upload 3 Photos of your room</label>
      <div className="grid place-items-center mt-2 border-2 border-dashed ">
        <div role="button" tabIndex="0" className="w-full h-full" onClick={handleFileClick}>
          <input
            id="fileInput"
            accept="image/png, image/jpg, image/webp, image/jpeg"
            multiple
            type="file"
            autoComplete="off"
            style={{ display: 'none' }}
          />
          <div className="w-full h-full grid place-content-center p-3">
            <label htmlFor="fileInput" className="text-sm text-gray-600">
              <div className="bg-gray-100 upload-fonts w-full rounded-lg text-gray-600 flex flex-col items-center py-4 px-3 gap-0 mt-1 cursor-pointer md:text-xs md:gap-2 md:px-8 md:py-5">
                <img src="https://www.flatmate.in/upload-outline.svg" alt="upload-icon" className="w-5" />
                <p>Click or Drag Images To Upload</p>
                <p>(JPG, PNG, JPEG)</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <label className="text-sm text-gray-600 block font-medium">Choose Highlights for your room</label>
        <div className="flex gap-2 md:gap-y-3 items-center flex-wrap mt-3">
          {buttonLabels.map((label, index) => (
            <button
              key={index}
              className={`bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 md:px-6 md:py-2 text-xs rounded-full cursor-pointer ${
                selectedHighlights.includes(label) ? 'color ' : ''
              }`}
              onClick={() => toggleHighlight(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <label className="text-sm text-gray-600 block font-medium">Choose Highlights for your room</label>
        <div className="flex gap-2 md:gap-y-3 items-center flex-wrap mt-3">
          {Amenities.map((label, index) => (
            <button
              key={index}
              className={`bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 md:px-6 md:py-2 text-xs rounded-full cursor-pointer ${
                selectedHighlights.includes(label) ? 'color ' : ''
              }`}
              onClick={() => toggleHighlight(label)}
            >
              {label}
            </button>
          ))}
        </div>


        <div className="mt-8">
        <label className="block text-sm font-medium text-gray-700">
          Write your post:
          <textarea
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </label>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white color hover:bg-indigo-700 focus:outline-none bgHover"
        >
          Submit
        </button>
        <p className="mt-2 text-sm text-gray-500">Looking for a room ? Add Requirment</p>
      </div>
      </div>

    </div>
  );
};

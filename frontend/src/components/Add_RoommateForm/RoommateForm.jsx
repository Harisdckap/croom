import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Add_RoommateForm/Rommate.css";

export const RoommateForm = () => {
  const [lookingFor, setLookingFor] = useState('Any');
  const [roomType, setRoomType] = useState('Single');
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [postContent, setPostContent] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };


  const toggleHighlight = (label) => {
    setSelectedHighlights((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const showToastMessage = (message) => {
    toast.error(message, { position: "top-center" });
  };

  const validateInputs = () => {
    if (!location) {
      showToastMessage("Location is required");
      return false;
    }

    if (!rent || isNaN(rent)) {
      showToastMessage("Valid rent amount is required");
      return false;
    }

    if (!postContent) {
      showToastMessage("Post content is required");
      return false;
    }

    if (files.length < 3) {
      showToastMessage("Please upload at least 3 photos of your room");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      toast.success("Form submitted successfully", { position: "top-center" });
    }
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
                value={rent}
                onChange={(e) => setRent(e.target.value)}
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
            onChange={handleFileChange}
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
          <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700">
            Write your post:
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </label>
        </div>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white color hover:bg-indigo-700 focus:outline-none bgHover"
          >
            Submit
          </button>
          <ToastContainer />
          <p className="mt-2 text-sm text-gray-500">Looking for a room? Add Requirement</p>
        </div>
      </div>
    </div>
  );
};

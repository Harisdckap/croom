import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Add_PG = () => {
  const [pgType, setPgType] = useState('Both');
  const [mobileNum, setMobileNum] = useState('');
  const [pgName, setPgName] = useState('');
  const [pgAddress, setPgAddress] = useState('');
  const [occupancyType, setOccupancyType] = useState('');
  const [occupancyAmount, setOccupancyAmount] = useState('');
  const [pgFiles, setPgFiles] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pgPostContent, setPgPostContent] = useState('');

  const handleFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPgFiles(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const showToastMessage = (message) => {
    toast.error(message, { position: "top-center" });
  };

  const validateInputs = () => {
    if (!pgName) {
      showToastMessage("PG name is required");
      return false;
    }

    if (!mobileNum || isNaN(mobileNum)) {
      showToastMessage("Valid Mobile Number is required");
      return false;
    }

    if (!pgAddress) {
      showToastMessage("PG address is required");
      return false;
    }

    if (!occupancyType || !occupancyAmount || isNaN(occupancyAmount)) {
      showToastMessage("Please select an occupancy type and provide a valid amount");
      return false;
    }

    if (!pgFiles) {
      showToastMessage("Please upload at least 1 photo of your room");
      return false;
    }

    if (!pgPostContent) {
      showToastMessage("PG post content is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('pgType', pgType);
    formData.append('mobileNum', mobileNum);
    formData.append('pgName', pgName);
    formData.append('pgAddress', pgAddress);
    formData.append('occupancyType', occupancyType);
    formData.append('occupancyAmount', occupancyAmount);
    formData.append('pgFiles', pgFiles);
    formData.append('pgPostContent', pgPostContent);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pg_listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Form submitted successfully", { position: "top-center" });
      console.log(response.data);
    }
     catch (error) {
        console.log(error); 
        // console.error('Error details:', error.response?.data || error.message || error);
        // toast.error("Error submitting form", { position: "top-center" });
    }
  };

  const handleCancel = () => {
    setPgType('Both');
    setMobileNum('');
    setPgName('');
    setPgAddress('');
    setOccupancyType('');
    setOccupancyAmount('');
    setPgFiles(null);
    setImagePreview(null);
    setPgPostContent('');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md">
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
        <h1 className="text-3xl font-bold">Add your PG</h1>
        <p className="text-gray-500 mt-2">We are over a thousand tenants for you!</p>
      </div>
      <div className="space-y-6 mt-8">
        {/* Mobile Number */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              value={mobileNum}
              onChange={(e) => setMobileNum(e.target.value)}
              type="tel"
              className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
            />
          </div>
          {/* PG Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">PG Name</label>
            <input
              value={pgName}
              onChange={(e) => setPgName(e.target.value)}
              type="text"
              className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
            />
          </div>
        </div>
        {/* PG Address */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">PG Address</label>
          <input
            value={pgAddress}
            onChange={(e) => setPgAddress(e.target.value)}
            type="text"
            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
          />
        </div>
        {/* PG Type */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-base font-medium text-gray-900">PG Type</legend>
          <div className="flex gap-4 mt-2">
            {['Boys', 'Girls', 'Both'].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                  pgType === option ? 'bg-indigo-500 text-white' : 'hover:bg-gray-100'
                }`}
                onClick={() => setPgType(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
        {/* Occupancy */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-base font-medium text-gray-900">Occupancy</legend>
          <div className="flex gap-4 mt-2">
            {['Single', 'Double', 'Triple'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  id={`occupancy-${option}`}
                  name="occupancy"
                  type="radio"
                  value={option}
                  checked={occupancyType === option}
                  onChange={(e) => setOccupancyType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={`occupancy-${option}`} className="ml-2 block text-sm font-medium text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">{`Amount for ${occupancyType} Occupancy`}</label>
            <input
              value={occupancyAmount}
              onChange={(e) => setOccupancyAmount(e.target.value)}
              type="number"
              className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
              disabled={!occupancyType}
            />
          </div>
        </fieldset>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">PG Post Content</label>
          <textarea
            value={pgPostContent}
            onChange={(e) => setPgPostContent(e.target.value)}
            placeholder="Enter PG details here"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        {/* Image */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
          <div
            className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer"
            onClick={handleFileClick}
          >
            <input
              id="fileInput"
              accept="image/png, image/jpg, image/webp, image/jpeg"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {imagePreview ? (
              <div>
                <img
                  alt="Selected"
                  src={imagePreview}
                  className="mx-auto mb-4"
                  style={{ maxHeight: '200px' }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPgFiles(null);
                    setImagePreview(null);
                  }}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p>Click to upload or drag and drop</p>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCancel}
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Add_PG;

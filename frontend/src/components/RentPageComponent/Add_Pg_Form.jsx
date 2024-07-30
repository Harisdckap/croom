import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export const Add_PG = () => {
  const [pgType, setPgType] = useState('Both');
  const [mobileNum, setMobileNum] = useState('');
  const [pgName, setPgName] = useState('');
  const [pgAddress, setPgAddress] = useState('');
  const [singleOccupancy, setSingleOccupancy] = useState('');
  const [doubleOccupancy, setDoubleOccupancy] = useState('');
  const [tripleOccupancy, setTripleOccupancy] = useState('');
  const [pgFiles, setPgFiles] = useState([]);

  const handleFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    setPgFiles(e.target.files);
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

    if (!singleOccupancy || isNaN(singleOccupancy)) {
      showToastMessage("Valid single occupancy amount is required");
      return false;
    }

    if (!doubleOccupancy || isNaN(doubleOccupancy)) {
      showToastMessage("Valid double occupancy amount is required");
      return false;
    }

    if (!tripleOccupancy || isNaN(tripleOccupancy)) {
      showToastMessage("Valid triple occupancy amount is required");
      return false;
    }



    if (pgFiles.length < 1) {
      showToastMessage("Please upload at least 1 photo of your room");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      const formData = new FormData();
      formData.append('pgType', pgType);
      formData.append('mobileNum', mobileNum);
      formData.append('pgName', pgName);
      formData.append('pgAddress', pgAddress);
      formData.append('singleOccupancy', singleOccupancy);
      formData.append('doubleOccupancy', doubleOccupancy);
      formData.append('tripleOccupancy', tripleOccupancy);
      formData.append('pgPostContent', pgPostContent);

      Array.from(pgFiles).forEach((file, index) => {
        formData.append(`pgFiles[${index}]`, file);
      });

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/pg_listing', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success("Form submitted successfully", { position: "top-center" });
        console.log(response.data);
      } catch (error) {
        toast.error("Error submitting form", { position: "top-center" });
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleCancel = () => {
    // Reset form fields
    setPgType('Both');
    setMobileNum('');
    setPgName('');
    setPgAddress('');
    setSingleOccupancy('');
    setDoubleOccupancy('');
    setTripleOccupancy('');
    setPgPostContent('');
    setPgFiles([]);
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
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">PG Address</label>
          <input
            value={pgAddress}
            onChange={(e) => setPgAddress(e.target.value)}
            type="text"
            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
          />
        </div>
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
        <fieldset className="border p-4 rounded-md">
          <legend className="text-base font-medium text-gray-900">Occupancy</legend>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Single</label>
              <input
                value={singleOccupancy}
                onChange={(e) => setSingleOccupancy(e.target.value)}
                type="number"
                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Double</label>
              <input
                value={doubleOccupancy}
                onChange={(e) => setDoubleOccupancy(e.target.value)}
                type="number"
                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Triple</label>
              <input
                value={tripleOccupancy}
                onChange={(e) => setTripleOccupancy(e.target.value)}
                type="number"
                className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
              />
            </div>
          </div>
        </fieldset>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
          <div
            className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer"
            onClick={handleFileClick}
          >
            <input
              id="fileInput"
              accept="image/png, image/jpg, image/webp, image/jpeg"
              multiple
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div>
              <svg
                className="w-12 h-12 mx-auto mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7l10 10M17 7l-10 10"
                ></path>
              </svg>
              <p className="text-sm text-gray-500">Click or drag files to this area to upload</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Add_PG;
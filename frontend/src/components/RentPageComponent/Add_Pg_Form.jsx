import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Add_PG = () => {
  const [pgType, setPgType] = useState('Both');
  const [mobileNum, setMobileNum] = useState('');
  const [pgName, setPgName] = useState('');
  const [pgAddress, setPgAddress] = useState('');
  const [singleOccupancy, setSingleOccupancy] = useState('');
  const [doubleOccupancy, setDoubleOccupancy] = useState('');
  const [tripleOccupancy, setTripleOccupancy] = useState('');
  const [pgPostContent, setPgPostContent] = useState('');
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

    if (!pgPostContent) {
      showToastMessage("Post content is required");
      return false;
    }

    if (pgFiles.length < 1) {
      showToastMessage("Please upload at least 1 photo of your room");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    const formData = new FormData();
    formData.append('pgType', pgType);
    formData.append('mobileNum', mobileNum);
    formData.append('pgName', pgName);
    formData.append('pgAddress', pgAddress);
    formData.append('singleOccupancy', singleOccupancy);
    formData.append('doubleOccupancy', doubleOccupancy);
    formData.append('tripleOccupancy', tripleOccupancy);
    formData.append('pgPostContent', pgPostContent);
    Array.from(pgFiles).forEach(file => formData.append('pgFiles[]', file));

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pg_listings', formData, {
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
                className="w-8 h-8 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7l9 9 9-9"
                ></path>
              </svg>
              <p className="text-gray-600 mt-2">Click or Drag Images To Upload (JPG, PNG, JPEG)</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Write your post:</label>
          <textarea
            value={pgPostContent}
            onChange={(e) => setPgPostContent(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          ></textarea>
        </div>
        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="confirm"
            className="mr-2"
          />
          <label htmlFor="confirm" className="text-sm text-gray-500">I confirm that the information given in this form is true</label>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Submit
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Add_PG;

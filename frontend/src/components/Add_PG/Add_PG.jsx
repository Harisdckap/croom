import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Add_RoommateForm/Rommate.css";

export const Add_PG = () => {
  const [pgType, setPgType] = useState('Both');
  const [mobileNum, setmobileNum] = useState('');
  const [pgName, setPgName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [pgAddress, setPgAddress] = useState('');
  const [singleOccupancy, setSingleOccupancy] = useState('');
  const [doubleOccupancy, setDoubleOccupancy] = useState('');
  const [tripleOccupancy, setTripleOccupancy] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [maintenanceCharge, setMaintenanceCharge] = useState('');
  const [electricityCharges, setElectricityCharges] = useState('');
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
    if (!mobileNum) {
      showToastMessage("Mobile Number is required");
      return false;
    }

    if (!pgName) {
      showToastMessage("PG name is required");
      return false;
    }

    if (!ownerName) {
      showToastMessage("Owner name is required");
      return false;
    }

    if (!pgAddress) {
      showToastMessage("PG address is required");
      return false;
    }

    // if (!pgRent || isNaN(pgRent)) {
    //   showToastMessage("Valid rent amount is required");
    //   return false;
    // }

    if (!singleOccupancy ) {
      showToastMessage("Valid single occupancy amount is required");
      return false;
    }

    if (!doubleOccupancy) {
      showToastMessage("Valid double occupancy amount is required");
      return false;
    }

    if (!tripleOccupancy) {
      showToastMessage("Valid triple occupancy amount is required");
      return false;
    }

    if (!securityDeposit) {
      showToastMessage("Valid security deposit amount is required");
      return false;
    }

    if (!noticePeriod) {
      showToastMessage("Notice period is required");
      return false;
    }

    if (!maintenanceCharge) {
      showToastMessage("Valid maintenance charge amount is required");
      return false;
    }

    if (!electricityCharges) {
      showToastMessage("Valid electricity charges amount is required");
      return false;
    }

    if (!pgPostContent) {
      showToastMessage("Post content is required");
      return false;
    }

    // if (pgFiles.length < 2) {
    //   showToastMessage("Please upload at least 3 photos of your room");
    //   return false;
    // }

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
        <h1 className="text-3xl font-bold">Add your PG</h1>
        <p className="text-gray-500 mt-2">We`ve over thousand tenants for you!</p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-20 mt-12">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your name</label>
            <input
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              type="text"
              className="mt-1 block px-2 py-3 border w-72 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              value={mobileNum}
              onChange={(e) => setmobileNum(e.target.value)}
              type="number"
              className="mt-1 block px-2 py-3 border w-72 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">PG Name</label>
            <input
              value={pgName}
              onChange={(e) => setPgName(e.target.value)}
              type="text"
              className="mt-1 block px-2 py-3 border w-72 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-32 mt-16">
          <fieldset className="border mt-6 p-3 px-10">
            <legend className="text-base font-medium text-gray-900">PG Type</legend>
            <div className="mt-2 space-x-4">
              {['Boys', 'Girls', 'Both'].map((option) => (
                <button
                  key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${
                    pgType === option ? 'color' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setPgType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="mt-10 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">PG Address</label>
              <input
                value={pgAddress}
                onChange={(e) => setPgAddress(e.target.value)}
                type="text"
                className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-32 mt-16">
          <fieldset className="border mt-6 p-3 px-8">
            <legend className="text-base font-medium text-gray-900">Occupancy</legend>
            <div className="flex gap-20 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Single</label>
                <input
                  value={singleOccupancy}
                  onChange={(e) => setSingleOccupancy(e.target.value)}
                  type="number"
                  className="mt-1 block px-2 py-3 border w-64 border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Double</label>
                <input
                  value={doubleOccupancy}
                  onChange={(e) => setDoubleOccupancy(e.target.value)}
                  type="number"
                  className="mt-1 block px-2 py-3 border w-64 border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Triple</label>
                <input
                  value={tripleOccupancy}
                  onChange={(e) => setTripleOccupancy(e.target.value)}
                  type="number"
                  className="mt-1 block px-2 py-3 border w-64 border-gray-300 rounded-md shadow-sm sm:text-sm"
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="flex gap-24">
          <div className="mt-12">
            <div>
              <label className="block text-sm font-medium text-gray-700">Security Deposit</label>
              <input
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                type="text"
                className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div className="mt-10">
              <label className="block text-sm font-medium text-gray-700">Notice Period</label>
              <input
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(e.target.value)}
                type="text"
                className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-12">
            <div>
              <label className="block text-sm font-medium text-gray-700">Maintenance Charge (if any)</label>
              <input
                value={maintenanceCharge}
                onChange={(e) => setMaintenanceCharge(e.target.value)}
                type="text"
                className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div className="mt-10">
              <label className="block text-sm font-medium text-gray-700">Electricity Charges</label>
              <input
                value={electricityCharges}
                onChange={(e) => setElectricityCharges(e.target.value)}
                type="text"
                className="mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <label className="text-sm text-gray-600 mt-12 block font-medium">Upload 3 Photos of your room</label>
      <div className="grid place-items-center mt-2 border-2 border-dashed">
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
              value={pgPostContent}
              onChange={(e) => setPgPostContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </label>
        </div>
        <p className="mt-8 text-sm text-gray-500"><input type="checkbox" /> I confirm that the information given in this form is true</p>
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white color hover:bg-indigo-700 focus:outline-none bgHover"
          >
            Submit
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

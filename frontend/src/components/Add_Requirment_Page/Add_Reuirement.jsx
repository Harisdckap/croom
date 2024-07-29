import React, { useState } from 'react';
import "../Add_Requirment_Page/Add_Reuirement.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Add_Reuirement = () => {
  const [lookingFor, setLookingFor] = useState('Any'); 
  const [roomType, setRoomType] = useState('Single'); 
  const [mVisible, setmVisible] = useState('Yes make it public');
  const [team, setTeam] = useState('No');
  const [PG, setPG] = useState('No');
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [location, setLocation] = useState('');
  const [rent, setRent] = useState('');
  const [postContent, setPostContent] = useState('');

  const highlights = [
    "working full time",
    "collage student",
    "25+age",
    "working night shift",
    "will shift immididately",
    "Have pets"
  ];

  const toggleHighlight = (highlight) => {
    setSelectedHighlights(prevState =>
      prevState.includes(highlight)
        ? prevState.filter(h => h !== highlight)
        : [...prevState, highlight]
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

    if (!PG) {
      showToastMessage("Post content is required");
      return false;
    }

    if (!team) {
      showToastMessage("Post content is required");
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
    <div className="max-w-6xl mx-auto p-16 bg-white shadow-md rounded-md">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Add your </h1>
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
              className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
            />
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Looking for</legend>
            <div className="mt-2 space-x-4">
              {['Male', 'Female', 'Any'].map((option) => (
                <button
                  key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${lookingFor === option ? 'color' : 'hover:bg-gray-100'}`}
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
                type="number"
                className="locationInput mt-1 block px-2 py-3 border w-96 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <fieldset className="border p-3 px-10">
            <legend className="text-base font-medium text-gray-900">Room Type</legend>
            <div className="mt-2 space-x-4">
              {['Single', 'Shared', 'Any'].map((option) => (
                <button
                  value={option}
                  key={option}
                  className={`px-8 py-3 border rounded-md text-sm font-medium ${roomType === option ? 'color' : 'hover:bg-gray-100'}`}
                  onClick={() => setRoomType(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-10">
        <label className="text-sm text-gray-600 block font-medium">Choose Highlights for your room</label>
        <div className="flex gap-2 md:gap-y-3 items-center flex-wrap mt-5">
          {highlights.map((highlight) => (
            <button
              key={highlight}
              className={`bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 md:px-6 md:py-2 text-xs rounded-full cursor-pointer ${
                selectedHighlights.includes(highlight) ? 'color' : ''
              }`}
              onClick={() => toggleHighlight(highlight)}
            >
              {highlight}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 space-y-4">
        <div className="flex gap-16">
          <fieldset className="border w-1/2 py-3">
            <legend className="text-base font-medium text-gray-900">Are you interested in PG too?</legend>
            <div className="mt-2 space-x-4 flex items-center justify-center">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  className={`px-10 py-2 border rounded-md text-sm font-medium ${option === PG ? 'color' : 'hover:bg-gray-100'}`}
                  onClick={() => setPG(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="border w-1/2 py-3">
            <legend className="text-base font-medium text-gray-900">Are you interested in Making Team?</legend>            
            <div className="mt-2 space-x-4 flex items-center justify-center">
              {["Yes", "No"].map((option) => (
                <button 
                  key={option}
                  className={`px-10 py-2 border rounded-md text-sm font-medium ${team === option ? 'color' : 'hover:bg-gray-200'}`} 
                  onClick={() => setTeam(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-14">
        <fieldset className="border py-4">
          <legend className="text-base font-medium text-gray-900">Do you want to make your mobile visible to others?</legend>
          <div className="mt-2 ml-4 space-x-4">
            {["Yes make it public", "No make it private"].map((conBtn) => (
              <button 
                key={conBtn}
                className={`px-14 py-3 border rounded-md text-sm font-medium ${conBtn === mVisible ? 'color' : 'hover:bg-gray-200'}`}
                onClick={() => setmVisible(conBtn)}
              >
                {conBtn}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
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
          <ToastContainer />
        </button>
        <p className="mt-2 text-sm text-gray-500">Have room & roommate? Add room</p>
      </div>
    </div>
  );
};

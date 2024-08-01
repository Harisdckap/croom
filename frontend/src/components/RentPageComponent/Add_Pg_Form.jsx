// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';

// const Add_PG = () => {
//   const [pgType, setPgType] = useState('Both');
//   const [mobileNum, setMobileNum] = useState('');
//   const [pgName, setPgName] = useState('');
//   const [location, setlocation] = useState('');
//   const [occupancyType, setOccupancyType] = useState('');
//   const [occupancyAmount, setOccupancyAmount] = useState('');
//   const [image, setimage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [pgPostContent, setPgPostContent] = useState('');

//   const handleFileClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setimage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const showToastMessage = (message) => {
//     toast.error(message, { position: "top-center" });
//   };

//   const validateInputs = () => {
//     if (!pgName) {
//       showToastMessage("PG name is required");
//       return false;
//     }

//     if (!mobileNum || isNaN(mobileNum)) {
//       showToastMessage("Valid Mobile Number is required");
//       return false;
//     }

//     if (!location) {
//       showToastMessage("PG address is required");
//       return false;
//     }

//     if (!occupancyType || !occupancyAmount || isNaN(occupancyAmount)) {
//       showToastMessage("Please select an occupancy type and provide a valid amount");
//       return false;
//     }

//     if (!image) {
//       showToastMessage("Please upload at least 1 photo of your room");
//       return false;
//     }

//     if (!pgPostContent) {
//       showToastMessage("PG post content is required");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateInputs()) return;

//     const formData = new FormData();
//     formData.append('pgType', pgType);
//     formData.append('mobileNum', mobileNum);
//     formData.append('pgName', pgName);
//     formData.append('location', location);
//     formData.append('occupancyType', occupancyType);
//     formData.append('occupancyAmount', occupancyAmount);
//     formData.append('image', image);
//     formData.append('pgPostContent', pgPostContent);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/pg_listings', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       toast.success("Form submitted successfully", { position: "top-center" });
//       console.log(response.data);
//     }
//      catch (error) {
//         console.log(error); 
//         // console.error('Error details:', error.response?.data || error.message || error);
//         // toast.error("Error submitting form", { position: "top-center" });
//     }
//   };

//   const handleCancel = () => {
//     setPgType('Both');
//     setMobileNum('');
//     setPgName('');
//     setlocation('');
//     setOccupancyType('');
//     setOccupancyAmount('');
//     setimage(null);
//     setImagePreview(null);
//     setPgPostContent('');
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md mt-4">
//      <div className="absolute top-6 right-[3.5rem]">
//        <Link to = "/PostRequirementPage"> <button
//           onClick={handleCancel}
//           className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
//           aria-label="Close"
     
//         >
//          X
//         </button>
//         </Link>
//       </div>
//       <div className="text-center">
//         <h1 className="text-3xl font-bold">Add your PG</h1>
//         <p className="text-gray-500 mt-2">We are over a thousand tenants for you!</p>
//       </div>
//       <div className="space-y-6 mt-8">
//         {/* Mobile Number */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//             <input
//               value={mobileNum}
//               onChange={(e) => setMobileNum(e.target.value)}
//               type="tel"
//               className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
//             />
//           </div>
//           {/* PG Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">PG Name</label>
//             <input
//               value={pgName}
//               onChange={(e) => setPgName(e.target.value)}
//               type="text"
//               className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
//             />
//           </div>
//         </div>
//         {/* PG Address */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700">PG Address</label>
//           <input
//             value={location}
//             onChange={(e) => setlocation(e.target.value)}
//             type="text"
//             className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
//           />
//         </div>
//         {/* PG Type */}
//         <fieldset className="border p-4 rounded-md">
//           <legend className="text-base font-medium text-gray-900">PG Type</legend>
//           <div className="flex gap-4 mt-2">
//             {['Boys', 'Girls', 'Both'].map((option) => (
//               <button
//                 key={option}
//                 className={`px-4 py-2 border rounded-md text-sm font-medium ${
//                   pgType === option ? 'bg-indigo-500 text-white' : 'hover:bg-gray-100'
//                 }`}
//                 onClick={() => setPgType(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>
//         </fieldset>
//         {/* Occupancy */}
//         <fieldset className="border p-4 rounded-md">
//           <legend className="text-base font-medium text-gray-900">Occupancy</legend>
//           <div className="flex gap-4 mt-2">
//             {['Single', 'Double', 'Triple'].map((option) => (
//               <div key={option} className="flex items-center">
//                 <input
//                   id={`occupancy-${option}`}
//                   name="occupancy"
//                   type="radio"
//                   value={option}
//                   checked={occupancyType === option}
//                   onChange={(e) => setOccupancyType(e.target.value)}
//                   className="h-4 w-4 text-indigo-600 border-gray-300"
//                 />
//                 <label htmlFor={`occupancy-${option}`} className="ml-2 block text-sm font-medium text-gray-700">
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">{`Amount for ${occupancyType} Occupancy`}</label>
//             <input
//               value={occupancyAmount}
//               onChange={(e) => setOccupancyAmount(e.target.value)}
//               type="number"
//               className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm w-full"
//               disabled={!occupancyType}
//             />
//           </div>
//         </fieldset>
//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700">PG Post Content</label>
//           <textarea
//             value={pgPostContent}
//             onChange={(e) => setPgPostContent(e.target.value)}
//             placeholder="Enter PG details here"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
//           />
//         </div>
//         {/* Image */}
//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700">Upload Photos</label>
//           <div
//             className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer"
//             onClick={handleFileClick}
//           >
//             <input
//               id="fileInput"
//               accept="image/png, image/jpg, image/webp, image/jpeg"
//               type="file"
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//             />
//             {imagePreview ? (
//               <div>
//                 <img
//                   alt="Selected"
//                   src={imagePreview}
//                   className="mx-auto mb-4"
//                   style={{ maxHeight: '200px' }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setimage(null);
//                     setImagePreview(null);
//                   }}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <p>Click to upload or drag and drop</p>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-end space-x-4 mt-6">
//           <button
//             onClick={handleCancel}
//             type="button"
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             type="submit"
//             className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Add_PG;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import './Roomate.css';

const Add_PG = () => {
  const [pgType, setPgType] = useState('Both');
  const [mobileNum, setMobileNum] = useState('');
  const [pgName, setPgName] = useState('');
  const [location, setLocation] = useState('');
  const [occupancyType, setOccupancyType] = useState('');
  const [occupancyAmount, setOccupancyAmount] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pgPostContent, setPgPostContent] = useState('');

  const handleFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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

    if (!location) {
      showToastMessage("PG address is required");
      return false;
    }

    if (!occupancyType || !occupancyAmount || isNaN(occupancyAmount)) {
      showToastMessage("Please select an occupancy type and provide a valid amount");
      return false;
    }

    if (!image) {
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
    formData.append('location', location);
    formData.append('occupancyType', occupancyType);
    formData.append('occupancyAmount', occupancyAmount);
    formData.append('image', image);
    formData.append('pgPostContent', pgPostContent);
  
    // Debug: Log formData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pg_listings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success("Form submitted successfully", { position: "top-center" });
      console.log(response.data);
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message || error);
      toast.error("Error submitting form", { position: "top-center" });
    }
  };
  

  const handleCancel = () => {
    setPgType('Both');
    setMobileNum('');
    setPgName('');
    setLocation('');
    setOccupancyType('');
    setOccupancyAmount('');
    setImage(null);
    setImagePreview(null);
    setPgPostContent('');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-md mt-4">
      <div className="absolute top-6 right-[3.5rem]">
        <Link to="/PostRequirementPage">
          <button
            onClick={handleCancel}
            className="text-gray-900 text-center text-lg w-8 h-8 border border-gray-900 rounded-full absolute right-4"
            aria-label="Close"
          >
            X
          </button>
        </Link>
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
                  pgType === option ? ' color text-white' : 'hover:bg-gray-100'
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
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-contain mx-auto" />
            ) : (
              <p>Click here to upload photos</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 color text-white font-medium rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="ml-4 px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
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

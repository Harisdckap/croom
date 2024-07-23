import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    rooms: '',
    facilities: '',
    contact: '',
    looking_for: 'any',
    occupancy: 'any',
    photos: [], 
    highlighted_features: [],
    amenities: [],
    description: ''
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const allHighlightedFeatures = [
    'Attached washroom',
    'Balcony',
    'Air conditioning',
    'Swimming pool',
    'Gym',
    'Parking'
  ];

  const allAmenities = [
    'WiFi',
    'Air Conditioning',
    'Heating',
    'Hot Water',
    'Refrigerator',
    'Microwave'
  ];

  useEffect(() => {
    // Clean up URLs on component unmount
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'photos') {
      const selectedFiles = Array.from(files);

      // Revoke old URLs
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
      
      // Create new URLs
      const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));

      setFormData(prevState => ({
        ...prevState,
        photos: [...prevState.photos, ...selectedFiles] // Add new files to the state
      }));
      setImagePreviews(prevPreviews => [...prevPreviews, ...previewUrls]); // Add new previews
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFeatureClick = (feature) => {
    setFormData(prevState => {
      const highlighted_features = prevState.highlighted_features.includes(feature)
        ? prevState.highlighted_features.filter(f => f !== feature)
        : [...prevState.highlighted_features, feature];
      return { ...prevState, highlighted_features };
    });
  };

  const handleAmenityClick = (amenity) => {
    setFormData(prevState => {
      const amenities = prevState.amenities.includes(amenity)
        ? prevState.amenities.filter(a => a !== amenity)
        : [...prevState.amenities, amenity];
      return { ...prevState, amenities };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
  
    // Append regular fields
    Object.keys(formData).forEach(key => {
      if (key === 'photos') {
        // Append files to FormData
        formData.photos.forEach(file => {
          formDataToSubmit.append('photos[]', file); // Use array notation for multiple files
        });
      } else if (key === 'highlighted_features' || key === 'amenities') {
        formDataToSubmit.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });
  
    axios.post('http://127.0.0.1:8000/api/listings', formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Room added successfully:', response.data);
      // Reset the form data and image previews
      setFormData({
        title: '',
        location: '',
        price: '',
        rooms: '',
        facilities: '',
        contact: '',
        looking_for: 'any',
        occupancy: 'any',
        photos: [],
        highlighted_features: [],
        amenities: [],
        description: ''
      });
      setImagePreviews([]); // Clear image previews
    })
    .catch(error => {
      console.error('There was an error adding the room:', error);
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Room</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={handleChange}
            placeholder="Rooms"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="facilities"
            value={formData.facilities}
            onChange={handleChange}
            placeholder="Facilities"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          ></textarea>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="looking_for"
            value={formData.looking_for}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
          <select
            name="occupancy"
            value={formData.occupancy}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="single">Single</option>
            <option value="shared">Shared</option>
            <option value="any">Any</option>
          </select>
         {/* Hidden file input */}
         <input
            type="file"
            name="photos"
            accept="image/png, image/jpg, image/webp, image/jpeg"
            multiple
            ref={fileInputRef}
            onChange={handleChange}
            className="hidden"
          />
          {/* Custom button to trigger file input */}
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
          >
            Choose Images
          </button>
          {/* Image previews */}
          <div className="flex flex-col gap-4 mb-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <h3 className="w-full text-lg font-semibold">Highlighted Features</h3>
            {allHighlightedFeatures.map((feature) => (
              <button
                key={feature}
                type="button"
                className={`bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 md:px-6 md:py-2 text-xs rounded-full cursor-pointer ${formData.highlighted_features.includes(feature) ? 'bg-blue-200' : ''}`}
                onClick={() => handleFeatureClick(feature)}
              >
                {feature}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <h3 className="w-full text-lg font-semibold">Amenities</h3>
            {allAmenities.map((amenity) => (
              <button
                key={amenity}
                type="button"
                className={`bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 md:px-6 md:py-2 text-xs rounded-full cursor-pointer ${formData.amenities.includes(amenity) ? 'bg-blue-200' : ''}`}
                onClick={() => handleAmenityClick(amenity)}
              >
                {amenity}
              </button>
            ))}
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;

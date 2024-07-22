import React, { useState } from 'react';
import axios from 'axios';

const AddRoomForm = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    rooms: '',
    facilities: '',
    contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/listings', formData)
      .then(response => {
        console.log('Room added successfully:', response.data);
        // Optionally reset the form and close the modal
        setFormData({
          title: '',
          location: '',
          price: '',
          rooms: '',
          facilities: '',
          contact: ''
        });
        setShowModal(false);
      })
      .catch(error => {
        console.error('There was an error adding the room:', error);
      });
  };

  return (
    <div className={`modal ${showModal ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={() => setShowModal(false)}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Add Room</h2>
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
          <input name="rooms" type="number" value={formData.rooms} onChange={handleChange} placeholder="Rooms" required />
          <textarea name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Facilities" required></textarea>
          <input name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
          <button type="submit">Add Room</button>
          <button type="button" onClick={() => setShowModal(false)}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;

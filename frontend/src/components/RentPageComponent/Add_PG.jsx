import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './AddPG.css';

const AddPG = () => {
    const [pgName, setPgName] = useState('');
    const [location, setLocation] = useState('');
    const [rent, setRent] = useState('');
    const [availablerooms, setAvailablerooms] = useState('');
    const [pgFiles, setPgFiles] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setPgFiles(event.target.files);
    };
    const handleClk = () => {
        navigate('./PGCard.jsx')
    };


    const validateInputs = () => {
        if (!pgName || !location || !rent || !availablerooms || pgFiles.length === 0) {
            toast.error("All fields are required", { position: "top-center" });
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validateInputs()) {
            const formData = new FormData();
            formData.append('name', pgName);
            formData.append('location', location);
            formData.append('rent', rent);
            formData.append('available_rooms', availablerooms);
            if (pgFiles.length > 0) {
                formData.append('image', pgFiles[0]);
            }

            try {
                await axios.post('http://localhost:8000/api/pgs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success("Form submitted successfully", { position: "top-center" });
                // Reset form
                setPgName('');
                setLocation('');
                setRent('');
                setAvailablerooms('');
                setPgFiles([]);
                // Navigate to PG listings
                navigate('./PGCard.jsx');
            } catch (error) {
                if (error.response) {
                    console.error('Server error:', error.response.data);
                    toast.error(`Error: ${error.response.data.message}`, { position: "top-center" });
                } else if (error.request) {
                    console.error('Network error:', error.request);
                    toast.error("Network error. Please try again.", { position: "top-center" });
                } else {
                    console.error('Error:', error.message);
                    toast.error(`Error: ${error.message}`, { position: "top-center" });
                }
            }
        }
    };

    return (
        <div className="form-container">
            <h2 className='text-center font-bold text-xl'>Add PG</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <div className="form-group">
                    <label>PG Name:</label>
                    <input
                        type="text"
                        value={pgName}
                        onChange={(e) => setPgName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Rent:</label>
                    <input
                        type="text"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Available Rooms:</label>
                    <input
                        type="text"
                        value={availablerooms}
                        onChange={(e) => setAvailablerooms(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" onClick={handleClk}>Submit</button>
            </form>
        </div>
    );
};

export default AddPG;

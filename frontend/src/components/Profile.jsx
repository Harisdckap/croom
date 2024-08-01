import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logo.png";
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        sex: '',
        date_of_birth: '',
        profile_image: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                if (error.response && error.response.status === 401) {
                    // Token might be expired or invalid, redirect to login
                    localStorage.removeItem('auth_token');
                    navigate('/login');
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        const token = localStorage.getItem('auth_token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.status === 401) {
                // Token might be expired or invalid, redirect to login
                localStorage.removeItem('auth_token');
                navigate('/login');
            }
        }
    };

    return (
        <div>
            <nav className="bg-gray-100 px-3 py-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <section className="mt-0 mx-auto dark:bg-gray-900">
                <div className="lg:w-[54%] md:w-[54%] xs:w-[54%] mx-auto flex gap-0">
                    <div className="xs:w-[54%] md:w-[54%] mx-auto mt-12 bg-gray-200 absolute top-10 shadow-2xl p-6 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div>
                            <h1 className="lg:text-2xl md:text-xl sm:text-xl xs:text-lg font-serif font-extrabold mb-2 dark:text-white">
                                Profile
                            </h1>
                            <div className="flex justify-between items-center my-4">
                                <img className="h-32 w-32 rounded-full border-2 dark:border-gray-800"
                                    src="https://mighty.tools/mockmind-api/content/cartoon/32.jpg" alt=""></img>
                                <div className="w-1/5 rounded-xl bg-blue-500 text-white text-base font-semibold">
                                    <button type="submit" className="w-full p-2 hover:bg-blue-400 mx-auto rounded-xl" onClick={handleSubmit}>Save</button>
                                </div>
                            </div>
                            <form>
                                <div className="flex justify-between items-center mb-4">
                                    <label htmlFor="first_name" className="dark:text-gray-300">First Name</label>
                                    <input
                                        type="text"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800"
                                        placeholder="First Name"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <label htmlFor="last_name" className="dark:text-gray-300">Last Name</label>
                                    <input
                                        type="text"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800"
                                        placeholder="Last Name"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <label htmlFor="sex" className="dark:text-gray-300">Sex</label>
                                    <select
                                        id="sex"
                                        name="sex"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800"
                                        value={formData.sex}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <label htmlFor="date_of_birth" className="dark:text-gray-300">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800"
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        value={formData.date_of_birth}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <label htmlFor="profile_image" className="dark:text-gray-300">Profile Image</label>
                                    <input
                                        type="file"
                                        className="mt-2 p-1 w-96 border-2 border-blue-200 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800"
                                        id="profile_image"
                                        name="profile_image"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-center mb-4">
                                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-32 hover:bg-blue-400" onClick={handleSubmit}>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;

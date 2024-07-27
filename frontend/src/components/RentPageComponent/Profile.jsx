import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        sex: '',
        date_of_birth: '',
        profile_image: null,
        cover_image: null
    });

    useEffect(() => {
        // Fetch existing profile data
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

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

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <section className="py-10 my-auto dark:bg-gray-900">
                <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
                    <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                            Profile
                        </h1>
                        <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Cover Image */}
                            <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center"> 
                                {/* Profile Image */}
                                <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                                    <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                                        <input type="file" name="profile_image" id="upload_profile" hidden onChange={handleChange} />
                                        <label htmlFor="upload_profile">
                                            <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12h-9m4.5-4.5v9"></path>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 mt-10">
                                <div className="flex justify-between">
                                    <label className="font-medium dark:text-gray-400">First Name</label>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-medium dark:text-gray-400">Last Name</label>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-medium dark:text-gray-400">Sex</label>
                                    <input type="text" name="sex" value={formData.sex} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-medium dark:text-gray-400">Date of Birth</label>
                                    <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-medium dark:text-gray-400">Cover Image</label>
                                    <input type="file" name="cover_image" onChange={handleChange} className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                                </div>
                            </div>

                            <button type="submit" className="mt-6 p-2 bg-blue-600 text-white rounded-md">Save</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;

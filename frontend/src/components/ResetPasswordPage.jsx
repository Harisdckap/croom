import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from "../js/api/auth";
import resetImg from "../assets/resetpassword.png";

function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: searchParams.get('email'),
        password: '',
        password_confirmation: '',
        token: searchParams.get('token'),
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(formData);
            if (response.success) {
                setMessage('Password reset successfully. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setMessage(response.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Image Section */}
            <div className="hidden md:flex w-1/2 bg-gray-200">
                <img
                    src={resetImg}
                    alt="Reset Password"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">New Password:</label>
                            <input
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password_confirmation" className="block text-gray-700">Confirm Password:</label>
                            <input
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Reset Password
                        </button>
                    </form>
                    {message && <p className="mt-4 text-center text-green-500">{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;

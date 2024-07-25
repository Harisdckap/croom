// src/components/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { forgotPassword } from "../js/api/auth";
import img from "../assets/forgotpassword.png";
import logo from "../assets/logo.png";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await forgotPassword({ email });
            if (response.success) {
                setMessage(
                    "Please check your email for the password reset link."
                );
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <nav className="bg-gray-100 px-3 py-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <div className="container mx-auto p-4">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
                    <div className="w-full max-w-4xl flex">
                        {/* Left Side - Image Section */}
                        <div className="w-1/2 flex items-center justify-center">
                            <img
                                className="w-full h-auto"
                                src={img}
                                alt="Forgot Password"
                            />
                        </div>
                        {/* Right Side - Form Section */}
                        <div className="w-1/2 flex items-center justify-center">
                            <div className="border p-4 rounded shadow-lg bg-white w-full max-w-md">
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* Form Fields */}
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Send Reset Link
                                    </button>
                                </form>

                                {/* Message Display */}
                                {message && (
                                    <p className="mt-4 text-green-600">
                                        {message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;

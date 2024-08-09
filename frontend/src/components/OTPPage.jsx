
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../js/api/auth";
import img from '../assets/otp.png';
import Auth_navbar from "./RentPageComponent/Auth_navbar";
// import logo from "../assets/logo.png";

const OTPPage = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await verifyOtp(otp, token); // Pass OTP and token
            if (response.success) {
                navigate("/");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to verify OTP. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100" style={{ backgroundColor: 'rgb(31, 41, 59)' }}>
           {/* navbar with logo */}
           <Auth_navbar />
           
            <div className="main flex-grow flex items-center justify-between">
                <div className="flex mx-auto rounded-md bg-gray-100">
                    <div className="hidden md:flex items-center justify-between">
                        <img src={img} alt="OTP Logo" />
                    </div>
                    <div className="md:w-1/2 flex items-center justify-between">
                        <div className="w-full max-w-md">
                            <h2 className="text-center text-2xl font-bold mb-4">Verify OTP</h2>
                            <p className="text-center text-gray-600 mb-4">Please check your email for the OTP and enter it below:</p>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="otp" className="block text-gray-700">OTP</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                                </div>

                                <div className="flex justify-center">
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                        Verify OTP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPPage;

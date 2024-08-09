import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { useNavigate, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import img from "../assets/reg.png";
import { register } from "../js/api/auth";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import Auth_navbar from "./RentPageComponent/Auth_navbar";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const response = await register(formData);

                if (response && response.access_token) {
                    const { access_token, user_id } = response;
                    const now = new Date();
                    const expirationTime = now.getTime() + 24 * 60 * 60 * 1000;
                    localStorage.setItem("auth_token", access_token);
                    localStorage.setItem(
                        "auth_token_expiration",
                        expirationTime
                    );
                    localStorage.setItem("user_id", user_id);

                    setTimeout(() => {
                        setLoading(false);
                        navigate("/verifyotp");
                    }, 3000);
                } else {
                    throw new Error("No access token received from the server");
                }
            } catch (error) {
                console.error("Registration error:", error);
                alert("Registration failed. Please try again.");
                setLoading(false);
            }
        } else {
            console.log("Failed to submit the form due to errors.");
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.name.trim()) errors.name = "Username is required";
        if (!data.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(data.email))
            errors.email = "Email is invalid";
        if (!data.gender) errors.gender = "Gender is required";
        if (!data.mobile.trim()) errors.mobile = "Phone number is required";
        else if (data.mobile.length !== 10)
            errors.mobile = "Phone number must be 10 digits";
        if (!data.password.trim()) errors.password = "Password is required";
        else if (data.password.length < 8)
            errors.password = "Password must be at least 8 characters long";
        if (!data.password_confirmation.trim())
            errors.password_confirmation = "Confirm Password is required";
        else if (data.password !== data.password_confirmation)
            errors.password_confirmation = "Passwords do not match";

        return errors;
    };

    // password
    useEffect(() => {
        let timer;
        if (isOpen) {
            timer = setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: "rgb(31, 41, 59)" }}
        >
            {/* loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                   <RotatingLines
                        height="98"
                        width="98"
                        color="blue"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='rotating-lines-loading'
                        strokeWidth="3"
                        strokeColor="blue"
                        animationDuration="0.75"
                    />
                </div>
            )}
            {/* navbar */}
            <Auth_navbar />

            <div className="main flex flex-grow items-center justify-center">
                <div className="bg-gray-100 mt-20 rounded-md w-3xl flex">
                    <div className="w-1/2 flex items-center justify-between">
                        <img className="w-full h-auto" src={img} alt="house" />
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <div className="p-4 rounded w-full max-w-md">
                            <h1 className="text-center text-2xl font-bold mb-4">
                                Create your account
                            </h1>
                            {/* registration form */}
                            <form onSubmit={handleSubmit} autoComplete="off">
                                {/* username */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="name"
                                        id="name"
                                        placeholder="Username"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                   {errors.name && (
                                        <div className="text-red-500 text-sm fixed">
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                {/* email */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <div className="text-red-500 fixed text-sm">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                {/* gender */}
                                <fieldset className="mb-3 flex items-center gap-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender:
                                    </label>
                                    <div className="">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className={`form-radio ${
                                                    errors.gender
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                                name="gender"
                                                value="male"
                                                checked={
                                                    formData.gender === "male"
                                                }
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                className={`form-radio ${
                                                    errors.gender
                                                        ? "text-red-500"
                                                        : ""
                                                }`}
                                                name="gender"
                                                value="female"
                                                checked={
                                                    formData.gender === "female"
                                                }
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Female</span>
                                        </label>
                                    </div>
                                    {errors.gender && (
                                        <div className="text-red-500 text-sm">
                                            {errors.gender}
                                        </div>
                                    )}

                                </fieldset>
                                {/* phone number */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Phone Number:
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.mobile
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="mobile"
                                        id="mobile"
                                        placeholder="Phone Number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                    <span className="fixed">{errors.mobile && (
                                        <div className="text-red-500 fixed text-sm">
                                            {errors.mobile}
                                        </div>
                                    )}
                                    </span>
                                </div>
                                {/* password */}
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password:
                                    </label>
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        data-tooltip-id="tooltip-password"
                                        onFocus={() => setIsOpen(true)}
                                    />
                                    <span
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-2 top-8 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        )}
                                    </span>
                                    <span className="fixed">{errors.password && (
                                        <div className="text-red-500 fixed text-sm">
                                            {errors.password}
                                        </div>
                                    )}
                                    </span>
                                    <Tooltip
                                        id="tooltip-password"
                                        anchorSelect="#password"
                                        isOpen={isOpen}
                                        place="right-top"
                                        className="bg-zinc-300 w-1/4"
                                    >
                                        <div>
                                            <p className="font-semibold">Password must meet the following requirements</p>
                                            <ul className="text-md">
                                                <li>Be at least 8 characters</li>
                                                <li>At least one Uppercase letter</li>
                                                <li>At least one number</li>
                                                <li>At least one special character</li>
                                            </ul>
                                        </div>
                                    </Tooltip>
                                </div>
                                {/* confirm password */}
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password:
                                    </label>
                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className={`mt-1 block w-full p-1 border ${
                                            errors.password_confirmation
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md`}
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        placeholder="Confirm Password"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    <span
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-2 top-8 cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOutlined
                                            style={{
                                                fontSize: "16px",
                                                color: "#1F293B",
                                            }}
                                        />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "#1F293B",
                                                }}
                                            />
                                        )}
                                    </span>
                                    <span className="fixed">{errors.password_confirmation && (
                                        <div className="text-red-500 fixed text-sm">
                                            {errors.password_confirmation}
                                        </div>
                                    )}
                                    </span>
                                </div>

                                {/* register */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                            {/* login */}
                            <div className="text-center mt-3">
                                <p className="text-sm">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

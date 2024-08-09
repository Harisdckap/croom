import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import logo from "../assets/logo.png";
import img from "../assets/reg.png";
import { register } from "../js/api/auth";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

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
                    localStorage.setItem("auth_token_expiration", expirationTime);
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
                if (error.response && error.response.status === 409) {
                    setServerError(error.response.data.message || "Email is already registered. Please log in.");
                } else {
                    setServerError("Registration failed. Please try again.");
                }
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
            <nav className="w-full bg-gray-100 px-3 py-2">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-30 h-10" />
                </div>
            </nav>
            <div className="main flex flex-grow items-center justify-center">
                <div className="bg-gray-100 mt-3 mb-3 rounded-md w-3xl flex">
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
                                        <div className="text-red-500 text-sm">
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
                                        <div className="text-red-500 text-sm">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                {/* gender */}
                                <div className="mb-3">
                                    <label
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Gender:
                                    </label>
                                    <div className="flex items-center mt-1">
                                        <label className="inline-flex items-center mr-4">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                className="form-radio text-blue-600"
                                                checked={formData.gender === "male"}
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Male</span>
                                        </label>
                                        <label className="inline-flex items-center mr-4">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                className="form-radio text-blue-600"
                                                checked={formData.gender === "female"}
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Female</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                className="form-radio text-blue-600"
                                                checked={formData.gender === "other"}
                                                onChange={handleChange}
                                            />
                                            <span className="ml-2">Other</span>
                                        </label>
                                    </div>
                                    {errors.gender && (
                                        <div className="text-red-500 text-sm">
                                            {errors.gender}
                                        </div>
                                    )}
                                </div>
                                {/* phone number */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Phone number:
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
                                        placeholder="Phone number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                    {errors.mobile && (
                                        <div className="text-red-500 text-sm">
                                            {errors.mobile}
                                        </div>
                                    )}
                                </div>
                                {/* password */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
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
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <div className="text-red-500 text-sm">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                {/* confirm password */}
                                <div className="mb-3">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Confirm Password:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
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
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <div className="text-red-500 text-sm">
                                            {errors.password_confirmation}
                                        </div>
                                    )}
                                </div>
                                {/* submit button */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                                >
                                    Register
                                </button>
                            </form>
                            {/* server-side error message */}
                            {serverError && (
                                <div className="mt-4 text-red-500">
                                    {serverError}
                                </div>
                            )}
                            <p className="text-center mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-500 underline">
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

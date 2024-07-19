import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import img from '../assets/register.png';
import { register } from "../js/api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    gender: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const searchingList = [
    { value: "searching for a Flat/Flatmate/PG", label: "Searching for a Flat/Flatmate/PG" },
    { value: "pg owner", label: "PG Owner" },
    { value: "flat owner", label: "Flat Owner" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await register(formData);
        console.log("Registration response:", response);

        if (response && response.access_token) {
          const { access_token, user_id } = response;
          // Store the token and set an expiration time for 24 hours
          const now = new Date();
          const expirationTime = now.getTime() + 24 * 60 * 60 * 1000;
          localStorage.setItem("auth_token", access_token);
          localStorage.setItem("auth_token_expiration", expirationTime);
          localStorage.setItem("user_id", user_id);
          navigate("/verifyotp");
        } else {
          throw new Error("No access token received from the server");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    } else {
      console.log("Failed to submit the form due to errors.");
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) errors.name = "Username is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email is invalid";
    if (!data.gender) errors.gender = "Gender is required";
    if (!data.mobile.trim()) errors.mobile = "Phone number is required";
    else if (data.mobile.length !== 10) errors.mobile = "Phone number must be 10 digits";
    if (!data.password.trim()) errors.password = "Password is required";
    else if (data.password.length < 8) errors.password = "Password must be at least 8 characters long";
    if (!data.userType) errors.userType = "Please select an option";

    return errors;
  };

  return (
    <div className="container mx-auto min-h-screen bg-gray-100 flex flex-col rounded">
      <nav className="bg-gray-100 px-3 py-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-20 h-auto" />
        </div>
      </nav>
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-4xl flex">
          <div className="w-1/2 flex items-center justify-center">
            <img className="w-full h-auto" src={img} alt="house" />
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <div className="border p-4 rounded shadow-lg bg-white w-full max-w-md">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    className={`mt-1 block w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md`}
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className={`mt-1 block w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <fieldset className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <div className="mt-1">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className={`form-radio ${errors.gender ? "text-red-500" : ""}`}
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className={`form-radio ${errors.gender ? "text-red-500" : ""}`}
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                  {errors.gender && <div className="text-red-500 text-sm">{errors.gender}</div>}
                </fieldset>
                <div className="mb-3">
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    className={`mt-1 block w-full p-2 border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded-md`}
                    name="mobile"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && <div className="text-red-500 text-sm">{errors.mobile}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    className={`mt-1 block w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md`}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700">You are</label>
                  <select
                    className={`mt-1 block w-full p-2 border ${errors.userType ? "border-red-500" : "border-gray-300"} rounded-md`}
                    name="userType"
                    id="userType"
                    value={formData.userType}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    {searchingList.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.userType && <div className="text-red-500 text-sm">{errors.userType}</div>}
                </div>
                <div className="mt-4">
                  <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none">Register</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p className="text-sm">
                  Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
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

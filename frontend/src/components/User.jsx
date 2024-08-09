import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Profile = () => {
    const [user, setUser] = useState(null);
    const authToken = localStorage.getItem("auth_token");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/userDetail", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            setUser(response.data.user);
            console.log("==========user detail===========");
            console.log(response.data.user);
        } catch (error) {
            console.error("Error fetching user detail:", error);
        }
    };

    const [profileImage, setProfileImage] = useState(null);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mobile: "",
        gender: "",
    });
    const [showPopup, setShowPopup] = useState(false);
    const [passwordData, setPasswordData] = useState({
        existingPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [showExistingPassword, setShowExistingPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedImage = localStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error("No file selected.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            localStorage.setItem("profileImage", reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        setPasswordData({ ...passwordData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("mobile", formData.mobile);
        if (profileImage) {
            data.append("profile_photo", profileImage);
        }

        axios
            .post("http://localhost:8000/api/update-profile", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                console.log(response.data.message);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            alert("New password and confirm new password do not match.");
            return;
        }

        axios
            .post("http://localhost:8000/api/change-password", passwordData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                alert("Password changed successfully.");
                setShowPopup(false);
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
            });
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
                    <div className="xs:w-[54%] md:w-[54%] mx-auto mt-20 bg-gray-200 absolute top-10 shadow-2xl p-6 rounded-xl h-fit self-center dark:bg-gray-800/40">
                        <div>
                            <h1 className="lg:text-2xl md:text-xl sm:text-xl xs:text-lg font-serif font-extrabold mb-2 dark:text-white">
                                Profile
                            </h1>
                            {/* profile image */}
                            <div className="flex justify-between items-center">
                                <div
                                    className="w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: `url(${
                                            profileImage ||
                                            "https://mighty.tools/mockmind-api/content/cartoon/32.jpg"
                                        })`,
                                    }}
                                >
                                    <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-24 mt-28">
                                        <input
                                            type="file"
                                            name="profile"
                                            id="upload_profile"
                                            hidden
                                            onChange={handleImageUpload}
                                            required
                                        />
                                        <label htmlFor="upload_profile">
                                            <svg
                                                data-slot="icon"
                                                className="w-6 h-5 text-blue-700"
                                                fill="none"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                                ></path>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                                ></path>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="w-28 h-10 rounded-xl text-center bg-red-500 text-white text-base font-semibold">
                                        <button
                                            type="button"
                                            className="p-2 mx-auto rounded-xl"
                                            onClick={() => setIsEditing(!isEditing)}
                                        >
                                            {isEditing ? "Cancel" : "Edit"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="username"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        User Name
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-2 p-1 w-96 border-2 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800 ${
                                            isEditing ? "" : "bg-gray-100 cursor-not-allowed"
                                        }`}
                                        placeholder="First Name"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-2 p-1 w-96 border-2 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800 ${
                                            isEditing ? "" : "bg-gray-100 cursor-not-allowed"
                                        }`}
                                        placeholder="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        htmlFor="mobile"
                                        className="block text-md font-medium text-gray-700"
                                    >
                                        Mobile
                                    </label>
                                    <input
                                        type="text"
                                        className={`mt-2 p-1 w-96 border-2 rounded-lg dark:text-gray-200 dark:border-blue-600 dark:bg-blue-800 ${
                                            isEditing ? "" : "bg-gray-100 cursor-not-allowed"
                                        }`}
                                        placeholder="Mobile Number"
                                        id="mobile"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                {isEditing && (
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Save
                                    </button>
                                )}
                            </form>
                            <div className="flex justify-center items-center mt-3">
                                <button
                                    className="text-red-600"
                                    onClick={() => setShowPopup(true)}
                                >
                                    Change Password?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-bold mb-4">Change Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="existingPassword"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Existing Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showExistingPassword ? "text" : "password"}
                                        id="existingPassword"
                                        placeholder="Existing Password"
                                        className="w-full p-2 border-2 rounded-lg"
                                        value={passwordData.existingPassword}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() =>
                                            setShowExistingPassword(!showExistingPassword)
                                        }
                                    >
                                        {showExistingPassword ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="newPassword"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        id="newPassword"
                                        placeholder="New Password"
                                        className="w-full p-2 border-2 rounded-lg"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                        }
                                    >
                                        {showNewPassword ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="confirmNewPassword"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmNewPassword ? "text" : "password"}
                                        id="confirmNewPassword"
                                        placeholder="Confirm New Password"
                                        className="w-full p-2 border-2 rounded-lg"
                                        value={passwordData.confirmNewPassword}
                                        onChange={handlePasswordChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() =>
                                            setShowConfirmNewPassword(!showConfirmNewPassword)
                                        }
                                    >
                                        {showConfirmNewPassword ? (
                                            <EyeOutlined />
                                        ) : (
                                            <EyeInvisibleOutlined />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            >
                                Change Password
                            </button>
                        </form>
                        <button
                            className="mt-4 text-red-600"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

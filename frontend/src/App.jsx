import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import OTPPage from "./components/OTPPage";
import ForgetPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import ListingPage from "./components/RentPageComponent/Listing";
// import PrivateRoute from './components/PrivateRoute';
import NeedRoomForm from "./components/RentPageComponent/Add_Room_Form";
import NeedRoomate from "./components/RentPageComponent/Add_Roomate_Form";
import ListingDetailPage from "./components/RentPageComponent/ListingId";
import PostRequirementPage from "./components/PostRequirementPage";
import RoomPage from "./components/RentPageComponent/Rooms";
import RoomDetailPage from "./components/RentPageComponent/RoomId";
import AllRoommatesPage from "./components/RentPageComponent/Roomates";
import RoommatesDetailPage from "./components/RentPageComponent/RoomatesId";
import Profile from "./components/Profile";
import PgForm from "./components/RentPageComponent/Add_Pg_Form";
import PlansPage from "./components/RentPageComponent/Plan";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verifyotp" element={<OTPPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgetPasswordPage />}
                />
                <Route path="/password/reset" element={<ResetPasswordPage />} />
                <Route path="/AllExploreRooms" element={<ListingPage />} />
                <Route path="/listing/:id" element={<ListingDetailPage />} />
                <Route path="/room/:id" element={<RoomDetailPage />} />
                <Route path="/NeedRoomForm" element={<NeedRoomForm />} />
                <Route path="/NeedRoomateForm" element={<NeedRoomate />} />
                <Route
                    path="/PostRequirementPage"
                    element={<PostRequirementPage />}
                />
                <Route path="/AllRoomsPage" element={<RoomPage />} />
                <Route path="/AllRoommates" element={<AllRoommatesPage />} />
                <Route path="/roommate/:id" element={<RoommatesDetailPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/PgForm" element={<PgForm />} />
                <Route path="/PlanPage" element={<PlansPage />} />
            </Routes>
        </Router>
    );
}

export default App;

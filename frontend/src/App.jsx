import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import OTPPage from './components/OTPPage';
import ForgetPasswordPage from './components/ForgotPasswordPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import ListingPage from './components/RentPageComponent/AllExploreRooms'
// import PrivateRoute from './components/PrivateRoute';
import NeedRoomForm from './components/RentPageComponent/AddRoomForm';
import NeedRoomate from './components/RentPageComponent/NeedRoomateForm';
import ListingDetailPage from './components/RentPageComponent/ListingDetailPage'; 
import PostRequirementPage  from './components/PostRequirementPage';
import RoomPage from './components/RentPageComponent/AllRoomsPage';
import RoomDetailPage from './components/RentPageComponent/RoomDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verifyotp" element={<OTPPage />} />
                <Route path="/forgot-password" element={<ForgetPasswordPage />} />
                <Route path="/password/reset" element={<ResetPasswordPage />} />
                <Route path="/AllExploreRooms" element={<ListingPage />} />
                <Route path="/listing/:id" element={<ListingDetailPage/>} />
                <Route path="/room/:id" element={<RoomDetailPage/>} /> 
                <Route path="/NeedRoomForm" element={<NeedRoomForm />} />
                <Route path="/NeedRoomateForm" element={<NeedRoomate />} />
                <Route path="/PostRequirementPage" element={<PostRequirementPage />} />
                 <Route path="/AllRoomsPage" element={<RoomPage />} />
              
            </Routes>
        </Router>
    );
}

export default App;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../js/api/auth';
import apartmentIMG from '../assets/login.png';
import logo from '../assets/logo.png';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(formData);

            if (response && response.access_token) {
                const { access_token } = response;
                
                // Store the token in localStorage
                localStorage.setItem('auth_token', access_token);

                // Redirect to home page
                navigate('/');
            } else {
                throw new Error('No access token received from the server');
            }

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className='min-h-screen flex flex-col bg-gray-100'>
          {/* Navbar with Logo */}
          <div className="bg-gray-100 py-2 flex justify-between px-4">
            <div className="text-gray-900 font-bold cursor-pointer">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-auto" // Adjust the logo width here
              />
            </div>
          </div>
    
          {/* Main Content */}
          <div className='flex-grow flex items-center justify-center'>
            {/* Image Section */}
            <div className='hidden md:flex md:w-1/2 items-center justify-center'>
              <img src={apartmentIMG} className='max-h-96' alt='Apartment' />
            </div>
    
            {/* Form Section */}
            <div className='md:w-1/2 flex items-center justify-center'>
              <div className='w-3/4 bg-white p-6 rounded shadow'>
                <h1 className='text-center text-2xl font-bold mb-4'>Login to your account</h1>
                <p className='text-center text-gray-500 mb-4'>Welcome back! Select a method to login:</p>
                <div className='flex justify-center gap-3 mb-4'>
                  <button className='btn btn-outline-primary flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100'>
                    Facebook
                  </button>
                  <button className='btn btn-outline-danger flex items-center px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100'>
                    Google
                  </button>
                </div>
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div className='mb-3'>
                    <label htmlFor='email' className='block text-gray-700'>Email:</label>
                    <input
                      type='email'
                      className={`mt-1 block w-full p-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errorMessage && <div className='text-red-500 text-sm'>{errorMessage}</div>}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='block text-gray-700'>Password:</label>
                    <input
                      type='password'
                      className={`mt-1 block w-full p-2 border ${errorMessage ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errorMessage && <div className='text-red-500 text-sm'>{errorMessage}</div>}
                  </div>
                  <div className='mb-3 flex items-center'>
                    <input type='checkbox' className='h-4 w-4 text-blue-600' id='rememberMe' />
                    <label className='ml-2 block text-gray-700' htmlFor='rememberMe'>Remember me</label>
                  </div>
                  <div className='mb-3 flex justify-between items-center'>
                    <div>
                      {/* Use Link component for navigation */}
                      <Link to='/forgot-Password' className='text-blue-500 hover:underline'>Forgot password?</Link>
                    </div>
                  </div>
                  <button type='submit' className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none'>Login</button>
                </form>
                <p className='mt-4 text-center'>
                  Don't have an account? <Link to='/register' className='text-blue-500 hover:underline'>Create account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default LoginPage;

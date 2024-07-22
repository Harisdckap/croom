import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import Image from "../assets/roomsearch.png";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen relative bg-white overflow-hidden leading-normal tracking-normal">
        <img
          className="absolute top-0 left-0 w-full h-96 object-cover"
          alt="Banner"
          src="/banner-image@2x.png"
        />
        <section className="relative pt-24 pb-12 bg-white flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 text-blue-600">Welcome to Room Sharing</h1>
            <p className="text-lg mb-6 text-gray-700">Find your perfect room or share your space</p>
            <Link to="/rentlisting" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300">
              Explore Listings
            </Link>
            <Link to="/addHouse" className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300">
             Add House
            </Link>

          </div>
        </section>
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How It Works</h2>
            <div className="flex flex-wrap justify-center space-x-4">
              <div className="w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img src="/icon-search.png" alt="Search Icon" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Search</h3>
                  <p className="text-gray-600">Find rooms or roommates based on your preferences.</p>
                </div>
              </div>
              <div className="w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img src="/icon-contact.png" alt="Contact Icon" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Contact</h3>
                  <p className="text-gray-600">Reach out to listings that catch your interest.</p>
                </div>
              </div>
              <div className="w-1/3 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4">
                    <img src="/icon-move-in.png" alt="Move-in Icon" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Move In</h3>
                  <p className="text-gray-600">Finalize your agreement and move into your new place.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Popular Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="/room-1.jpg" alt="Room 1" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Cozy Room in City Center</h3>
                <p className="text-gray-600">2 beds • 1 bath • $1200/month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="/room-2.jpg" alt="Room 2" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Spacious Apartment with Balcony</h3>
                <p className="text-gray-600">3 beds • 2 baths • $1800/month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="/room-3.jpg" alt="Room 3" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Modern Studio in Quiet Neighborhood</h3>
                <p className="text-gray-600">1 bed • 1 bath • $900/month</p>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  );
};

export default Home;

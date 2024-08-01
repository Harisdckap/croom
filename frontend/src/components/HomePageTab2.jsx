import React from 'react';
import hero4 from '../assets/hero4.png';

const HomePageTab2 = () => {
  return (
    <section className="flex lg:flex-row items-center py-10 justify-between lg:px-12 bg-white gap-16">
      {/* Image Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <img src={hero4} alt="Two people on a couch" className="w-full h-auto object-cover" />
      </div>

      {/* Text Section */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="gradient-text text-4xl font-bold mb-6">
          Why Use C-room?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          C-room is a one-stop destination for anyone looking out for roommates, flatmates, co-living spaces, or PGs. We understand that finding the right living situation can be a challenge, which is why we make the process easy and stress-free. Whether you're a student searching for a roommate or a young professional seeking a flatmate, our platform provides a streamlined and efficient way to connect with like-minded individuals in search of a shared living space.
        </p>
        <p className="text-lg text-gray-700">
          Our platform allows you to browse through a wide range of listings for co-living spaces, PGs, and flats, and find the perfect match for your lifestyle and preferences. So, why wait? Start your search today and find your ideal living situation with  
          <br></br>C-room!
        </p>
      </div>
    </section>
  );
};

export default HomePageTab2;

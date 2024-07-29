import React from "react";
import logo from "../../assets/logo.png";

const PlanCard = ({ name, price, duration, features, icon }) => (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full sm:w-1/2 lg:w-1/4">
        <div className="flex items-center justify-center mb-4">
            <i className={`fas ${icon} text-4xl text-blue-500`}></i>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">{name}</h2>
        <p className="text-gray-700 mb-4 text-center text-xl">
            {price}/{duration}
        </p>
        <ul className="mb-4">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {feature}
                </li>
            ))}
        </ul>
        <div className="flex justify-center">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                Select Plan
            </button>
        </div>
    </div>
);

const PlansPage = () => {
    const plans = [
        {
            name: "Basic Plan",
            price: "$10",
            duration: "month",
            features: [
                "Access to basic listings",
                "Email support",
                "Limited access to amenities",
            ],
            icon: "fa-leaf",
        },
        {
            name: "Standard Plan",
            price: "$20",
            duration: "month",
            features: [
                "Access to standard listings",
                "Priority email support",
                "Access to common amenities",
                "Monthly newsletters",
            ],
            icon: "fa-gem",
        },
        {
            name: "Premium Plan",
            price: "$30",
            duration: "month",
            features: [
                "Access to all listings",
                "24/7 customer support",
                "Access to all amenities",
                "Weekly newsletters",
                "Premium support",
            ],
            icon: "fa-crown",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            <nav className="bg-gray-100 px-3 py-4">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-20 h-auto" />
                </div>
            </nav>
            <h1 className="text-4xl font-bold mb-8">Choose Your Plan</h1>
            <div className="flex flex-wrap justify-center">
                {plans.map((plan, index) => (
                    <PlanCard key={index} {...plan} />
                ))}
            </div>
        </div>
    );
};

export default PlansPage;

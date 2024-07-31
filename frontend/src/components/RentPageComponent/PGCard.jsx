import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PGCard = () => {
    const [pgs, setPgs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pg_listings')
            .then(response => {
                setPgs(response.data.data); 
            })
            .catch(error => {
                console.error('There was an error fetching the PG!', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">PG Listings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pgs.map(pg => (
                    <div key={pg.id} className="bg-white shadow-md rounded-md overflow-hidden">
                        {pg.pg_files && pg.pg_files.length > 0 && (
                            <img
                                src={`http://localhost:8000/storage/${pg.pg_files[0]}`}
                                alt={pg.pg_name}
                                className="w-full h-48 object-cover"
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{pg.pg_name}</h2>
                            <p className="text-gray-600">{pg.pg_address}</p>
                            <p className="text-gray-800 font-semibold">Occupancy: {pg.occupancy}</p>
                            <p className="text-gray-600">PG Type: {pg.pg_type}</p>
                            <p className="text-gray-600">Contact: {pg.mobile_num}</p>
                            <p className="text-gray-600 mt-2">{pg.pg_post_content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PGCard;

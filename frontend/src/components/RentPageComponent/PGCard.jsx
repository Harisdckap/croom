import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PGCard = () => {
    const [pgs, setPgs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/pgs')
            .then(response => {
                setPgs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the PGs!', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">PG Card</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {pgs.map(pg => (
                    <div key={pg.id} className="bg-white shadow-md rounded-md overflow-hidden">
                        {pg.image && (
                            <img src={`data:image/jpeg;base64,${btoa(new Uint8Array(pg.image).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`} alt={pg.name} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-bold">{pg.name}</h2>
                            <p className="text-gray-600">{pg.location}</p>
                            <p className="text-gray-800 font-semibold">Rent: ${pg.rent}</p>
                            <p className="text-gray-600">Available Rooms: {pg.available_rooms}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PGCard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Function to fetch listings with address and page parameters
    const fetchListings = async () => {
      try {
        const response = await axios.get(`/api/properties?address=${address}&p=${page}`);
        setListings(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [address, page]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAddress(search);
    setPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h1>Listings</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by location"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {listings.length > 0 ? (
          listings.map(listing => (
            <div key={listing.id}>
              <h2>{listing.title}</h2>
              <p>Location: {listing.location}</p>
              <p>Price: ${listing.price}</p>
              <p>Rooms: {listing.rooms}</p>
              <p>Facilities: {listing.facilities}</p>
              <p>Contact: {listing.contact}</p>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingsPage;

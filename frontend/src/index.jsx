import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddPG from './components/RentPageComponent/Add_PG';
import PGCard from './components/RentPageComponent/PGCard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/add-pg" element={<AddPG />} />
                <Route path="/pg-listings" element={<PGCard />} />
                <Route path="/" exact element={<PGCard />} />
            </Routes>
        </Router>
    );
};

export default App;

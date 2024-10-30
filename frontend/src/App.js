
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Suppliers from './pages/Suppliers';
import Items from './pages/Items';
import PurchaseOrders from './pages/PurchaseOrders';
import Navbar from './components/NavBar/NavBar';
import './App.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/items" element={<Items />} />
                <Route path="/purchase-orders" element={<PurchaseOrders />} />
            </Routes>
        </Router>
    );
};

export default App;

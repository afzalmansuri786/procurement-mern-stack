import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Procurement App</div>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/suppliers">Suppliers</Link>
                <Link to="/items">Items</Link>
                <Link to="/purchase-orders">Purchase Orders</Link>
            </div>
        </nav>
    );
};

export default Navbar;

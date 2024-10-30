import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/suppliers">Suppliers</Link>
                <Link to="/items">Items</Link>
                <Link to="/purchase-orders">Purchase Orders</Link>
            </nav>
            <main>{children}</main>
        </div>
    );
};

export default Layout;

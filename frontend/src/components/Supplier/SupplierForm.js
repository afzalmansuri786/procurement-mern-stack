import React, { useState } from 'react';
import { createSupplier } from '../../Api/api';
import './Supplier.css';

const SupplierForm = ({ onSupplierAdded }) => {
    const [formData, setFormData] = useState({
        supplierName: '',
        address: '',
        taxNo: '',
        country: '',
        mobileNo: '',
        email: '',
        status: 'Active',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createSupplier(formData);
        onSupplierAdded(response.data.data);
    };

    return (
        <div className="supplier-form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="supplierName" placeholder="Supplier Name" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <input type="text" name="taxNo" placeholder="Tax No" onChange={handleChange} />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} />
                <input type="text" name="mobileNo" placeholder="Mobile No" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <select name="status" onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Blocked">Blocked</option>
                </select>
                <button type="submit">Add Supplier</button>
            </form>
        </div>
    );
};

export default SupplierForm;

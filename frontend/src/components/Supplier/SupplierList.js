import React, { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplier } from '../../Api/api.js';
import './Supplier.css';

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await getSuppliers();
            setSuppliers(response.data.data);
        };
        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        await deleteSupplier(id);
        setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
    };

    return (
        <div className="supplier-list">
            <h2>Supplier List</h2>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier._id}>
                        {supplier.supplierName} 
                        <button onClick={() => handleDelete(supplier._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SupplierList;

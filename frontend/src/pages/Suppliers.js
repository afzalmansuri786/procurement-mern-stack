import React, { useState } from 'react';
import SupplierForm from '../components/Supplier/SupplierForm';
import SupplierList from '../components/Supplier/SupplierList';

const Suppliers = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSupplierAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>Suppliers</h1>
            <SupplierForm onSupplierAdded={handleSupplierAdded} />
            <SupplierList refresh={refresh} />
        </div>
    );
};

export default Suppliers;

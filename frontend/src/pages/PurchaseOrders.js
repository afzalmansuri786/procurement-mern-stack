import React, { useState } from 'react';
import PurchaseOrderForm from '../components/PurchaseOrder/PurchaseOrderForm';
import PurchaseOrderList from '../components/PurchaseOrder/PurchaseOrderList';

const PurchaseOrders = () => {
    const [refresh, setRefresh] = useState(false);

    const handleOrderCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <h1>Purchase Orders</h1>
            <div style={{ display: "flex" }}>
                <PurchaseOrderForm onOrderCreated={handleOrderCreated} />
                <PurchaseOrderList refresh={refresh} />
            </div>
        </>
    );
};

export default PurchaseOrders;
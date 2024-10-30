import React, { useEffect, useState } from 'react';
import { createPurchaseOrder, getSuppliers, getItemsBySupplier } from '../../Api/api';
import './PurchaseOrder.css';

const PurchaseOrderForm = ({ onOrderCreated }) => {
    const [formData, setFormData] = useState({
        orderDate: new Date().toISOString().split('T')[0],
        supplier: '',
        overallDiscount: 0,
    });

    const [suppliers, setSuppliers] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await getSuppliers();
            setSuppliers(response.data.data);
        };

        fetchSuppliers();
    }, []);

    const handleSupplierChange = async (e) => {
        const selectedSupplierId = e.target.value;
        setFormData({ ...formData, supplier: selectedSupplierId });

        if (selectedSupplierId) {
            const response = await getItemsBySupplier(selectedSupplierId);
            setAllItems(response.data.data);
        } else {
            setAllItems([]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (item, qty, packingUnit) => {
        const parsedQty = parseInt(qty, 10);
        if (parsedQty > 0 && parsedQty <= item.stockUnit) {
            const existingItem = selectedItems.find(i => i._id === item._id);
            if (existingItem) {
                setSelectedItems(selectedItems.map(i =>
                    i._id === item._id ? { ...existingItem, qty: parsedQty, packingUnit } : i
                ));
            } else {
                setSelectedItems([...selectedItems, { ...item, qty: parsedQty, packingUnit }]);
            }
        }
    };

    const calculateTotals = () => {
        const itemTotal = selectedItems.reduce((total, item) => total + (item.unitPrice * item.qty), 0);
        const overallDiscount = (parseFloat(formData.overallDiscount) / 100) * itemTotal || 0;
        const netAmount = itemTotal - overallDiscount;

        return { itemTotal, overallDiscount, netAmount };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { itemTotal, overallDiscount, netAmount } = calculateTotals();


        const itemsToSend = selectedItems.map(item => ({
            itemId: item._id,
            qty: item.qty,
            packingUnit: item.packingUnit,
            itemAmount: item.unitPrice * item.qty
        }));

        const response = await createPurchaseOrder({
            ...formData,
            items: itemsToSend,
            itemTotal,
            discount: overallDiscount,
            netAmount,
        });

        onOrderCreated(response.data.data);
    };


    const { itemTotal, overallDiscount, netAmount } = calculateTotals();

    return (
        <div className="purchase-order-form">
            <form onSubmit={handleSubmit}>
                <input style={{ width: "100%" }} type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} required />

                <select name="supplier" onChange={handleSupplierChange} required>
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.supplierName}
                        </option>
                    ))}
                </select>

                <h3>Select Items</h3>
                <div>
                    {formData.supplier ? (
                        allItems.map((item, index) => (
                            <div key={item._id} style={{ padding: "1rem 1rem" }}>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <label htmlFor={index}>{index + 1})</label>
                                    <span>Item No: {item.itemNo}</span>
                                    <span>Item Name: {item.itemName}</span>
                                    <span>Stock Unit: {item.stockUnit}</span>
                                    <span>Unit Price: {item.unitPrice}</span>
                                    <select onChange={(e) => handleItemChange(item, item.qty, e.target.value)}>
                                        <option value="">Select Packing Unit</option>
                                        <option value="Box">Box</option>
                                        <option value="Bag">Bag</option>
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        max={item.stockUnit}
                                        placeholder="Qty"
                                        onChange={(e) => handleItemChange(item, e.target.value, item.packingUnit)}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Please select a supplier first to see the available items.</p>
                    )}
                </div>

                <h4>Overall Discount (%)</h4>
                <input
                    type="number"
                    name="overallDiscount"
                    min='0'
                    max='100'
                    value={formData.overallDiscount}
                    onChange={handleChange}
                    placeholder="Overall Discount (%)"
                />

                <h4>Totals</h4>
                <p>Item Total: {itemTotal.toFixed(2)}</p>
                <p>Total Discount: {overallDiscount.toFixed(2)}</p>
                <p>Net Amount: {netAmount.toFixed(2)}</p>

                <button type="submit">Create Purchase Order</button>
            </form>

            <h3>Selected Items</h3>
            <ul>
                {selectedItems.map(item => (
                    <li key={item._id}>
                        {item.itemName} - Qty: {item.qty} - Total: {(item.unitPrice * item.qty).toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PurchaseOrderForm;

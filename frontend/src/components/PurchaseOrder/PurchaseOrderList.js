import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { getPurchaseOrders } from '../../Api/api.js';
import './PurchaseOrder.css';

const PurchaseOrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getPurchaseOrders();
            setOrders(response.data.data);
        };
        fetchOrders();
    }, []);

    const exportToExcel = () => {
        const allOrders = orders.flatMap(order => 
            order.items.map(item => ({
                Date: new Date(order.orderDate).toLocaleDateString(),
                Supplier: order.supplier.supplierName,
                'Item No': item.itemId?.itemNo,
                'Item Name': item.itemId?.itemName,
                'Stock Unit': item.itemId?.stockUnit,
                'Unit Price': item.itemId?.unitPrice,
                'Packing Unit': item.itemId?.packingUnit,
                'Order Qty': item.qty,
                'Item Amount': (item.qty * item.itemId?.unitPrice).toFixed(2),
                'Discount': item.discount || 0,
                'Net Amount': ((item.qty * item.itemId?.unitPrice) - (item.discount || 0)).toFixed(2),
            }))
        );

        const ws = XLSX.utils.json_to_sheet(allOrders);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Purchase Orders");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const data = new Blob([excelBuffer], { type: EXCEL_TYPE });

        saveAs(data, 'purchase_orders.xlsx');
    };

    const handlePrint = () => {
        // const printWindow = window.open('', '_blank');
        const printContent = `
            <html>
                <head>
                    <title>Purchase Orders</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Purchase Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Supplier</th>
                                <th>Item No</th>
                                <th>Item Name</th>
                                <th>Stock Unit</th>
                                <th>Unit Price</th>
                                <th>Packing Unit</th>
                                <th>Order Qty</th>
                                <th>Item Amount</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.flatMap(order => 
                                order.items.map(item => 
                                    <tr>
                                        <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td>${order.supplier.supplierName}</td>
                                        <td>${item.itemId?.itemNo}</td>
                                        <td>${item.itemId?.itemName}</td>
                                        <td>${item.itemId?.stockUnit}</td>
                                        <td>${(item.itemId?.unitPrice || 0).toFixed(2)}</td>
                                        <td>${item.itemId?.packingUnit}</td>
                                        <td>${item.qty}</td>
                                        <td>${(item.qty * (item.itemId?.unitPrice || 0)).toFixed(2)}</td>
                                        <td>${item.discount || 0}</td>
                                        <td>${((item.qty * (item.itemId?.unitPrice || 0)) - (item.discount || 0)).toFixed(2)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </body>
            </html>
        `;
        const printWindow = window.open('', '_blank');

        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="purchase-order-container">
            <div className="purchase-order-list">
                <h2>Created Purchase Orders</h2>
                <button onClick={exportToExcel}>Export to Excel</button>
                <button onClick={handlePrint}>Print</button>
                {orders.length === 0 ? (
                    <p>No purchase orders created yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Supplier</th>
                                <th>Item No</th>
                                <th>Item Name</th>
                                <th>Stock Unit</th>
                                <th>Unit Price</th>
                                <th>Packing Unit</th>
                                <th>Order Qty</th>
                                <th>Item Amount</th>
                                <th>Discount</th>
                                <th>Net Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.flatMap(order => 
                                order.items.map(item => (
                                    <tr key={item._id}>
                                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                        <td>{order.supplier.supplierName}</td>
                                        <td>{item.itemId?.itemNo}</td>
                                        <td>{item.itemId?.itemName}</td>
                                        <td>{item.itemId?.stockUnit}</td>
                                        <td>{(item.itemId?.unitPrice || 0).toFixed(2)}</td>
                                        <td>{item.itemId?.packingUnit}</td>
                                        <td>{item.qty}</td>
                                        <td>{(item.qty * (item.itemId?.unitPrice || 0)).toFixed(2)}</td>
                                        <td>{item.discount || 0}</td>
                                        <td>{((item.qty * (item.itemId?.unitPrice || 0)) - (item.discount || 0)).toFixed(2)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PurchaseOrderList;

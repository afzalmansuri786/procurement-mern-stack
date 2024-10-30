export const handlePrint = (orders) => {
    const printWindow = window.open('', '_blank');
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
                                    <td>${item.itemId?.unitPrice.toFixed(2) || 0}</td>
                                    <td>${item.itemId?.packingUnit}</td>
                                    <td>${item.qty}</td>
                                    <td>${(item.qty * item.itemId?.unitPrice).toFixed(2)}</td>
                                    <td>${item.discount || 0}</td>
                                    <td>${((item.qty * item.itemId?.unitPrice) - (item.discount || 0)).toFixed(2)}</td>
                                </tr>
                            ))
                        .join('')}
                    </tbody>
                </table>
            </body>
        </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
};

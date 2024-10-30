import PurchaseOrder from './purchase-order.model.js';
import Item from '../item/item.model.js'; 


export const createPurchaseOrder = async (req, res) => {
    try {
        const { supplier, items, discount, itemTotal, netAmount, orderDate } = req.body;

        if (!supplier) {
            return res.status(400).json({ error: 'Supplier is required', code: 400 });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items must be a non-empty array', code: 400 });
        }

        console.log({supplier,
            items,
            itemTotal,
            discount,
            netAmount,})

        
        const newOrder = new PurchaseOrder({
            supplier,
            items,
            itemTotal,
            discount,
            netAmount,
            orderDate
        });

        await newOrder.save();

        
        for (const item of items) {
            await Item.findByIdAndUpdate(item.itemId, { $inc: { stockUnit: -item.qty } });
        }

        res.status(201).json({ data: newOrder, code: 201 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const getPurchaseOrders = async (req, res) => {
    try {
        const orders = await PurchaseOrder.find().populate('supplier').populate("items.itemId");
        if(!orders) return res.status(404).json({ error: "Not found", code: 404})
        res.json({ data: orders, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const getPurchaseOrderById = async (req, res) => {
    try {
        const order = await PurchaseOrder.findById(req.params.id).populate('supplier');
        if (!order) {
            return res.status(404).json({ error: 'Purchase Order not found', code: 404 });
        }
        res.json({ data: order, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const updatePurchaseOrder = async (req, res) => {
    try {
        const { supplier, items } = req.body;

        const order = await PurchaseOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Purchase Order not found', code: 404 });
        }

        order.supplier = supplier || order.supplier;
        order.items = items || order.items;

        const itemTotal = items.reduce((total, item) => total + (item.orderQty * item.unitPrice), 0);
        const discount = items.reduce((total, item) => total + item.discount, 0);
        const netAmount = itemTotal - discount;

        order.itemTotal = itemTotal;
        order.discount = discount;
        order.netAmount = netAmount;

        await order.save();

        
        

        res.json({ data: order, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const deletePurchaseOrder = async (req, res) => {
    try {
        const order = await PurchaseOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Purchase Order not found', code: 404 });
        }

        
        

        await order.remove();
        res.json({ data: 'Purchase Order deleted', code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

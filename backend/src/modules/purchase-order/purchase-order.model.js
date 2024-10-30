import mongoose from 'mongoose';

const purchaseOrderSchema = new mongoose.Schema({
    orderNo: { type: String, unique: true },
    orderDate: { type: Date, default: Date.now },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    itemTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    netAmount: { type: Number, default: 0 },
    items: [{
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        qty: { type: Number },
    }],
});

purchaseOrderSchema.pre('save', function (next) {
    this.orderNo = `PO-${Date.now()}`;
    next();
});

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);

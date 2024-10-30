import mongoose from 'mongoose';
import PurchaseOrder from '../purchase-order/purchase-order.model.js'; 
import Item from '../item/item.model.js'; 

const supplierSchema = new mongoose.Schema({
    supplierNo: { type: String, unique: true },
    supplierName: { type: String, required: true },
    address: { type: String },
    taxNo: { type: String },
    country: { type: String },
    mobileNo: { type: String },
    email: { type: String },
    status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' },
});

supplierSchema.pre('remove', async function (next) {
    await Item.updateMany({ supplier: this._id }, { $set: { supplier: null } });
    await PurchaseOrder.updateMany({ supplier: this._id }, { $set: { supplier: null } });
    next();
});

supplierSchema.pre('save', function (next) {
    this.supplierNo = `SUP-${Date.now()}`;
    next();
});

export default mongoose.model('Supplier', supplierSchema);

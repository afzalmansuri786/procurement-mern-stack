import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    itemNo: { type: String, unique: true },
    itemName: { type: String, required: true },
    inventoryLocation: { type: String },
    brand: { type: String },
    packingUnit:{ type: String,enum:["Box","Bag"], default:"Box"},
    category: { type: String },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    stockUnit: { type: Number, default: 0 },
    unitPrice: { type: Number },
    itemImages: [{ type: String }], // Array of image URLs
    status: { type: String, enum: ['Enabled', 'Disabled'], default: 'Enabled' },
});

itemSchema.pre('save', function (next) {
    this.itemNo = `ITEM-${Date.now()}`;
    next();
});

export default mongoose.model('Item', itemSchema);

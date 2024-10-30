import Item from './item.model.js';
import fs from 'fs';
import mongoose,{Mongoose, ObjectId} from 'mongoose';
import path from 'path';

const BASE_URL = 'http://localhost:5000/uploads/';

export const createItem = async (req, res) => {
    try {
        console.log({files: req.files})
        let{ itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, status, itemImages } = req.body;

        if (!itemName || !supplier || !unitPrice) {
            return res.status(400).json({ error: 'Item name, supplier, and unit price are required', code: 400 });
        }

        
        itemImages = req.files.map(file => `${BASE_URL}${file.filename}`); 

        const newItem = new Item({
            itemName,
            inventoryLocation,
            brand,
            category,
            supplier,
            stockUnit,
            unitPrice,
            itemImages,
            status,
        });

        await newItem.save();
        res.status(201).json({ data: newItem, code: 201 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const getItems = async (req, res) => {
    try {

        const supplierName = req.query?.supplier ?? ""

        let items;
        if(supplierName){
            items = await Item.find({ supplier: new mongoose.Types.ObjectId(supplierName)});
        }else{
            items = await Item.find();
        }
        
        if(!items){
            res.status(404).json({ error: "Not found", code: 500 });
        }

        
        const itemsWithFullUrls = items.map(item => ({
            ...item._doc,
            itemImages: item.itemImages.map(img => `${BASE_URL}${img}`),
        }));
        res.json({ data: itemsWithFullUrls, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found', code: 404 });
        }
        
        const itemWithFullUrls = {
            ...item._doc,
            itemImages: item.itemImages.map(img => `${BASE_URL}${img}`),
        };
        res.json({ data: itemWithFullUrls, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found', code: 404 });
        }

        
        item.itemImages.forEach(img => {
            const filePath = path.join(__dirname, '../../uploads', img.split('/').pop()); 
            fs.unlink(filePath, err => {
                if (err) console.error(`Failed to delete image: ${filePath}`, err);
            });
        });

        await Item.findByIdAndDelete(id);
        res.json({ data: 'Item deleted successfully', code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};


export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, inventoryLocation, brand, category, supplier, stockUnit, unitPrice, status } = req.body;

        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found', code: 404 });
        }

        
        const itemImages = req.files ? req.files.map(file => `${BASE_URL}${file.filename}`) : item.itemImages;

        item.itemName = itemName || item.itemName;
        item.inventoryLocation = inventoryLocation || item.inventoryLocation;
        item.brand = brand || item.brand;
        item.category = category || item.category;
        item.supplier = supplier || item.supplier;
        item.stockUnit = stockUnit || item.stockUnit;
        item.unitPrice = unitPrice || item.unitPrice;
        item.itemImages = itemImages; 
        item.status = status || item.status;

        await item.save();
        res.json({ data: item, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

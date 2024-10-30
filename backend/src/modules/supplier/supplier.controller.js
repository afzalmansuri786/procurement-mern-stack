import Supplier from './supplier.model.js';

export const createSupplier = async (req, res) => {
    try {
        const { supplierName, address, taxNo, country, mobileNo, email } = req.body;

        if (!supplierName) {
            return res.status(400).json({ error: 'Supplier name is required', code: 400 });
        }
        if (!email) {
            return res.status(400).json({ error: 'Email is required', code: 400 });
        }

        const supplier = new Supplier({ supplierName, address, taxNo, country, mobileNo, email });
        await supplier.save();
        res.status(201).json({ data: supplier, code: 201 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json({ data: suppliers, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

export const getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found', code: 404 });
        }
        res.json({ data: supplier, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

export const updateSupplier = async (req, res) => {
    try {
        const { supplierName, address, taxNo, country, mobileNo, email, status } = req.body;

        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found', code: 404 });
        }

        supplier.supplierName = supplierName || supplier.supplierName;
        supplier.address = address || supplier.address;
        supplier.taxNo = taxNo || supplier.taxNo;
        supplier.country = country || supplier.country;
        supplier.mobileNo = mobileNo || supplier.mobileNo;
        supplier.email = email || supplier.email;
        supplier.status = status || supplier.status;

        await supplier.save();
        res.json({ data: supplier, code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

export const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found', code: 404 });
        }

        await supplier.remove();
        res.json({ data: 'Supplier deleted', code: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message, code: 500 });
    }
};

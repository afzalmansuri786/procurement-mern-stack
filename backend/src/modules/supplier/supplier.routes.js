import express from 'express';
import {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} from './supplier.controller.js';

export const supliersRouter = express.Router();

supliersRouter.post('/', createSupplier);
supliersRouter.get('/', getSuppliers);
supliersRouter.get('/:id', getSupplierById);
supliersRouter.put('/:id', updateSupplier);
supliersRouter.delete('/:id', deleteSupplier);
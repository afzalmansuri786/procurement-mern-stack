import express from 'express';
import { createPurchaseOrder, getPurchaseOrders, getPurchaseOrderById, updatePurchaseOrder, deletePurchaseOrder } from './purchase-order.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js'; // Import the middleware

const router = express.Router();

router.post('/', createPurchaseOrder);
router.get('/', getPurchaseOrders);
router.get('/:id', getPurchaseOrderById);
router.put('/:id', updatePurchaseOrder);
router.delete('/:id', deletePurchaseOrder);

export const purchaseOrderRouter = router;

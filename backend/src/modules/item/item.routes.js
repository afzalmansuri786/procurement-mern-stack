import express from 'express';
import { createItem, getItems, getItemById, updateItem, deleteItem } from './item.controller.js';
import { upload } from '../../configs/multer.js'


export const itemRouter = express.Router();

itemRouter.post('/', upload.array('itemImages'), createItem);

itemRouter.get('/', getItems);

itemRouter.get('/:id', getItemById);

itemRouter.put('/:id', upload.array('itemImages'), updateItem);

itemRouter.delete('/:id', deleteItem);

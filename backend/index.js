import express from 'express';
import cors from 'cors';
import connectDB from './src/configs/db.js'
import { userRouter } from './src/modules/user/user.routes.js'; // Add this line
import { supliersRouter } from './src/modules/supplier/supplier.routes.js';
import { itemRouter } from './src/modules/item/item.routes.js';
import { purchaseOrderRouter } from './src/modules/purchase-order/purchase-order.routes.js';
import bodyParser from 'body-parser'
const app = express();

app.use(cors({
    origin:"*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/suppliers', supliersRouter);
app.use('/api/items', itemRouter);
app.use('/api/purchase-orders', purchaseOrderRouter);
app.use('/api/users', userRouter); // Add this line

app.get('/api', (req, res) => {
    return res.status(200).json({ message: "Server is up" });
});
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message, code: 500 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up at port: ${PORT}`);
});

import axios from 'axios';

const apiUrl =  process.env.REACT_APP_API_URL ?? "http://127.0.0.1:5000/api";

export const getSuppliers = async () => await axios.get(`${apiUrl}/suppliers`);
export const createSupplier = async (data) => await axios.post(`${apiUrl}/suppliers`, data);
export const updateSupplier = async (id, data) => await axios.put(`${apiUrl}/suppliers/${id}`, data);
export const deleteSupplier = async (id) => await axios.delete(`${apiUrl}/suppliers/${id}`);

export const getItems = async () => await axios.get(`${apiUrl}/items`);
export const createItem = async (data) => await axios.post(`${apiUrl}/items`, data, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const updateItem = async (id, data) => await axios.put(`${apiUrl}/items/${id}`, data, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
export const deleteItem = async (id) => await axios.delete(`${apiUrl}/items/${id}`);

export const getPurchaseOrders = async () => await axios.get(`${apiUrl}/purchase-orders`);
export const createPurchaseOrder = async (data) => await axios.post(`${apiUrl}/purchase-orders`, data);


export const getItemsBySupplier = async (supplierName) => {
    return await axios.get(`${apiUrl}/items?supplier=${supplierName}`);
};


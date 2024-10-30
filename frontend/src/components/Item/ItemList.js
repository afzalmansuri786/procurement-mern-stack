import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../../Api/api';
import './Item.css';

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await getItems();
            setItems(response.data.data);
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        await deleteItem(id);
        setItems(items.filter((item) => item._id !== id));
    };

    return (
        <div className="item-list">
            <h2>Item List</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id}>
                       Name:  {item.itemName} <pre> | </pre> 
                        Category: {item?.category} <pre> | </pre> 
                        Available stock: {item?.stockUnit} <pre> | </pre> 
                        Price: ${item?.unitPrice} <pre> | </pre> 
                        <button onClick={() => handleDelete(item._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;

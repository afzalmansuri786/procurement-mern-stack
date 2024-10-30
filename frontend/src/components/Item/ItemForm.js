import React, { useEffect, useState } from 'react';
import { createItem, getSuppliers } from '../../Api/api';
import './Item.css';

const ItemForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    inventoryLocation: '',
    brand: '',
    category: '',
    supplier: '',
    stockUnit: '',
    unitPrice: '',
    itemImages: [],
    status: 'Enabled',
  });

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await getSuppliers();
      setSuppliers(response.data.data);
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, itemImages: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

  
    for (const key in formData) {
      if (key === 'itemImages') {
        formData[key].forEach((file) => {
          data.append('itemImages', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    }

    console.log({formData})

    try {
      const response = await createItem(data);
      onItemAdded(response.data.data);
    } catch (error) {
      console.error('Error adding item:', error);
    
    }
  };

  return (
    <div className="item-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="itemName" placeholder="Item Name" onChange={handleChange} required />
        <input type="text" name="inventoryLocation" placeholder="Inventory Location" onChange={handleChange} />
        <input type="text" name="brand" placeholder="Brand" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />

        {/* Supplier Dropdown */}
        <select name="supplier" onChange={handleChange} required>
          <option value="">Select Supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>

        <input type="text" name="stockUnit" placeholder="Stock Unit" onChange={handleChange} />
        <input type="number" name="unitPrice" placeholder="Unit Price" onChange={handleChange} />
        <input type="file" name="itemImages" multiple onChange={handleFileChange} />
        <select name="status" onChange={handleChange}>
          <option value="Enabled">Enabled</option>
          <option value="Disabled">Disabled</option>
        </select>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
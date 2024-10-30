import React, { useState } from 'react';
import ItemForm from '../components/Item/ItemForm';
import ItemList from '../components/Item/ItemList';

const Items = () => {
    const [refresh, setRefresh] = useState(false);

    const handleItemAdded = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <h1>Items</h1>
            <ItemForm onItemAdded={handleItemAdded} />
            <ItemList refresh={refresh} />
        </div>
    );
};

export default Items;

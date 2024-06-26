import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const [itemNames, setItemNames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const fetchItemNames = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/items', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setItemNames(response.data);
            } catch (error) {
                console.error('Error fetching item names:', error);
            }
        };

        const fetchCategories = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/item-categories', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchItemNames();
        fetchCategories();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setFilteredCategories(categories.filter(category => category.name.includes(e.target.value)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/items', {
                name,
                category_id: categoryId,
                serial_number: serialNumber
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 201) {
                alert('Item added successfully');
                setName('');
                setCategoryId('');
                setSerialNumber('');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item Name:</label>
                    <select
                        value={name}
                        onChange={handleNameChange}
                        required
                    >
                        <option value="">Select Item Name</option>
                        {itemNames.map((item, index) => (
                            <option key={index} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {filteredCategories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Serial Number:</label>
                    <input
                        type="text"
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddItem;

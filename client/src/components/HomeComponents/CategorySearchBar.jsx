import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Search/CategorySearchBar.css";

const CategorySearchBar = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // Mock categories for fallback
    const mockCategories = [
        { _id: '1', name: 'Web Development' },
        { _id: '2', name: 'Design' },
        { _id: '3', name: 'Digital Marketing' },
        { _id: '4', name: 'Writing' },
        { _id: '5', name: 'Video Editing' },
    ];

    // Fetch categories from the backend API or fallback to mock categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/categories');
                if (response.data.success) {
                    setCategories(response.data.data);  // Set the categories from the API
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories(mockCategories);  // Use mock categories on error
            }
        };

        fetchCategories();
    }, []); // Empty dependency array means this runs once on mount

    // Handle category selection (you can replace this with your actual logic)
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        if (e.target.value) {
            window.location.href = `/search?category=${e.target.value}`;
        }
    };

    return (
        <div className="category-search-container">
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="category-dropdown"
                required
            >
                <option value="">Select a Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategorySearchBar;

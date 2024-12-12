import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Search/CategorySearchBar.css";

const CategorySearchBar = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isTechnical, setIsTechnical] = useState(true); // Default to technical

    // Mock categories for fallback (split into technical and non-technical)
    const mockCategories = {
        technical: [
            { _id: '1', name: 'Web Development' },
            { _id: '2', name: 'Network Engineering' },
            { _id: '3', name: 'Software Development' },
        ],
        nonTechnical: [
            { _id: '4', name: 'Plumbing' },
            { _id: '5', name: 'Electrical Services' },
            { _id: '6', name: 'Carpentry' },
        ]
    };

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
                setCategories(mockCategories.technical);  // Default to technical if error occurs
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

    // Toggle between technical and non-technical
    const toggleCategoryType = () => {
        setIsTechnical((prev) => !prev);
        setSelectedCategory(''); // Reset category selection on toggle
    };

    // Get the categories based on the toggle state
    const filteredCategories = isTechnical ? mockCategories.technical : mockCategories.nonTechnical;

    return (
        <div className="category-search-container">
            <div className="category-dropdown-container">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="category-dropdown"
                    required
                >
                    <option value="">Select a Category</option>
                    {filteredCategories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <div className="toggle-container">
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isTechnical}
                            onChange={toggleCategoryType}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                    <span className="toggle-label">
                        {isTechnical ? 'Technical' : 'Non-Technical'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CategorySearchBar;

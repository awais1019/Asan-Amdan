import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Search/CategorySearchBar.css";

const CategorySearchBar = () => {
    const [categories, setCategories] = useState({ technical: [], nonTechnical: [] });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isTechnical, setIsTechnical] = useState(true); // Default to technical

    // Fetch categories from the backend API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/categories');
                if (response.data.success) {
                    const allCategories = response.data.data;

                    // Separate categories into technical and non-technical
                    const technical = allCategories.filter(category => category.type === 'technical');
                    const nonTechnical = allCategories.filter(category => category.type === 'non-technical');

                    setCategories({ technical, nonTechnical });
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback to mock data if API fails
                setCategories({
                    technical: [
                        { _id: '1', name: 'Web Development' },
                        { _id: '2', name: 'Network Engineering' },
                        { _id: '3', name: 'Software Development' },
                    ],
                    nonTechnical: [
                        { _id: '4', name: 'Plumbing' },
                        { _id: '5', name: 'Electrical Services' },
                        { _id: '6', name: 'Carpentry' },
                    ],
                });
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
    const filteredCategories = isTechnical ? categories.technical : categories.nonTechnical;

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

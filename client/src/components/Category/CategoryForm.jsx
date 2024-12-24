import React, { useState, useEffect } from 'react';  // Import your existing fetchCategories function
import "../styles/Search/CategorySearchBar.css";
import fetchCategories from "../Fetch/FetchCategories";

const CategorySearchBar = () => {
    const [categories, setCategories] = useState({ technical: [], nonTechnical: [] });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isTechnical, setIsTechnical] = useState(true); // Default to technical

    // Fetch categories from the backend API
    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();  // Call the external fetchCategories function
            if (fetchedCategories.length > 0) {
                // Separate categories into technical and non-technical
                const technical = fetchedCategories.filter(category => category.isTechnical === true);
                const nonTechnical = fetchedCategories.filter(category => category.isTechnical === false);

                setCategories({ technical, nonTechnical });
            } else {
                // Fallback to mock data if no categories fetched
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

        getCategories();  // Call the function to fetch categories
    }, []); // Empty dependency array means this runs once on mount

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);

        if (categoryId) {
            window.location.href = `/search?category=${categoryId}`;
        }
    };

    // Toggle between technical and non-technical categories
    const toggleCategoryType = () => {
        setIsTechnical((prev) => !prev);
        setSelectedCategory(''); // Reset category selection on toggle
    };

    // Get the categories based on the toggle state
    const filteredCategories = isTechnical ? categories.technical : categories.nonTechnical;

    return (
        <div className="category-search-container">
            <div className="category-toggle-container">
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

            <div className="category-list-container">
                {filteredCategories.map((category) => (
                    <div
                        key={category._id}
                        className={`category-item ${selectedCategory === category._id ? 'selected' : ''}`}
                        onClick={() => handleCategoryChange(category._id)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySearchBar;

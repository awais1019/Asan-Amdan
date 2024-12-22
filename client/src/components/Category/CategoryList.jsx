import React from "react";
import "./styles/CategoryList.css";

const CategoryList = ({ categories, deleteCategory, editCategory }) => {
  return (
    <div className="category-list">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>Type: <strong>{category.type === "technical" ? "Technical" : "Non-Technical"}</strong></p>
            </div>
            <div className="actions">
              <button className="edit-btn" onClick={() => editCategory(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteCategory(index)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-categories">No categories added yet.</p>
      )}
    </div>
  );
};

export default CategoryList;

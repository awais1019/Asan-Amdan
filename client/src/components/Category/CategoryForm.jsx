import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Category/CategoryForm.css";

const Header = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("technical");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch all categories on component load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/categories/getAllCategories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data?.msg || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        const token = localStorage.getItem("authToken");
        const newCategory = { name, isTechnical: type === "technical" };
        const response = await axios.post(
          "http://localhost:4000/api/v1/categories/addCategory",
          newCategory,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCategories([...categories, response.data.category]);
        setName(""); // Reset form
      } catch (error) {
        console.error("Error adding category:", error.response?.data?.msg || error.message);
      }
    }
  };

  const deleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4000/api/v1/categories/deleteCategory/${id}`, {
        headers: { Authorization: token },
      });
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error.response?.data?.msg || error.message);
    }
  };

  const saveUpdatedCategory = async () => {
    if (!editingCategory) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:4000/api/v1/categories/updateCategory/${editingCategory._id}`,
        editingCategory,
        {
          headers: { Authorization: token },
        }
      );
      setCategories(
        categories.map((category) =>
          category._id === editingCategory._id ? response.data.category : category
        )
      );
      setEditingCategory(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating category:", error.response?.data?.msg || error.message);
    }
  };

  return (
    <header className="header">
      <h1>Category Management</h1>
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="type"
              value="technical"
              checked={type === "technical"}
              onChange={(e) => setType(e.target.value)}
            />
            Technical
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="non-technical"
              checked={type === "non-technical"}
              onChange={(e) => setType(e.target.value)}
            />
            Non-Technical
          </label>
        </div>
        <button type="submit">Add Category</button>
      </form>
      <div className="category-list">
        <h2>Existing Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {editingCategory && editingCategory._id === category._id ? (
                <>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                  />
                  <select
                    value={editingCategory.isTechnical ? "technical" : "non-technical"}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        isTechnical: e.target.value === "technical",
                      })
                    }
                  >
                    <option value="technical">Technical</option>
                    <option value="non-technical">Non-Technical</option>
                  </select>
                  <button onClick={saveUpdatedCategory}>Save</button>
                  <button onClick={() => setEditingCategory(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {category.name} ({category.isTechnical ? "Technical" : "Non-Technical"})
                  <button onClick={() => deleteCategory(category._id)}>Delete</button>
                  <button onClick={() => setEditingCategory(category)}>Update</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;

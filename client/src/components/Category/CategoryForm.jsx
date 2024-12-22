import React, { useState } from "react";
import "../styles/Category/CategoryForm";

const Header = ({ addCategory }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("technical");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addCategory({ name, type });
      setName(""); // Reset the form
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
    </header>
  );
};

export default Header;

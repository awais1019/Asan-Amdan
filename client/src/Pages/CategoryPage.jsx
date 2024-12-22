import React, { useState } from "react";
import CategoryForm from "../components/Category/CategoryForm";
import CategoryList from "../components/Category/CategoryList";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const editCategory = (index) => {
    const name = prompt("Edit category name:", categories[index].name);
    if (name) {
      const updatedCategories = [...categories];
      updatedCategories[index].name = name;
      setCategories(updatedCategories);
    }
  };

  return (
    <div>
      <CategoryForm addCategory={addCategory} />
      <CategoryList
        categories={categories}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
      />
    </div>
  );
};

export default CategoryPage;

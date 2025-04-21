import React from "react";

function Categories({ categories, selectedCategory, setSelectedCategory }) {
  const handleChange = (id) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  };

  return (
    <div className="box">
      <h3>Categories</h3>
      {categories.map((cat) => (
        <label key={cat.CategoryID}>
          <input
            type="checkbox"
            checked={selectedCategory === cat.CategoryID}
            onChange={() => handleChange(cat.CategoryID)}
          />
          {cat.CategoryName}
        </label>
      ))}
    </div>
  );
}

export default Categories;

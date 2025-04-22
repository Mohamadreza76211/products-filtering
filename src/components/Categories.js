import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

function Categories({ categories, selectedCategory, setSelectedCategory }) {
  const handleChange = (id) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  };

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <FormControlLabel
          key={cat.CategoryID}
          control={
            <Checkbox
              checked={selectedCategory === cat.CategoryID}
              onChange={() => handleChange(cat.CategoryID)}
            />
          }
          label={cat.CategoryName}
        />
      ))}
    </div>
  );
}

export default Categories;

import React from "react";
import Categories from "./Categories";
import Filters from "./Filters";

function Sidebar({
  categories,
  filters,
  selectedCategory,
  setSelectedCategory,
  selectedOptions,
  setSelectedOptions,
}) {
  return (
    <div className="sidebar">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Filters
        filters={filters}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>
  );
}

export default Sidebar;

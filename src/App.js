import React, { useState, useEffect } from "react";
import "./Style/Sidebar.scss";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import data from "./data/products.json";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(data.Data.Products);

  useEffect(() => {
    let result = data.Data.Products;

    if (selectedCategory) {
      result = result.filter(
        (product) => product.CategoryID === selectedCategory
      );
    }

    if (selectedOptions.length > 0) {
      result = result.filter((product) =>
        selectedOptions.every((selectedKey) => {
          const [filterId, optionId] = selectedKey.split("_").map(Number);
          return product.Filters.some(
            (f) => f.Filter === filterId && f.Option === optionId
          );
        })
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedOptions]);

  return (
    <div className="container">
      <Sidebar
        categories={data.Data.Categories}
        filters={data.Data.Filters}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Products products={filteredProducts} />
    </div>
  );
}

export default App;

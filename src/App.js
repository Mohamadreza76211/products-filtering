import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Products from "./components/Products";
import data from "./data/products.json";
import "./Style/Sidebar.scss";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(data.Data.Products);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    const filtersParam = params.get("filters");

    if (categoryParam) {
      setSelectedCategory(Number(categoryParam));
    }

    if (filtersParam) {
      const options = filtersParam.split(",").filter(Boolean);
      setSelectedOptions(options);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== null) {
      params.set("category", selectedCategory);
    }

    if (selectedOptions.length > 0) {
      params.set("filters", selectedOptions.join(","));
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [selectedCategory, selectedOptions]);

  useEffect(() => {
    let result = data.Data.Products;

    if (selectedCategory) {
      result = result.filter(
        (product) => product.CategoryID === selectedCategory
      );
    }

    if (selectedOptions.length > 0) {
      const groupedFilters = {};

      selectedOptions.forEach((key) => {
        const [filterId, optionId] = key.split("_").map(Number);
        if (!groupedFilters[filterId]) groupedFilters[filterId] = [];
        groupedFilters[filterId].push(optionId);
      });

      result = result.filter((product) => {
        return Object.entries(groupedFilters).every(([filterId, optionIds]) => {
          return product.Filters.some(
            (f) => f.Filter === Number(filterId) && optionIds.includes(f.Option)
          );
        });
      });
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedOptions]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: "flex", gap: 4 }}>
        <Sidebar
          categories={data.Data.Categories}
          filters={data.Data.Filters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <Products products={filteredProducts} />
      </Box>
    </Container>
  );
}

export default App;

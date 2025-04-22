import React from "react";
import { Box, Typography } from "@mui/material";
import { Category, FilterList } from "@mui/icons-material";
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
    <Box className="sidebar">
      <Box className="box">
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <Category sx={{ marginRight: 1 }} />
          Categories
        </Typography>
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>

      <Box className="box">
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <FilterList sx={{ marginRight: 1 }} />
          Filters
        </Typography>
        <Filters
          filters={filters}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </Box>
    </Box>
  );
}

export default Sidebar;

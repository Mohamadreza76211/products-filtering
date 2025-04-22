import React from "react";
import { FormControlLabel, Checkbox, Typography } from "@mui/material";

function Filters({ filters, selectedOptions, setSelectedOptions }) {
  const handleOptionChange = (filterId, optionId) => {
    const key = `${filterId}_${optionId}`;
    if (selectedOptions.includes(key)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== key));
    } else {
      setSelectedOptions([...selectedOptions, key]);
    }
  };

  return (
    <div className="filter-group">
      {filters.map((filter) => (
        <div key={filter.FilterID}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {filter.FilterName}
          </Typography>
          {filter.Options.map((opt) => {
            const key = `${filter.FilterID}_${opt.OptionID}`;
            return (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(key)}
                    onChange={() =>
                      handleOptionChange(filter.FilterID, opt.OptionID)
                    }
                  />
                }
                label={opt.OptionName}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Filters;

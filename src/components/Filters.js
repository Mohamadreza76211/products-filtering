import React from "react";

function Filters({ filters, selectedOptions, setSelectedOptions }) {
  const handleOptionChange = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  return (
    <div className="box">
      <h3>Filters</h3>
      {filters.map((filter) => (
        <div className="filter-group" key={filter.FilterID}>
          <p>{filter.FilterName}</p>
          {filter.Options.map((opt) => (
            <label key={opt.OptionID}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(opt.OptionID)}
                onChange={() => handleOptionChange(opt.OptionID)}
              />
              {opt.OptionName}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Filters;

import React from "react";

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
    <div className="box">
      <h3>Filters</h3>
      {filters.map((filter) => (
        <div className="filter-group" key={filter.FilterID}>
          <p>{filter.FilterName}</p>
          {filter.Options.map((opt) => {
            const key = `${filter.FilterID}_${opt.OptionID}`;
            return (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(key)}
                  onChange={() =>
                    handleOptionChange(filter.FilterID, opt.OptionID)
                  }
                />
                {opt.OptionName}
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Filters;

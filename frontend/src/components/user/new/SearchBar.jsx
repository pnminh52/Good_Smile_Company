import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = ({ onSearch, onFilter }) => {
  const [activeType, setActiveType] = useState(null);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  const handleFilterClick = (type) => {
    if (activeType === type) {
      setActiveType(null);
      onFilter(null);
    } else {
      setActiveType(type);
      onFilter(type); 
    }
  };
  
  return (
    <div className="w-full mx-auto space-y-2">
      <Input
        placeholder="Search..."
        allowClear
        size="large"
        onChange={handleChange}
      />

      <div className="w-full flex items-center gap-2">
        <div
          onClick={() => handleFilterClick("shipping info")}
          className={`border cursor-pointer rounded-sm p-2 w-full transition duration-300 ease-in-out flex items-center gap-2 
          ${activeType === "shipping info" ? "border border-[#F06E00]" : "border-gray-300"}`}
        >
          <img src="https://www.goodsmile.com/img/icon/shipping.svg" alt="" />
          <p>Shipping info</p>
        </div>

        <div
          onClick={() => handleFilterClick("notice")}
          className={`border cursor-pointer rounded-sm p-2  transition duration-300 ease-in-out w-full flex items-center gap-2 
          ${activeType === "notice" ? "border border-[#F06E00]" : "border-gray-300"}`}
        >
          <img src="https://www.goodsmile.com/img/icon/clock.svg" alt="" />
          <p>Notice</p>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import { Input } from "antd";
const { Search } = Input;

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div className=" w-full mx-auto">
      <Search
        placeholder="Search..."
        allowClear
        size="large"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;

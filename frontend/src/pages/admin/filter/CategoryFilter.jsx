import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;

const CategoryFilter = ({
  alphabetSort,
  setAlphabetSort,
  countSort,
  setCountSort,
  dateSort,
  setDateSort,
  searchText,
  setSearchText,
}) => {
  return (
    <div className="flex justify-between py-4 items-center">
    <div className="flex gap-2 items-center">
    <Select
        value={alphabetSort}
        onChange={(value) => {
          setAlphabetSort(value);
          setCountSort("");
          setDateSort("");
        }}
        placeholder="Sort by Alphabet "
        style={{ width: 150 }}
        allowClear
      >
        <Option value="">Sort by Alphabet</Option>
        <Option value="asc">A → Z</Option>
        <Option value="desc">Z → A</Option>
      </Select>

   

      <Select
        value={countSort}
        onChange={(value) => {
          setCountSort(value);
          setAlphabetSort("");
          setDateSort("");
        }}
        placeholder="Sort by Product Count "
        style={{ width: 150 }}
        allowClear
      >
                <Option value="">Sort by Product Count</Option>

        <Option value="asc">Low → High</Option>
        <Option value="desc">High → Low</Option>
      </Select>

      <Select
        value={dateSort}
        onChange={(value) => {
          setDateSort(value);
          setAlphabetSort("");
          setCountSort("");
        }}
        placeholder="Sort by Created Date"
        style={{ width: 150 }}
        allowClear
      >
                <Option value="">Sort by Create Date</Option>

        <Option value="asc">Old → New</Option>
        <Option value="desc">New → Old</Option>
      </Select>
    </div>
         <Input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by name..."
              style={{ width: 250 }}
              allowClear
            />
    </div>
  );
};

export default CategoryFilter;

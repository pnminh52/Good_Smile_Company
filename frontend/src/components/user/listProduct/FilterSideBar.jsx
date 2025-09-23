import React, { useState, useEffect } from "react";
import { Select, Input } from "antd";
import PopupFilters from "./PopupFilters";
import PriceFilter from './PriceFilter';

const { Option } = Select;

const FilterSideBar = ({
  priceRange, setPriceRange,
  sortAlpha, setSortAlpha,
  setShowFilter,
  statusFilter, setSortPrice,
  setSelectedSeries, setSelectedCategories, setSelectedManufacturers,
  setStockFilter, setStatusFilter,
  sortPrice, stockFilter,
  selectedSeries, selectedCategories, selectedManufacturers,
  products,
  giftFilter, setGiftFilter,
  setSortSold, sortSold,
  searchTerm, setSearchTerm
}) => {

  const seriesOptions = [...new Set(products.map((p) => p.series).filter(Boolean))];
  const categoryOptions = [...new Set(products.map((p) => p.category_name).filter(Boolean))];
  const manufacturerOptions = [...new Set(products.map((p) => p.manufacturer).filter(Boolean))];



  const selectStyle = { width: "100%", marginBottom: "12px" };
  const handleMobileChange = (setter) => (value) => {
    setter(value);
    if (setShowFilter) setShowFilter(false);
  };
  return (
    <div className="space-y-3">

      <div className="hidden sm:block">
        <Input
          placeholder="Search..."
          allowClear
          size="large"
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />

      </div>

      <div className="flex flex-col gap-0 ">
        <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />

        <Select
          placeholder="Sort Alphabet"
          value={sortAlpha}
          onChange={handleMobileChange(setSortAlpha)}
          style={selectStyle}
          size="large"
        >
          <Option value="">Sort by alphabet</Option>
          <Option value="asc">A → Z</Option>
          <Option value="desc">Z → A</Option>
        </Select>
        <Select
          placeholder="Sort Sold"
          value={sortSold}
          onChange={(value) => setSortSold(value)}
          style={selectStyle}
          size="large"
        >
          <Option value="">Sort by sold</Option>
          <Option value="asc">Low → High</Option>
          <Option value="desc">High → Low</Option>
        </Select>


        <Select
          placeholder="Stock"
          value={stockFilter}
          onChange={handleMobileChange(setStockFilter)}
          allowClear
          style={selectStyle}
          size="large"
        >
          <Option value="">Sort by stock</Option>
          <Option value="inStock">In Stock (≥50)</Option>
          <Option value="few">Few left (1-49)</Option>
          <Option value="soldOut">Sold Out</Option>
        </Select>

        <Select
          placeholder="Status"
          value={statusFilter}
          onChange={handleMobileChange(setStatusFilter)}
          allowClear
          style={selectStyle}
          size="large"
        >
          <Option value="">Sort by status</Option>
          <Option value="available">Available</Option>
          <Option value="preorder">Pre-Order</Option>
          <Option value="soldout">Sold Out</Option>
        </Select>

        <Select
          placeholder="Sort Price"
          value={sortPrice}
          onChange={handleMobileChange(setSortPrice)}
          style={selectStyle}
          size="large"
        >
          <Option value="">Sort by price</Option>
          <Option value="asc">Low → High</Option>
          <Option value="desc">High → Low</Option>
        </Select>
        <div className="py-2">
        <label
  className="flex items-center gap-2 cursor-pointer"
  onClick={() => setGiftFilter(!giftFilter)}
>
  {/* Custom checkbox */}
  <span
    className={`w-5 h-5 flex items-center justify-center rounded-md border transition-all duration-300 
      ${giftFilter ? "bg-[#F06E00] border-[#F06E00]" : "bg-white border-gray-300"}`}
  >
    {/* Không có dấu tích, chỉ đổi màu */}
  </span>
  <span className="truncate ">Bonus Included</span>
</label>

  </div>
      </div>
      <hr className="border-t pb-2 border-gray-300" />

      <div>
        {/* 3 filter đầu bằng PopupFilters */}
        <PopupFilters
          placeholder="Search by Series"
          options={seriesOptions}
          selected={selectedSeries}
          setSelected={setSelectedSeries}
          setShowFilter={setShowFilter}
        />
        <PopupFilters
          placeholder="Search by Category"
          options={categoryOptions}
          selected={selectedCategories}
          setSelected={setSelectedCategories}
          setShowFilter={setShowFilter}
        />
        <PopupFilters
          placeholder="Search by Manufacturer"
          options={manufacturerOptions}
          selected={selectedManufacturers}
          setSelected={setSelectedManufacturers}
          setShowFilter={setShowFilter}
        />
      </div>
    </div>
  );
};

export default FilterSideBar;

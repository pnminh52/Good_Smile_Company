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
  searchTerm, setSearchTerm, handleResetAll, activeFiltersCount
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
          placeholder="Sort by alphabet"
          value={sortAlpha || undefined}
          onChange={handleMobileChange(setSortAlpha)}
          style={selectStyle}
          size="large"
          allowClear
        >
          <Option value="asc">A → Z</Option>
          <Option value="desc">Z → A</Option>
        </Select>
        <Select
          placeholder="Sort by sold"
          value={sortSold || undefined}
          onChange={(value) => setSortSold(value)}
          style={selectStyle}
          size="large"
          allowClear
        >
          <Option value="asc">Low → High</Option>
          <Option value="desc">High → Low</Option>
        </Select>
      


        <Select
          placeholder="Sort by stock"
          value={stockFilter || undefined}
          onChange={handleMobileChange(setStockFilter)}
          allowClear
          style={selectStyle}
          size="large"
        >
          <Option value="inStock">In Stock (≥50)</Option>
          <Option value="few">Few left (1-49)</Option>
          <Option value="soldOut">Sold Out</Option>
        </Select>

        <Select
  placeholder="Sort by status"
  value={statusFilter || undefined} 
  onChange={handleMobileChange(setStatusFilter)}
  allowClear
  style={selectStyle}
  size="large"
>
  <Option value="available">Available</Option>
  <Option value="preorder">Pre-Order</Option>
  <Option value="soldout">Sold Out</Option>
</Select>


        <Select
          placeholder="Sort by price"
          value={sortPrice || undefined}
          onChange={handleMobileChange(setSortPrice)}
          style={selectStyle}
          size="large"
          allowClear
        >
          <Option value="asc">Low → High</Option>
          <Option value="desc">High → Low</Option>
        </Select>
        {
  activeFiltersCount >1 && (
        <button onClick={()=>handleResetAll()} className="border py-1 border-red-600 text-red-600 cursor-pointer hidden sm:block rounded-full ">
          Clear All
        </button>
  )}
        <div className="py-2">
        <label
  className={`flex ${activeFiltersCount>1&&(
    "pt-2"
  )} items-center gap-2 cursor-pointer`}
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

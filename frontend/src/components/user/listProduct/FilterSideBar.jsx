// FilterSideBar.jsx
import React, { useState, useEffect } from "react";
import { Select, Input } from "antd";
import PopupFilters from "./PopupFilters";
import PriceFilter from './PriceFilter';

const { Option } = Select;
const { Search } = Input;

const FilterSideBar = ({priceRange, setPriceRange,sortAlpha, setSortAlpha,setShowFilter,statusFilter,setSortPrice, setSelectedSeries, setSelectedCategories, setSelectedManufacturers, setStockFilter, setStatusFilter, sortPrice,stockFilter, selectedSeries, selectedCategories, selectedManufacturers, products, setFilteredProducts, searchTerm, setSearchTerm }) => {



  const seriesOptions = [...new Set(products.map((p) => p.series).filter(Boolean))];
  const categoryOptions = [...new Set(products.map((p) => p.category_name).filter(Boolean))];
  const manufacturerOptions = [...new Set(products.map((p) => p.manufacturer).filter(Boolean))];

  useEffect(() => {
    let filtered = [...products];

    if (selectedSeries.length) filtered = filtered.filter((p) => selectedSeries.includes(p.series));
    if (selectedCategories.length) filtered = filtered.filter((p) => selectedCategories.includes(p.category_name));
    if (selectedManufacturers.length) filtered = filtered.filter((p) => selectedManufacturers.includes(p.manufacturer));
    if (stockFilter) {
      filtered = filtered.filter((p) => {
        if (stockFilter === "inStock") return p.stock >= 50;
        if (stockFilter === "few") return p.stock > 0 && p.stock < 50;
        if (stockFilter === "soldOut") return p.stock === 0;
        return true;
      });
    }
    if (statusFilter) filtered = filtered.filter((p) => p.status === statusFilter);
    if (sortPrice === "asc") filtered.sort((a, b) => a.price - b.price);
    if (sortPrice === "desc") filtered.sort((a, b) => b.price - a.price);
    if (sortAlpha==="asc") filtered.sort((a,b)=> a.name.localeCompare(b.name))
      if (sortAlpha==="desc") filtered.sort((a,b)=> b.name.localeCompare(a.name))
        if (priceRange) {
          filtered = filtered.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
          );
        }
    setFilteredProducts(filtered);
  }, [
    selectedSeries,
    selectedCategories,
    selectedManufacturers,
    stockFilter,
    statusFilter,
    sortPrice,
    sortAlpha,
    products,
    priceRange,
    setFilteredProducts,
  ]);

  const selectStyle = { width: "100%", marginBottom: "12px" }; // full width + margin between rows
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
    size="large"   // 👈 để đồng bộ chiều cao
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

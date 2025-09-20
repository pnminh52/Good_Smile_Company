import React, { useEffect, useState } from "react";
import ProductCard from "../../components/user/listProduct/ProductCard";
import Loader from "../../components/Loader";
import FilterSideBar from "../../components/user/listProduct/FilterSideBar";
import { getProducts } from "../../api/products";
import { Input, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import NoResult from "../../components/user/NoResult";
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
    const [selectedSeries, setSelectedSeries] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [stockFilter, setStockFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortPrice, setSortPrice] = useState("");

  // Lọc theo searchTerm
  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  // Lấy tất cả sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("❌ Error fetchProducts:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
     
        <Loader />
    
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-0">
      <h1 className="sm:text-2xl text-xl  font-semibold py-4 sm:py-6">Our Collection ({filteredProducts.length})</h1>

      {/* Mobile Filter Button */}
      <div className="sm:hidden flex items-center gap-2 mb-2">
  <Input
    placeholder="Search..."
    allowClear
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    size="large"
  />
  <Button
    type="default"
    icon={<FilterOutlined />}
    onClick={() => setShowFilter(true)}
    size="large"
  />
</div>

      {/* Drawer Filter Mobile */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 bg-opacity-40"
            onClick={() => setShowFilter(false)}
          ></div>

          {/* Drawer */}
          <div className="relative bg-white w-4/5 max-w-xs h-full p-4 overflow-y-auto">
            {/* <button
              className="absolute top-4 right-4 text-red-500 font-bold"
              onClick={() => setShowFilter(false)}
            >
              Close
            </button> */}
            <FilterSideBar
  products={products}
  setFilteredProducts={setFilteredProducts}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedSeries={selectedSeries}
  setSelectedSeries={setSelectedSeries}
  selectedCategories={selectedCategories}
  setSelectedCategories={setSelectedCategories}
  selectedManufacturers={selectedManufacturers}
  setSelectedManufacturers={setSelectedManufacturers}
  stockFilter={stockFilter}
  setStockFilter={setStockFilter}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  sortPrice={sortPrice}
  setSortPrice={setSortPrice}
  setShowFilter={setShowFilter}

/>
{/* <div className="py-2">
  <button className="w-full font-semibold bg-[#F4F4F6] py-3 rounded-full " onClick={() => setShowFilter(false)}>Cancel</button>
  
</div> */}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product List */}
        <div className="w-full sm:w-[80%]">
          {filteredProducts.length === 0 ? (
          <NoResult />
          ) : (
            <ProductCard products={filteredProducts} />
          )}
        </div>

        {/* Sidebar Desktop */}
        <div className="hidden sm:block w-[20%] sticky top-4 self-start">
        <FilterSideBar
  products={products}
  setFilteredProducts={setFilteredProducts}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedSeries={selectedSeries}
  setSelectedSeries={setSelectedSeries}
  selectedCategories={selectedCategories}
  setSelectedCategories={setSelectedCategories}
  selectedManufacturers={selectedManufacturers}
  setSelectedManufacturers={setSelectedManufacturers}
  stockFilter={stockFilter}
  setStockFilter={setStockFilter}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  sortPrice={sortPrice}
  setSortPrice={setSortPrice}
  setShowFilter={setShowFilter}
/>

        </div>
      </div>
    </div>
  );
};

export default ListProduct;

import React, { useEffect, useState } from "react";
import ProductCard from "../../components/user/listProduct/ProductCard";
import Loader from "../../components/Loader";
import FilterSideBar from "../../components/user/listProduct/FilterSideBar";
import { getProducts } from "../../api/products";
import { Input, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import NoResult from "../../components/user/NoResult";
import { useSearchParams } from "react-router-dom";
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";
  const [searchTerm, setSearchTerm] = useState(keyword);
  const [sortAlpha, setSortAlpha] = useState("");
  const [priceRange, setPriceRange] = useState([2000000, 10000000]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : []
  );
  const [visibleCount, setVisibleCount]=useState(10)
  const [sortSold, setSortSold]=useState("")
  const [giftFilter, setGiftFilter] = useState(false);
  const [selectedManufacturers, setSelectedManufacturers] = useState([]);
  const [stockFilter, setStockFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Fetch products 1 lần
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

  useEffect(() => {
    let filtered = [...products];
  
    // Filter
    if (selectedCategories.length) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category_name)
      );
    }
  
    if (selectedSeries.length) {
      filtered = filtered.filter((p) =>
        selectedSeries.includes(p.series)
      );
    }
    if (giftFilter) {
      filtered = filtered.filter((p) => p.gift_items && p.gift_items.length > 0);
    }
    
    if (selectedManufacturers.length) {
      filtered = filtered.filter((p) =>
        selectedManufacturers.includes(p.manufacturer)
      );
    }
  
    if (stockFilter) {
      filtered = filtered.filter((p) => {
        if (stockFilter === "inStock") return p.stock >= 50;
        if (stockFilter === "few") return p.stock > 0 && p.stock < 50;
        if (stockFilter === "soldOut") return p.stock === 0;
        return true;
      });
    }
  
    if (statusFilter) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
  
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (priceRange) {
      filtered = filtered.filter(
        (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
      );
    }
  
    // Multi-level sort
    filtered.sort((a, b) => {
      // 1. Sort sold
      if (sortSold === "asc" && a.sold !== b.sold) return a.sold - b.sold;
      if (sortSold === "desc" && a.sold !== b.sold) return b.sold - a.sold;
  
      // 2. Sort price
      if (sortPrice === "asc" && a.price !== b.price) return a.price - b.price;
      if (sortPrice === "desc" && a.price !== b.price) return b.price - a.price;
    

      // 4. Sort alphabet
      if (sortAlpha === "asc") return a.name.localeCompare(b.name);
      if (sortAlpha === "desc") return b.name.localeCompare(a.name);
  
      return 0;
    });
  
    setFilteredProducts(filtered);
  }, [
    products,
    selectedSeries,
    selectedCategories,
    selectedManufacturers,
    stockFilter,
    statusFilter,
    giftFilter,
    sortPrice,
    sortAlpha,
    searchTerm,
    priceRange,
    sortSold,
  ]);
  
  const handleResetAll = () => {
    setSelectedSeries([]);
    setSelectedCategories(categoryFromUrl ? [categoryFromUrl] : []);
    setSelectedManufacturers([]);
    setStockFilter("");
    setStatusFilter("");
    setGiftFilter(false);
    setSortPrice("");
    setSortAlpha("");
    setSortSold("");
    setPriceRange([2000000, 10000000]);
    setSearchTerm("");
  };
  
const activeFiltersCount =
(selectedSeries.length ? 1 : 0) +
(selectedCategories.length ? 1 : 0) +
(selectedManufacturers.length ? 1 : 0) +
(stockFilter ? 1 : 0) +
(statusFilter ? 1 : 0) +
(giftFilter ? 1 : 0) +
(sortPrice ? 1 : 0) +
(sortAlpha ? 1 : 0) +
(sortSold ? 1 : 0) +
(searchTerm ? 1 : 0) +
(priceRange[0] !== 2000000 || priceRange[1] !== 10000000 ? 1 : 0);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setVisibleCount(10); 
    } else {
      setVisibleCount(60); 
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
useEffect(() => {
  window.scrollTo(0, 0);
}, [categoryFromUrl, keyword]);
const handleLoadMore = () => {
  setVisibleCount((prev) => prev + 10);
};

  if (loading) return <Loader />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
<div className="flex items-center justify-between">
        <h1 className=" text-xl  font-semibold py-4 sm:py-6">Our Collection ({filteredProducts.length})</h1>

{
  activeFiltersCount >1 && (
    <button onClick={()=>handleResetAll()} className="px-4 text-sm block sm:hidden border border-red-600 text-red-600 cursor-pointer rounded-full py-1">Clear All</button>

  )
}
</div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden flex items-center gap-2 mb-2">
  <Input
    placeholder="Search..."
    allowClear
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    size="large"
  />
  <button  className="border w-10 h-10 rounded-lg border-gray-300"   onClick={() => setShowFilter(true)}>
  <FilterOutlined />
  </button>

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
  sortAlpha={sortAlpha}
  setSortAlpha={setSortAlpha}
  priceRange={priceRange}
  sortSold={sortSold}
  setSortSold={setSortSold}
  setPriceRange={setPriceRange}
  giftFilter={giftFilter}
  setGiftFilter={setGiftFilter}


/>
{/* <div className="py-2">
  <button className="w-full font-semibold bg-[#F4F4F6] py-3 rounded-full " onClick={() => setShowFilter(false)}>Cancel</button>
  
</div> */}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product List */}
        <div className="w-full lg:w-[80%]">
          {filteredProducts.length === 0 ? (
          <NoResult />
          ) : (
           <>
            <ProductCard products={filteredProducts.slice(0, visibleCount)} />
                       {visibleCount < filteredProducts.length && (
                         <div className="flex w-full  justify-center mt-4">
                           <button
                             onClick={handleLoadMore}
                             className="sm:w-48 w-full py-3 rounded-full bg-[#FF6900] text-white font-semibold  cursor-pointer transition"
                           >
                             Load More
                           </button>
                         </div>
                       )}</>
          )}
        </div>

        {/* Sidebar Desktop */}
        <div className="hidden lg:block w-[20%] hide-scrollbar sticky top-4 self-start max-h-[90vh] overflow-y-auto">       
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
  sortAlpha={sortAlpha}
  setSortAlpha={setSortAlpha}
  priceRange={priceRange}
  sortSold={sortSold}
  setSortSold={setSortSold}
  setPriceRange={setPriceRange}
  giftFilter={giftFilter}
  setGiftFilter={setGiftFilter}
  activeFiltersCount={activeFiltersCount}
  handleResetAll={handleResetAll}
 
/>

        </div>
      </div>
    </div>
  );
};

export default ListProduct;

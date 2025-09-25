import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/products";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PopupDetailTab from "../../../components/admin/product/PopupDetailTab";
import FilterTable from "../../../components/admin/product/FilterTable";
import Table from "../../../components/admin/product/Table";
import ProductAdd from "./ProductAdd";
function ProductList() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false); // state mở popup

  const categories = [...new Set(products.map(p => p.category_name).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    if (filters.name && !p.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.category && p.category_name !== filters.category) return false;
    if (filters.priceMin !== undefined && p.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && p.price > filters.priceMax) return false;
    if (filters.stockMin !== undefined && p.stock < filters.stockMin) return false;
    if (filters.stockMax !== undefined && p.stock > filters.stockMax) return false;
    return true;
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetchProducts:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error("Error deleteProduct:", err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setOpenAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusOutlined /> Add Product
        </button>
      </div>

      <FilterTable
        categories={categories}
        products={products}
        onFilterChange={(vals) => setFilters(vals)}
      />

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <Table
          filteredProducts={filteredProducts}
          handleDelete={handleDelete}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {selectedProduct && (
        <PopupDetailTab
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Popup ProductAdd */}
      <ProductAdd
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          fetchProducts(); // load lại danh sách sau khi thêm
        }}
      />
    </div>
  );
}

export default ProductList;

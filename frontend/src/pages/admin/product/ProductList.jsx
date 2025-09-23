import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/products";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PopupDetailTab from "../../../components/admin/product/PopupDetailTab";
import FilterTable from "../../../components/admin/product/FilterTable";

function ProductList() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

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
        <Link to="/admin/products/add">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <PlusOutlined /> Add Product
          </button>
        </Link>
      </div>

      <FilterTable
        categories={categories}
        products={products}
        onFilterChange={(vals) => setFilters(vals)}
      />

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2 w-12">#</th>
                <th className="border px-4 py-2 w-20">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Release</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, idx) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-center">{idx + 1}</td>
                  <td className="border px-4 py-2">
                    <img src={product.base_image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="border px-4 py-2 font-semibold">{product.name}</td>
                  <td className="border px-4 py-2">
                    {new Intl.DateTimeFormat("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(product.created_at))}
                  </td>
                  <td className="border px-4 py-2">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}
                  </td>
                  <td className="border px-4 py-2">{product.category_name || "None"}</td>
                  <td className="border px-4 py-2 text-center space-x-1">
                    <button
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <EyeOutlined />
                    </button>
                    <Link to={`/admin/products/edit/${product.id}`}>
                      <button className="p-1 bg-yellow-400 text-black rounded hover:bg-yellow-500">
                        <EditOutlined />
                      </button>
                    </Link>
                    <button
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <PopupDetailTab
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default ProductList;

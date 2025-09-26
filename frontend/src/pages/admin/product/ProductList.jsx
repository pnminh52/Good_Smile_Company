import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/products";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import PopupDetailTab from "../../../components/admin/product/PopupDetailTab";
import Table from "../../../components/admin/product/Table";
import ProductAdd from "./ProductAdd";
import { Button } from "antd";
import Title from './../../../components/admin/Title';
import AdminLoader from "../../../components/AdminLoader";
import ProductEdit from "./ProductEdit";
function ProductList() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false); 
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
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
  const handleEdit = (productId) => {
    setEditProductId(productId);
    setOpenEditModal(true);
  };
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between items-center">
       <Title />
        <Button
         type="primary"
           icon={<PlusOutlined />}
          onClick={() => setOpenAddModal(true)}
        >
           Add Product
        </Button>
      </div>

      {/* <FilterTable
        categories={categories}
        products={products}
        onFilterChange={(vals) => setFilters(vals)}
      /> */}

      {loading ? (
        < ><AdminLoader /></>
      ) : (
        <Table
          filteredProducts={filteredProducts}
          handleDelete={handleDelete}
          setSelectedProduct={setSelectedProduct}
          handleEdit={handleEdit} 
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
          fetchProducts(); 
        }}
      />
       {editProductId && (
        <ProductEdit
          open={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setEditProductId(null);
            fetchProducts();
          }}
          productId={editProductId} 
          
        />
      )}
    </div>
  );
}

export default ProductList;

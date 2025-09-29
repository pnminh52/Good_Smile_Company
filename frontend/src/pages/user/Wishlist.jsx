import React, { useState, useEffect } from "react";
import ProductCard from "../../components/user/listProduct/ProductCard";
import { getWishlistApi } from "../../api/wishlist";
import useToast from "../../hook/useToast";
import Loader from "../../components/Loader";
import NoResult from './../../components/user/NoResult';

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      const userId = localStorage.getItem("userId");
      if (!userId) return setLoading(false);

      try {
        const products = await getWishlistApi(userId, token);
        setWishlistProducts(products);
      } catch (err) {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false); // tắt loading dù thành công hay lỗi
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Loader />
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div >
       <NoResult />
      </div>
    );
  }

  return (
    <div className="lg:px-0 px-4 max-w-screen-xl mx-auto">
      <h1 className="     text-xl  font-semibold py-4 sm:py-6">Wishlist ({wishlistProducts.length})</h1>
      <ProductCard products={wishlistProducts} columns={5} />
    </div>
  );
};

export default Wishlist;

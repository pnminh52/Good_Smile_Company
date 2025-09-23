import React, { useState, useEffect } from "react";
import { addToCart } from "../../../api/cart";
import { addToWishlistApi, removeFromWishlistApi, getWishlistApi } from "../../../api/wishlist"; // API wishlist
import DetailSection from "./DetailSection";
import useToast from "../../../hook/useToast";
import axios from "axios";
const RightSide = ({ product }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Kiểm tra xem sản phẩm có trong wishlist không
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const userId = localStorage.getItem("userId"); // lưu userId ở localStorage
        const wishlist = await getWishlistApi(userId, token);
        const exists = wishlist.some((item) => item.id === product.id);
        setInWishlist(exists);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWishlist();
  }, [product.id]);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add to cart!");
        setLoading(false);
        return;
      }
  
      // Lấy giỏ hàng hiện tại
      const cartRes = await axios.get("http://localhost:3000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const cartItems = cartRes.data || [];
      const existingItem = cartItems.find(item => item.product_id === product.id);
  
      if (existingItem && existingItem.quantity >= 3) {
        toast.error("Maximum 3 items allowed per product!");
        setLoading(false);
        return;
      }
  
      await addToCart({ product_id: product.id, quantity: 1 }, token);
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart!");
    } finally {
      setLoading(false);
    }
  };
  

  const handleWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in!");
      return;
    }
    const userId = localStorage.getItem("userId");

    try {
      if (inWishlist) {
        await removeFromWishlistApi(userId, product.id, token);
        setInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await addToWishlistApi(userId, product.id, token);
        setInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h1 className="text- font-semibold">{product.title}</h1>
        <h1 className="text-xl font-semibold py-4">{product.name}</h1>

        <div>
                               <div className="flex items-center gap-2">
                               {product.stock > 0 && product.stock < 50 && (
                                    <p className="bg-red-200 px-2 inline-block text-sm text-red-700 rounded-full">
                                        Few left
                                    </p>
                                )}

                                {product.stock === 0 && (
                                    <p className="bg-gray-200 px-2 inline-block text-sm text-gray-700 rounded-full">
                                        Sold out
                                    </p>
                                )}

                                {product.status === "preorder" && (
                                    <p className="bg-green-200 px-2 inline-block text-sm text-green-700 rounded-full">
                                        Preorders
                                    </p>
                                )}
                                {product.gift_items && product.gift_items.length > 0 && (
  <p className="bg-yellow-200 px-2 inline-block text-sm text-yellow-700 rounded-full">
    W/Bonus
  </p>
)}
                               </div>

                               
                            </div>
       <div className="py-4">
       <p className="text-black text-lg">
          {Number(product.price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })} / {product.sold} sold
        </p>
        <div className="text-gray-500 text-sm ">
        <p>Limit 3 per person /  Shipping costs not included</p>
     
        </div>
       
       </div>

        <div className="flex flex-col gap-2 py-2">
         {
          product.stock >0 && (
            <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 && product.status !== "preorder"}
            className="rounded-full px-6 py-3 bg-[#FF6624] text-white font-semibold  
            cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed"
          >
           {product.status === "preorder"
  ? "Preorder now"
  : "Add to Cart"
}

          </button>
          )
         }

          <button
            onClick={handleWishlist}
            className={`border rounded-full px-6 py-3 justify-center cursor-pointer font-semibold flex items-center gap-2 ${
              inWishlist
                ? "border-gray-400 text-gray-400"
                : "border-[#FF6624] text-[#FF6624]"
            }`}
          >
            {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
        <div className=' space-y-2 py-4'>
                  
                    <p>{product.description}</p>
                </div>
      </div>
      <div className="block sm:hidden px-4">
        <DetailSection product={product} />
      </div>
    </div>
  );
};

export default RightSide;

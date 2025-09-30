import React, { useState, useEffect } from "react";
import { addToCart } from "../../../api/cart";
import { addToWishlistApi, removeFromWishlistApi, getWishlistApi } from "../../../api/wishlist"; // API wishlist
import DetailSection from "./DetailSection";
import useToast from "../../../hook/useToast";
import api from "../../../api/axios";
import { Button } from "antd";
import dayjs from "dayjs";
const RightSide = ({ product }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const userId = localStorage.getItem("userId"); 
        const wishlist = await getWishlistApi(userId, token);
        const exists = wishlist.some((item) => item.id === product.id);
        setInWishlist(exists);
      } catch (err) {
        // console.error(err);
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
  
      const cartRes = await api.get("/cart", {
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
      // console.error(err);
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
  
    setWishlistLoading(true);
    try {
      if (inWishlist) {
        await removeFromWishlistApi(userId, product.id, token);
        setInWishlist(false);
        toast.success("Removed from wishlist!");
      } else {
        await addToWishlistApi(userId, product.id, token);
        setInWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setWishlistLoading(false);
    }
  };
  

  return (
    <div>
      <div className="px-4 lg:px-0">
        <h1 className="text- font-semibold">{product.title}</h1>
        <h1 className="text-xl font-semibold py-4">{product.name}</h1>

   
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
                                )}{product.status === "available" && (
                                  <p className="bg-green-200 px-2 inline-block text-sm text-green-700 rounded-full">
                                      Available
                                  </p>
                              )}
                                
                                {product.gift_items && product.gift_items.length > 0 && (
  <p className="bg-yellow-200 px-2 inline-block text-sm text-yellow-700 rounded-full">
    W/Bonus
  </p>
)}
                               </div>

                               
                       
       <div className="py-4">
       <p className="text-black text-lg">
  {Number(product.price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  })} / {Number(product.sold).toLocaleString("vi-VN")} sold
</p>

    
        <p className="text-gray-500 text-sm ">Limit 3 per person /  Shipping costs not included</p>
     
       
       
       </div>

        <div className="flex flex-col gap-2 py-2">
        {
  product.stock > 0 && (
    <Button
      type="primary"
      shape="round"
      size="large"
      style={{ background: "#FF6900", borderColor: "#FF6900", height: "48px", padding: "0 24px", border:"1px solid #FF6900" }}
      onClick={handleAddToCart}
      loading={loading} 
      disabled={product.stock <= 0 && product.status !== "preorder"}
    >
      {product.status === "preorder" ? "Preorder now" : "Add to Cart"}
    </Button>
  )}


<Button
  shape="round"
  loading={wishlistLoading} 
  size="large"
  onClick={handleWishlist}
  className={`flex items-center gap-2 font-semibold ${
    inWishlist
      ? "border-gray-400 text-gray-400"
      : "border-[#FF6900] text-[#FF6900]"
  }`}
  style={{
    borderColor: inWishlist ? "#d9d9d9" : "#FF6900",
    color: inWishlist ? "#9ca3af" : "#FF6900",
     height: "48px", padding: "0 24px"
  }}
>
  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
</Button>
        </div>
        <div className=' space-y-2 py-4'>
                  
                    <p>{product.description}</p>
                    
                    <p className="text-gray-500 text-md">We prioritize the cash on delivery (COD) payment method. For your convenience, you can pay directly to the delivery staff upon receiving your order. Other payment methods will also be available soon.</p>
                    <p>{dayjs(product.created_at).format("DD/MM/YYYY HH:mm")}</p>
                </div>
      </div>
      <div className="block lg:hidden sm:px-0 px-4 ">
        <DetailSection product={product} />
      </div>
    </div>
  );
};

export default RightSide;

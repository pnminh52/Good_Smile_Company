import React, { useEffect, useState, useRef } from "react";
import {
  getCart,
  deleteCartItem,
  updateCartItem,
  clearCart,
} from "../../api/cart";
import useAuth from "../../hook/useAuth";
import {  useNavigate } from "react-router-dom";
import useToast from "../../hook/useToast";
import PriceInfo from "./../../components/user/cart/PriceInfo";
import LeftSide from "./../../components/user/cart/LeftSide";
import Loader from "./../../components/Loader";
import NoResult from './../../components/user/NoResult';
import { getCartRecommendedProducts } from "../../api/products";
import AlsoLike from './../../components/user/cart/AlsoLike';

const Cart = () => {
  const { user } = useAuth();
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const toast = useToast();
  const fetchRecommended = async (cartItems) => {
    if (cartItems.length === 0) return;
    try {
      const res = await getCartRecommendedProducts(cartItems.map(item => item.product_id));
      setRecommendedProducts(res.data);
    } catch (error) {
      // console.error("Failed to fetch recommended products:", error);
    }
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCart(token);
      const items = Array.isArray(res.data)
        ? res.data.map((item) => ({
            ...item,
            product_id: item.product_id || item.id,
          }))
        : [];
      setCartItems(items);
    } catch (error) {
      // console.error("Failed to fetch cart:", error);
      toast.error("Failed to fetch cart!");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user && token) {
      fetchCart();
    }
    // console.log("Cart component user:", user);
    // console.log("Cart component token:", token);
  }, [user, token]);
  useEffect(() => {
    if (cartItems.length > 0) {
      fetchRecommended(cartItems);
    } else {
      setRecommendedProducts([]);
    }
    
    
  }, [cartItems]);
  
  const handleDelete = async (cartId) => {
    try {
      await deleteCartItem(cartId, token);
      setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
      toast.success("Item removed!");
    } catch (error) {
      // console.error("Failed to delete item:", error);
      toast.error("Failed to delete item!");
    }
  };

  const handleDeleteAll = async () => {
    try {
      await clearCart(token);
      setCartItems([]);
      toast.success("All items removed!");
    } catch (error) {
      // console.error("Failed to clear cart:", error);
      toast.error("Failed to clear cart!");
    }
  };

  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return;
    if (quantity > 3) {
      toast.error("Maximum 3 units per item!");
      return;
    }

    try {
      await updateCartItem(cartId, { quantity }, token);
      setCartItems(
        cartItems.map((item) =>
          item.cart_id === cartId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      // console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity!");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems } });
  };

  if (loading) {
    return (
      <p >
        <Loader />
      </p>
    );
  }
  if (cartItems.length === 0) return <><NoResult /></>;

  return (
    <div className="max-w-screen-xl w-full mx-auto ">
     <div className="flex justify-between items-center">
       <h1 className="  text-xl  font-semibold sm:py-6 py-4 lg:px-30 px-4"> Cart ({cartItems.length})</h1>
      {/* <button className="px-4 text-sm block sm:hidden border border-red-600 text-red-600 cursor-pointer rounded-full py-1" onClick={()=>handleDeleteAll()}>Clear All</button> */}
     </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:px-30 px-4 ">
        <div className="w-full lg:w-[70%]">
          <LeftSide
            cartItems={cartItems}
            handleUpdateQuantity={handleUpdateQuantity}
            handleDelete={handleDelete}
          />
        </div>
        <div className="w-full lg:w-[30%] sticky top-4 self-start">
  {user && cartItems.length > 0 && (
    <PriceInfo
      handleCheckout={handleCheckout}
      cartItems={cartItems}
      handleDeleteAll={handleDeleteAll}
    />
  )}
</div>

      </div>

<div className="lg:px-30 px-0">
<AlsoLike  products={recommendedProducts}/>
</div>
    
  

       
 
    </div>
         
  );
};

export default Cart;

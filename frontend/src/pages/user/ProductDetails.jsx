import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import Loader from './../../components/Loader';
import LeftSide from './../../components/user/productDetail/LeftSide';
import RightSide from './../../components/user/productDetail/RightSide';
import History from './../../components/user/productDetail/History';
import SameCategory from './../../components/user/productDetail/SameCategory';
import RecommendProduction from './../../components/user/productDetail/RecommendProduction';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetchProduct:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10"><Loader /></p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found</p>;
  }

  return (
  <div>
      <div className="sm:max-w-screen-2xl w-full mx-auto px-0 sm:px-25 py-0 sm:py-10 flex flex-col sm:flex-row gap-8">
    {/* Left */}
    <div className="w-full sm:w-[70%]">
      <LeftSide product={product} />
    </div>
  
    {/* Right */}
    <div className="w-full sm:w-[30%]">
      <div className="sticky top-6">
        <RightSide product={product} />
      </div>
    </div>
   

  </div>
  <div className="space-y-0 sm:px-50 px-0 py-2">
  <History product={product}/>
   <SameCategory product={product} />
   <RecommendProduction product={product} />
  </div>
  </div>
  
  );
  
};

export default ProductDetails;

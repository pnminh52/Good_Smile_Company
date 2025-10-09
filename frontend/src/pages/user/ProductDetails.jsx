import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import Loader from './../../components/Loader';
import LeftSide from './../../components/user/productDetail/LeftSide';
import RightSide from './../../components/user/productDetail/RightSide';
import History from './../../components/user/productDetail/History';
import SameCategory from './../../components/user/productDetail/SameCategory';
import RecommendProduction from './../../components/user/productDetail/RecommendProduction';
import NoResult from './../../components/user/NoResult';
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
        // console.error("❌ Error fetchProduct:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return < ><Loader /></>;
  }

  if (!product) {
    return <><NoResult /></>;
  }

  return (
  <div>
<div className="w-full mx-auto px-0   lg:max-w-screen-2xl lg:px-25 py-0 lg:py-10 flex flex-col lg:flex-row lg:gap-8 gap-4">  {/* Left */}
  <div className="w-full lg:w-[70%]">
    <LeftSide product={product} />
  </div>

  {/* Right */}
  <div className="w-full lg:w-[30%]">
    <div className="sticky top-32">
      <RightSide product={product} />
    </div>
  </div>


   

  </div>
  <div className="space-y-0 lg:px-50 md:px-4 py-2">
  <History product={product}/>
   <SameCategory product={product} />
   <RecommendProduction product={product} />
  </div>
  </div>
  
  );
  
};

export default ProductDetails;

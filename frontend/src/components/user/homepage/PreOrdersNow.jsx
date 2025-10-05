import React, { useEffect, useState } from "react";
import ProductCard from "./../listProduct/ProductCard";
import { getProducts } from "../../../api/products";
import Loader from "../../Loader";
import { Link } from "react-router-dom";

const PreOrdersNow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPreOrders = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        // lọc các sản phẩm có status là 'preorder'
        const preOrders = res.data.filter((p) => p.status === "preorder");
        setProducts(preOrders);
      } catch (err) {
        console.error("❌ Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreOrders();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center  py-4">
        <img
          className="sm:w-15 sm:h-15 w-10 h-10"
          src="https://www.goodsmile.com/img/icon/pre-order.svg"
          alt="Preorder"
        />
        <p className="sm:text-lg text-sm font-semibold">Preorders Open Now</p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="lg:px-0 md:px-4 px-4">
          <ProductCard products={products.slice(0, 10)} columns={5} />
          <div className="py-2 block sm:hidden">
            <Link to={"/product"}>
              <button className=" bg-[#F06E00] text-white font-semibold w-full rounded-full py-2.5">
                Shopping Now!
              </button>
            </Link>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default PreOrdersNow;

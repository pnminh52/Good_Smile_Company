// Top10Revenue.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../api/products';
import Loader from '../../Loader';
import SliderRevenue from './SliderRevenue';

const Top10Revenue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopRevenue = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        const data = res.data;

        // Tính doanh thu, sắp xếp giảm dần, lấy top 10
        const topRevenue = data
          .map(p => ({ ...p, revenue: (p.price || 0) * (p.sold || 0) }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10);

        setProducts(topRevenue);
      } catch (err) {
        console.error("❌ Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRevenue();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader size={14} />
      </div>
    );
  }

  if (!products.length) return null;

  return <SliderRevenue products={products} />;
};

export default Top10Revenue;

import { useState, useEffect } from "react";
import { getShippingFee as apiGetShippingFee } from "../api/shipping";
import useAuth from "./useAuth";

const useShippingFee = () => {
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    if (user) {
      const addr = user.address || (user.district?.length > 0 ? user.district[0] : "");
      setAddress(addr);
    } else {
      setAddress(""); // không áp cứng
    }
  }, [user]);
  

  // Fetch fee từ API
  useEffect(() => {
    if (!address) return;

    const fetchFee = async () => {
      try {
        const res = await apiGetShippingFee(address);
        setShippingFee(Number(res.data.fee) || 0);
      } catch (err) {
        // console.error("Failed to fetch shipping fee:", err);
        setShippingFee(0);
      }
    };

    fetchFee();
  }, [address]);

  useEffect(() => {
    // console.log("User:", user);
    // console.log("Address:", address);
    // console.log("ShippingFee:", shippingFee);
  }, [user, address, shippingFee]);

  return { address, shippingFee };
};

export default useShippingFee;

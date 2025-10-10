import React, { useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useToast from "../../hook/useToast";
const provinces = [
  "An Giang","Bà Rịa - Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh",
  "Bến Tre","Bình Định","Bình Dương","Bình Phước","Bình Thuận","Cà Mau",
  "Cần Thơ","Cao Bằng","Đà Nẵng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai",
  "Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Nội","Hà Tĩnh","Hải Dương",
  "Hải Phòng","Hậu Giang","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang",
  "Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định",
  "Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Phú Yên","Quảng Bình",
  "Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La",
  "Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên Huế","Tiền Giang",
  "TP Hồ Chí Minh","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái"
];

const Register = () => {
  const toast=useToast()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    district: "",
    phone: "",
    status:"active"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "email" && name !== "district") {
      const regex = /^[a-zA-ZÀ-ỹ0-9\s]*$/u;
      if (!regex.test(value)) {
        toast.error("Special characters not allowed!");
        return;
      }
    }
    
    
  
    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        toast.error("Phone number only enter numbers!");
        return;
      }
      if (value.length > 11) {
        toast.error("Incorrect phone number format!");
        return;
      }
    }
  
    setForm({ ...form, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate phone trước khi submit
    if (!/^0\d{9,10}$/.test(form.phone)) {
      return toast.error("Please enter your correct phone number!");
    }
  
    try {
      await register(form);
      toast.success("Register successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Register failed");
    }
  };
  



  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-30 ">
      <div className="mx-auto py-10">
        <h2 className="text-2xl w-full flex justify-center font-semibold">Member Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          
          {/* Name */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">User Name</p>
            <input
              type="text"
              name="name"
              placeholder="User name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">Phone Number</p>
            <input
              type="number"
              name="phone"
              placeholder="Phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">Email Address</p>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              Password (Must include at least one uppercase letter, one lowercase letter, one number and one special character)
            </p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {/* Address (province) */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">Province / City</p>
            <select
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            >
              <option value="">Select your province</option>
              {provinces.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="space-y-1">
            <p className="text-sm font-semibold">District</p>
            <input
              type="text"
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm my-2 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF6900] text-white py-3 rounded-full  cursor-pointer"
          >
            Register
          </button>
        </form>

         
      </div>
      <div className="space-y-4">
                <p className="text-xl font-semibold flex justify-center w-full">Already have an account?</p>
               <Link to={"/login"}>
               <button    type="submit"       className="w-full bg-[#FF6900] text-white py-3 rounded-full  cursor-pointer"
                >Login now</button></Link>
              </div>
    </div>
  );
};

export default Register;

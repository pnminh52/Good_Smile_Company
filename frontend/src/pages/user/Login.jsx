import React, { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hook/useAuth"; 
import useToast from "../../hook/useToast";

const Login = () => {
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: contextLogin } = useAuth(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { token, user } = res.data;
  
      // console.log("Full logged-in user:", user); // log full dữ liệu user
  
      contextLogin(user, token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user", JSON.stringify(user));
  
      toast.success("Login successful!");
      if (user.role.toLowerCase() === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      const errMsg = err.response?.data?.error || "Login failed";
      setError(errMsg);
      toast.error(errMsg);
    }
  };
  
  
  

  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-30 ">
      <div className=" mx-auto py-10  ">
      <h2 className="text-2xl  w-full flex justify-center font-semibold ">Login</h2>
      <form onSubmit={handleSubmit} className=" ">
      <div className="space-y-4 py-4">
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
       <div className="space-y-1">
         <p className="text-sm font-semibold">Password (Must include at least one uppercase letter, one lowercase letter, one number and one special character)</p>
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
      </div>
        <button
          type="submit"
          className="w-full bg-[#FF6900] text-white py-3 rounded-full font-semibold cursor-pointer"
        >
          Login
        </button>
      </form>
      <div className="py-4 flex item-center justify-center">
        <Link to="/forgot-password" className="text-black  underline  ">
        Forgot your email address or password?
        </Link>
      </div>
     
    </div>
    <div className="space-y-4">
        <p className="text-xl font-semibold flex justify-center w-full">Don’t have an account?</p>
       <Link to={"/register"}>
       <button    type="submit"       className="w-full bg-[#FF6900] text-white py-3 rounded-full font-semibold cursor-pointer"
        >New member registration</button></Link>
      </div>
    </div>
    
  );
};

export default Login;

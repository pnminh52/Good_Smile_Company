import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const Topbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);

  const routes = [
    { label: "Dashboard", path: "/admin" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Products", path: "/admin/products" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Users", path: "/admin/users" },
  ];

  const handleSearch = (value) => {
    setQuery(value);
    const filtered = routes.filter((r) =>
      r.label.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(filtered);
  };

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setOptions([]);
  };

  return (
    <div className="w-full h-16 bg-white flex items-center px-2 border-b border-gray-200 relative">
      {/* Search input */}
      <div className="relative w-100">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        {/* Dropdown gợi ý */}
        {options.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <li
                key={opt.path}
                onClick={() => handleSelect(opt.path)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Topbar;

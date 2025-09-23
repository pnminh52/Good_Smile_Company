// components/admin/Topbar.jsx
import React, { useState } from "react";
import { Layout, Input, AutoComplete } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Topbar = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);

  // Các route admin để search
  const routes = [
    { label: "Dashboard", path: "/admin" },
    { label: "Categories", path: "/admin/categories" },
    { label: "Products", path: "/admin/products" },
    { label: "Orders", path: "/admin/orders" },
    { label: "Users", path: "/admin/users" },
  ];

  const handleSearch = (value) => {
    const filtered = routes
      .filter((r) => r.label.toLowerCase().includes(value.toLowerCase()))
      .map((r) => ({ value: r.label, path: r.path }));
    setOptions(filtered);
  };

  const handleSelect = (value, option) => {
    navigate(option.path);
    setOptions([]);
  };

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      <AutoComplete
        style={{ width: 300 }}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        placeholder="Search..."
      >
        <Input.Search
          size="middle"
          onSearch={(value) => {
            const route = routes.find(
              (r) => r.label.toLowerCase() === value.toLowerCase()
            );
            if (route) navigate(route.path);
          }}
        />
      </AutoComplete>
    </Header>
  );
};

export default Topbar;

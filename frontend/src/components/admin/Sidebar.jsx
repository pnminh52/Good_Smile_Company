// components/admin/Sidebar.jsx
import { Layout, Menu, Image } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FolderOutlined,
  ShoppingCartOutlined,
  BoxPlotOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/categories", icon: <FolderOutlined />, label: "Categories" },
    { key: "/admin/products", icon: <ShoppingCartOutlined />, label: "Products" },
    { key: "/admin/orders", icon: <BoxPlotOutlined />, label: "Orders" },
    { key: "/admin/users", icon: <UserOutlined />, label: "Users" },
  ];

  return (
    <Sider
      width={200}
      style={{
        background: "#fff",
        minHeight: "100vh",
        borderRight: "1px solid #e8e8e8",
      }}
    >
      <div className="logo text-xl font-bold w-full flex justify-center mx-auto py-4">
        <Image
          src="https://www.goodsmile.com/img/common/logo.svg"
          preview={false}
          width={120}
          height={40}
        />
      </div>

      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: <Link to={item.key}>{item.label}</Link>,
          style:
            location.pathname === item.key
              ? { backgroundColor: "#FFBC7F", color: "#fff",  } 
              : {},
        }))}
      />
    </Sider>
  );
};

export default Sidebar;

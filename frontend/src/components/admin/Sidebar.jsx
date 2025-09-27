import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FolderOutlined,
  ShoppingCartOutlined,
  BoxPlotOutlined,
  UserOutlined,
  ReadOutlined,     // News
  PictureOutlined,  // Banners
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
    { key: "/admin/news", icon: <ReadOutlined />, label: "News" },
    { key: "/admin/banners", icon: <PictureOutlined />, label: "Banners" },
  ];

  return (
    <Sider
      width={250}
      style={{
        background: "#fff",
        borderRight: "1px solid #e8e8e8",
      }}
    >
      <div className="logo text-xl font-bold border-b h-16 border-[#e8e8e8] w-full flex justify-center mx-auto py-4">
        <img
          src="https://www.goodsmile.com/img/common/logo.svg"
          className="w-30 h-auto"
          alt=""
        />
      </div>

      <Menu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        style={{ height: "100%", borderRight: 0, paddingLeft: "5px", paddingRight: "5px" }}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: <Link to={item.key}>{item.label}</Link>,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;

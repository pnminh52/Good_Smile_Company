import { Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  FolderOutlined,
  ShoppingCartOutlined,
  BoxPlotOutlined,
  UserOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/categories", icon: <FolderOutlined />, label: "Categories" },
    { key: "/admin/products", icon: <ShoppingCartOutlined />, label: "Products" },
    { key: "/admin/orders", icon: <BoxPlotOutlined />, label: "Orders" },
    { key: "/admin/users", icon: <UserOutlined />, label: "Users" },
    { key: "/admin/news", icon: <ReadOutlined />, label: "News" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <img
          src="https://www.goodsmile.com/img/common/logo.svg"
          className="w-32 h-auto"
          alt="Logo"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.key;
            return (
              <li key={item.key}>
                <Link
                  to={item.key}
                  className={`flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition ${
                    isActive ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { useLocation } from "react-router-dom";

const Title = () => {
  const location = useLocation();

  // Map route -> title + subtitle (English)
  const routeMap = {
    "/admin": { title: "Dashboard", subtitle: "Overview of system statistics and activities" },
    "/admin/categories": { title: "Categories", subtitle: "Manage product categories and organization" },
    "/admin/products": { title: "Products", subtitle: "Manage product listings and details" },
    "/admin/orders": { title: "Orders", subtitle: "Track and process customer orders" },
    "/admin/users": { title: "Users", subtitle: "Manage registered users and their roles" },
  };

  const { title, subtitle } =
    routeMap[location.pathname] || {
      title: "Admin",
      subtitle: "Administration panel and settings",
    };

  return (
    <div className="space-y-0">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

export default Title;

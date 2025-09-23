// layouts/AdminLayout.jsx
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

const { Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Topbar />
        <Content style={{ padding: "24px", minHeight: "100vh", background: "#fff" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;

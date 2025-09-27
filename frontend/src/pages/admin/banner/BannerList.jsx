import React, { useEffect, useState } from "react";
import { Table, Button, Space, Image, message } from "antd";
import { getBanners, deleteBanner } from "../../../api/banner";
import { useNavigate } from "react-router-dom";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data } = await getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
      message.error("Load banners failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa banner này?")) {
      try {
        await deleteBanner(id);
        message.success("Banner deleted!");
        fetchBanners();
      } catch (err) {
        console.error(err);
        message.error("Delete failed!");
      }
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Mobile Image",
      dataIndex: "image_mobile",
      render: (url) => <Image width={100} src={url} />,
    },
    {
      title: "Desktop Image",
      dataIndex: "image_desktop",
      render: (url) => <Image width={100} src={url} />,
    },
    { title: "Link", dataIndex: "link" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/admin/banners/edit/${record.id}`)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button
        type="primary"
        className="mb-4"
        onClick={() => navigate("/admin/banners/add")}
      >
        Add New Banner
      </Button>

      <Table
        columns={columns}
        dataSource={banners}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default BannerList;

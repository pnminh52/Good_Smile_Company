import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../../api/products";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm, Image, Space, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllNews, deleteNews } from "../../../api/new";
import useToast from "../../../hook/useToast";
const NewList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await getAllNews();
      setNews(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteNews(id); 
      message.success("News deleted successfully!");

      fetchNews();
    } catch (err) {
      console.error("❌ Lỗi xóa news:", err);
      message.error("Delete news failed!");
    }
  };
  
  useEffect(() => {
    fetchNews();
  }, []);
  const columns =[
    {
         title: "#",
         dataIndex: "index",
         render: (_, __, index) => index + 1,
         width: 60,
         align: "center",
       },
      
       {
         title: "Title",
         dataIndex: "title",
         render: (text) => <strong>{text}</strong>,
       }
,      
      {
        title: "type",
        dataIndex: "type",
        render: (text) => <strong>{text}</strong>,
      },
       {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => setSelectedProduct(record)}
                >
                  
                </Button>
                <Link to={`/admin/news/edit/${record.id}`}>
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    style={{ backgroundColor: "#fadb14", color: "#000" }}
                  >
                    
                  </Button>
                </Link>
                <Popconfirm
                  title="Bạn có chắc muốn xóa sản phẩm này?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />}>
                    
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
  ]

  return <div>
<Link to={"/admin/news/add"}>
<button >Add news</button>

</Link>  <Table
         rowKey="id"
         columns={columns}
         dataSource={news}
         loading={loading}
         pagination={{ pageSize: 10 }}
         bordered
       />

  </div>;
};

export default NewList;

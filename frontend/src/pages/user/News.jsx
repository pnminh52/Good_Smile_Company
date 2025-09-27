import React, { useState, useEffect } from "react";
import NoResult from "../../components/user/NoResult";
import Loader from "../../components/Loader";
import useToast from "../../hook/useToast";
import { getAllNews } from './../../api/new';
import SearchBar from "../../components/user/new/SearchBar";
import { Modal } from "antd";

const News = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredNews(news);
    } else {
      setFilteredNews(
        news.filter((n) =>
          n.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNews();
        setNews(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load news!");
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    setFilteredNews(news);
  }, [news]);

  const openModal = (n) => {
    setSelectedNews(n);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setIsModalVisible(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="sm:px-80 px-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-semibold py-4 sm:py-6">News</h1>
      <SearchBar onSearch={handleSearch} />

      {filteredNews.map((n, idx, arr) => (
        <div
          key={n.id}
          onClick={() => openModal(n)}
          className="flex relative flex-col items-center cursor-pointer group w-full"
        >
          <div
            className={`bg-white w-full h-22 items-center flex 
            ${idx !== arr.length - 1 ? "border-b border-gray-300" : ""}`}
          >
            <div className="bg-white">
              <div className="flex items-center gap-2">
                <p className="text-sm">
                  {new Date(n.created_at).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-1">
                  <p className="w-2 h-2 bg-[#F06E00] rounded-full"></p>
                  <p className="font-semibold text-gray-500 text-sm">{n.type}</p>
                </div>
              </div>
              <p className="font-semibold text-[15px] hover:text-[#F06E00] transition duration-300 ease-in-out text-black">
                {n.title}
              </p>
            </div>
          </div>
        </div>
      ))}

      {filteredNews.length === 0 && <NoResult />}

      {/* Modal hiển thị chi tiết */}
      <Modal
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        title={selectedNews?.title}
      >
        {selectedNews && (
          <div>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(selectedNews.created_at).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              - {selectedNews.type}
            </p>
            <div className="text-base text-black whitespace-pre-line">
              {selectedNews.content}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default News;

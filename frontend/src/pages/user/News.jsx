import React, { useState, useEffect } from "react";
import NoResult from "../../components/user/NoResult";
import Loader from "../../components/Loader";
import useToast from "../../hook/useToast";
import { getAllNews } from "./../../api/new";
import SearchBar from "../../components/user/new/SearchBar";
import { Modal } from "antd";

const News = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visibleCount, setVisibleCount]=useState(5)
  const handleLoadMore=()=>{
    setVisibleCount((prev)=>prev+5)
  }
  const handleFilter = (type) => {
    if (!type) {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter((n) => n.type.toLowerCase() === type));
    }
  };

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
    <div className="lg:px-80 md:px-30 px-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl font-semibold py-4 sm:py-6">News ({filteredNews.length})</h1>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter}/>

      {[...filteredNews]
      .sort((a,b)=>new Date(b.created_at)-(a.created_at))
      .slice(0, visibleCount)
      .map((n, idx, arr) => (
        <div
          key={n.id}
          onClick={() => openModal(n)}
          className="flex relative flex-col items-center cursor-pointer group w-full"
        >
          <div
            className={`bg-white w-full py-3 items-center flex 
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
                  <p className="font-semibold text-gray-500 text-sm">
                    {n.type}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-[15px] hover:text-[#F06E00] transition duration-300 ease-in-out text-black">
                {n.title}
              </p>
            </div>
          </div>
        </div>
      ))}
        {visibleCount < filteredNews.length && (
    <div className="flex justify-center my-4">
        <button
                             onClick={handleLoadMore}
                             className="lg:w-48 md:w-80 w-full py-3 rounded-full bg-[#FF6900] text-white font-semibold  cursor-pointer transition"
                           >
                             Load More
                           </button>
    </div>
  )}

      {filteredNews.length === 0 && <NoResult />}

      {/* Modal hiển thị chi tiết */}
      <Modal width={800} open={isModalVisible} onCancel={closeModal} footer={null}>
        {selectedNews && (
          <div>
            <div className="flex items-center gap-2">
              <p className="text-black text-md font-semibold ">
                {new Date(selectedNews.created_at).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
              </p>
              <div className="flex items-center gap-1">
                <p className="w-3 h-3 bg-[#F06E00] rounded-full "></p>
                <p className="text-gray-500 font-semibold">
                  {selectedNews.type}
                </p>
              </div>
            </div>
            <p className="text-black py-4 text-lg font-semibold">
              {selectedNews.title}
            </p>
            <div
  className="text-base text-black"
  dangerouslySetInnerHTML={{ __html: selectedNews.content }}
></div>

           
          </div>
        )}
      </Modal>
    </div>
  );
};

export default News;

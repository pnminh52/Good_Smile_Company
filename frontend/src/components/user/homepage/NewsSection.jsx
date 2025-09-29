import React, { useEffect, useState } from "react";
import { getAllNews } from "../../../api/new";
import { Link } from "react-router-dom";
const NewsSection = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNews();
        setNews(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
        setNews([]);
      }
    };
    fetchNews();
  }, []);
  return (
    <div className="space-y-4 py-4 bg-gray-100 ">
      <div className="flex flex-col items-center ">
        <img
          className="w-12 sm:w-15"
          src="https://www.goodsmile.com/img/icon/events.svg"
          alt="Preorder"
        />
        <p className="sm:text-lg text-sm font-semibold">News</p>
      </div>
    <div>
    <div className="flex flex-col px-4 md:px-30 lg:px-60">



     <div className="px-4 bg-white">
     {news.slice(0, 5).map((n, idx, arr) => (
  <Link
    to={`/new`}
    key={n.id}
    className="flex relative flex-col items-center cursor-pointer group w-full last:border-b-0"
  >
    <div 
      className={`bg-white w-full px-0 py-3 items-center flex ${
        idx === arr.length - 1 ? "" : "border-b border-gray-300"
      }`}>
      <div className="bg-white">
        <div className="flex items-center gap-2 cursor-pointer">
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
  </Link>
))}
     </div>

      </div>
    </div>

    
        <Link to={"/new"} >
          <div className="w-full flex justify-center items-center ">
            <button className="px-4 sm:py-3 sm:text-lg sm:px-20 py-1.5 font-semibold border cursor-pointer sm:text-black text-gray-500 border-gray-300 hover:bg-gray-300 transition duration-300 ease-in-out border-gary-300 rounded-full">
              See All News
            </button>
          </div>
        </Link>
    
    </div>
  );
};

export default NewsSection;

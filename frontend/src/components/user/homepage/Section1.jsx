import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Section1 = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/product?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div>
      {/* Thông báo */}
      <div className="bg-[#F4F4F6] sm:h-8 h-10 flex items-center justify-center">
        <p className="flex items-center sm:text-sm text-xs truncate gap-1 hover:text-[#F06E00] cursor-pointer transition duration-300 ease-in-out">
          <img src="https://www.goodsmile.com/img/icon/alert.svg" alt="" /> 
         <span className="hidden sm:block">
         Notice Regarding the Resumption of Shipping to the United States...
         </span>
         <span className="block sm:hidden">
         Notice Regarding the Resumption of Shipping to the United States...
         </span>
        </p>
      </div>

      {/* Search */}
      <div className="w-full sm:px-30 px-4 rounded-bl-[25%] h-25 rounded-br-[25%] sm:rounded-br-none sm:rounded-bl-none bg-[#F06E00] flex flex-col gap-2 items-center justify-center">
        {/* <p className="text-sm lg:text-lg text-white">Discover officially licensed figures for true collectors.</p> */}
        <div className="relative w-full">
          <img
            src="https://www.goodsmile.com/img/icon/search.svg"
            alt="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          />
          <input
            type="text"
            placeholder="Search by Keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-white pl-10 pr-3 py-3 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearch}
            className="hover:bg-white transition duration-300 ease-in-out hover:text-[#F06E00] cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 border-2 bg-[#F06E00] rounded-full px-6 text-white font-semibold py-2"
          >
            Search
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Section1;

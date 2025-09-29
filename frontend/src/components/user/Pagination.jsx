import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleChange = (page) => {
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Prev */}
      <button
         onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8
 cursor-pointer rounded-md border flex items-center justify-center
          ${currentPage === 1 ? "bg-white text-gray-300 cursor-not-allowed" : "bg-[#FFF7E6] border border-[#EA9108] text-[#EA9108]"}
        `}
      >
        <LeftOutlined />
      </button>

      {/* Numbered pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handleChange(page)}
          className={`w-8 h-8
 cursor-pointer rounded-md border ${
            currentPage === page
              ? "bg-[#FFF7E6] border border-[#EA9108] text-[#EA9108]"
              : "bg-white text-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
         onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8
 cursor-pointer rounded-md border flex items-center justify-center
          ${currentPage === totalPages ? "bg-white text-gray-300 cursor-not-allowed" : "bg-[#FFF7E6] border border-[#EA9108] text-[#EA9108]"}
        `}
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default Pagination;

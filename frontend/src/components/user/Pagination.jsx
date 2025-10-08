import React from "react";
import { Pagination as AntdPagination } from "antd";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <AntdPagination
        current={currentPage}
        total={totalPages * 10} 
        pageSize={10}          
        onChange={(page) => onPageChange(page)}
        showSizeChanger={false} 
        showQuickJumper          
        simple                 
      />
    </div>
  );
};

export default Pagination;

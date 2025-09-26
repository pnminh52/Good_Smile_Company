import React from "react";

const AdminLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="animate-spin rounded-full border-4 border-t-8 border-[#1677FF] border-t-transparent w-16 h-16"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default AdminLoader;

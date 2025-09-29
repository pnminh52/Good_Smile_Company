import React from "react";

const AdminLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center h-screen justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full border-4 border-t-8 border-[#FFF] border-t-transparent w-16 h-16"></div>
        <span className="mt-2 text-white"></span>
      </div>
    </div>
  );
};

export default AdminLoader;

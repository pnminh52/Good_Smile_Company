import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="animate-spin rounded-full border-4 border-t-8 border-orange-500 border-t-transparent w-16 h-16"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;

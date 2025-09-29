import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className=" flex flex-col gap-4 py-20 justify-center items-center">
      <img src="https://www.goodsmile.com/img/common/404.png" alt="" />
      <p>Sorry. We could not find that page.</p>
     <Link to={"/"}>
     <button className="hover:bg-[#FF6900] transition duration-300 ease-in-out hover:text-white font-semibold px-20 rounded-full py-4 cursor-pointer bg-[#F4F4F6]">
        Return to homepage
      </button></Link>
    </div>
  );
};

export default NotFound;

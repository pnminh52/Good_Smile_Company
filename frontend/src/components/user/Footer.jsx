import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F4F4F6]  mt-20">
      <div className="h-16 bg-[#FF6900] relative">
        <button
          onClick={scrollToTop}
          className="absolute top-2 cursor-pointer flex flex-col items-center left-1/2 -translate-y-1/2 -translate-x-1/2    text-white text-sm font-semibold  transition"
        >
          <img
            className="sm:w-16 sm:h-16 w-15 h-15  border-4 rounded-full  border-white bg-white"
            src="https://www.goodsmile.com/img/common/face.svg?202406"
            alt=""
          />
          <p className="text-white text-lg font-semibold"> Scroll to Top</p>
        </button>
      </div>
      <div className="max-w-screen-2xl mx-auto sm:px-10 px-4 pt-8  space-y-4">
      <div className="flex justify-between items-center">
          <p className="font-semibold sm:text-lg">Official Social Media</p>
               <div className="flex items-center gap-4">
               <img  className="sm:w-8 w-7" src="https://www.goodsmile.com/img/sns/x.png" alt="" />
                <img className="sm:w-8 w-7" src="https://www.goodsmile.com/img/sns/instagram.png" alt="" />
                <img className="sm:w-8 w-7" src="https://www.goodsmile.com/img/sns/facebook.png" alt="" />
                <img className="sm:w-8 w-7" src="https://www.goodsmile.com/img/sns/youtube.png" alt="" />
               </div>
      </div>
        <div className=" ">
          <p className="text-sm sm:text-lg text-gray-600">Get the latest product info on our official social media!</p>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4">
  <li className="flex items-center gap-2 cursor-pointer">
    <img className="w-12" src="https://www.goodsmile.com/img/dummy/social/gsc-x.png" alt="" />
    <p className="text-sm">Good Smile Company Official X</p>
  </li>
  <li className="flex items-center gap-2 cursor-pointer">
    <img className="w-12" src="https://www.goodsmile.com/img/dummy/social/kahotan-x.png" alt="" />
    <p>Kahotan's X (Japanese)</p>
  </li>
  <li className="flex items-center gap-2 cursor-pointer">
    <img className="w-12" src="https://www.goodsmile.com/img/dummy/social/gsc-online-x.png?202406" alt="" />
    <p>Good Smile Company Online Store X (Japanese)</p>
  </li>
  <li className="flex items-center gap-2 cursor-pointer">
    <img className="w-12" src="https://www.goodsmile.com/img/dummy/blog/kahotan.png" alt="" />
    <p>Kahotan's Blog</p>
  </li>
  <li className="flex items-center gap-2 cursor-pointer">
    <img className="w-12" src="https://www.goodsmile.com/img/dummy/blog/lab-goodsmile.png" alt="" />
    <p>Good Smile Lab (Japanese)</p>
  </li>
  <li className="flex items-center gap-2 cursor-pointer">
    <img className="w-12" src="https://www.goodsmile.com/img/dummy/blog/gscrobo.png" alt="" />
    <p>Mecha Smile Blog (Japanese)</p>
  </li>
</ul>

        </div>
      
      </div>
      <div className="h-20 border-t border-gray-300 items-center flex flex-col justify-center">
          <p className="text-sm">©️ GOOD SMILE COMPANY</p>
          <p className="text-sm">Elyz.thedev@gmail.com</p>

        </div>
    </footer>
  );
};

export default Footer;

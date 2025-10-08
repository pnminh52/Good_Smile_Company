import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import useToast from "../../hook/useToast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuBar from './MenuBar';
const Header = () => {
  const toast = useToast();
  const { user } = useAuth();
  const upcomingAlert = () => {
    toast.info("Feature coming soon!");
  };
  const handleCartClick = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("You must logged in!");
    }
  };
  const [open, setOpen] = useState(false);
  const location = useLocation()
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1100) { 
        setOpen(false);
      }
    };
  
    window.addEventListener("resize", handleResize);
      handleResize();
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
 
  <div className="bg-white border-b border-gray-300 ">
      <div className="lg:h-16 h-14 flex items-center justify-between max-w-screen-xl mx-auto lg:px-0 px-4">
<Link to={"/"}>
<img
            className="sm:w-35 w-25  h-full cursor-pointer"
            src="https://www.goodsmile.com/img/common/logo.svg"
            alt=""
          />
</Link>

<div className="hidden lg:block">
<ul className=" flex items-center gap-6">
             <Link to={"/new"}>
               <li className="flex items-center cursor-pointer gap-2 font-semibold ">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="17"
                  fill="none"
                >
                  <path
                    fill="#F06E00"
                    d="M8.859 8.158a5.99 5.99 0 0 1 2.325-7.062A4.699 4.699 0 0 0 4.683 3.68l-.517 1.416a6.812 6.812 0 0 1-2.661 3.352l-.287.188a1.134 1.134 0 0 0-.506 1.08c.05.424.332.785.736.93l8.159 2.97.039-.138A5.662 5.662 0 0 0 9.52 9.97l-.662-1.812Z"
                  ></path>
                  <path
                    fill="#A9AAB2"
                    d="m22.826 9.893-.484-.325a6.82 6.82 0 0 1-2.606-3.314l-.665-1.812a4.882 4.882 0 0 0-6.248-2.906 4.857 4.857 0 0 0-2.898 6.237l.665 1.812a6.79 6.79 0 0 1 .152 4.209l-.003-.004-.163.56c-.117.41.003.85.318 1.14.316.29.761.382 1.161.236l10.53-3.83c.4-.145.688-.502.737-.927a1.135 1.135 0 0 0-.495-1.076Zm-10.325 3.865a8.458 8.458 0 0 0-.318-4.757l-.662-1.809a3.163 3.163 0 0 1 1.887-4.06 3.176 3.176 0 0 1 4.067 1.89l.665 1.813a8.489 8.489 0 0 0 2.835 3.84l-8.474 3.083ZM17.708 16.459a2.28 2.28 0 0 0 2.283-2.276c0-.046 0-.092-.004-.138l-4.11 1.497a2.288 2.288 0 0 0 1.83.917Z"
                  ></path>
                  <path
                    fill="#F06E00"
                    d="M4.027 12.785a2.28 2.28 0 0 0 2.269 2.541c.79 0 1.483-.4 1.894-1.005l-4.163-1.536Z"
                  ></path>
                </svg>{" "}
                News/Shipping Info
              </li>
            </Link>
            <li
             onClick={() => setOpen((prev) => !prev)}
              
              className="flex items-center cursor-pointer gap-2 font-semibold "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                fill="none"
              >
                <path
                  fill="#A9AAB2"
                  d="M2.484 1.792v3.48H.492v1.776h1.992v5.904H.492v1.776h1.992v3.48c0 .794.646 1.44 1.44 1.44H16.02c.795 0 1.44-.646 1.44-1.44V1.792c0-.795-.645-1.44-1.44-1.44H3.924a1.44 1.44 0 0 0-1.44 1.44m13.2 16.08H4.26v-3.144h.912v-1.776H4.26V7.048h.912V5.272H4.26V2.128h11.424z"
                ></path>
                <path
                  fill="#F06E00"
                  d="M10.07 12.27q-.492 0-.85.357-.356.356-.357.85-.001.493.358.85.355.356.85.357.492 0 .85-.358.356-.355.357-.85 0-.492-.358-.849a1.15 1.15 0 0 0-.85-.357M9.3 7.356q.46-.299 1.018-.298.35-.001.617.118.264.115.422.312.155.194.156.453 0 .208-.156.427a2.2 2.2 0 0 1-.492.466l-.7.518q-.404.299-.63.617-.226.317-.297.727a5 5 0 0 0-.046 1.018h1.75q-.015-.48.137-.77.147-.293.525-.538l.324-.22q.623-.429.98-.786.355-.356.506-.732.148-.375.149-.856-.001-.714-.415-1.272-.415-.558-1.128-.888-.714-.332-1.62-.332a4 4 0 0 0-1.498.274 3.6 3.6 0 0 0-1.2.758 3 3 0 0 0-.751 1.162l1.699.636c.125-.334.343-.595.65-.794"
                ></path>
              </svg>
              User Guide
            </li>
            <li
              onClick={() => upcomingAlert()}
              className="flex items-center cursor-pointer gap-2 font-semibold "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
              >
                <path
                  fill="#A9AAB2"
                  d="M2.374 10a8.124 8.124 0 1 1 16.248 0v5.63c0 .863-.699 1.562-1.563 1.562l-4.312-.003a1.87 1.87 0 0 0-1.626-.938h-1.25a1.875 1.875 0 0 0 0 3.749h1.25c.696 0 1.3-.38 1.626-.938l4.312.003a3.44 3.44 0 0 0 3.441-3.438V10c-.003-5.524-4.479-10-10.002-10C4.975 0 .5 4.476.5 10v1.563c0 .52.418.938.938.938s.938-.418.938-.938V10h-.002Z"
                ></path>
                <path
                  fill="#F06E00"
                  d="M6.125 8.125a2.502 2.502 0 0 0-2.5 2.5v1.874c0 1.379 1.121 2.5 2.5 2.5h.624c.691 0 1.25-.559 1.25-1.25V9.375c0-.691-.559-1.25-1.25-1.25h-.624Zm8.748 0h-.624c-.691 0-1.25.559-1.25 1.25v4.374c0 .691.559 1.25 1.25 1.25h.624c1.379 0 2.5-1.121 2.5-2.5v-1.874c0-1.379-1.121-2.5-2.5-2.5Z"
                ></path>
              </svg>
              Contact
            </li>
            {/* <Link to={"/product"}>
              <li className="w-5 flex items-center cursor-pointer gap-2 font-semibold ">
                <img
                  src="https://www.goodsmile.com/img/common/face.svg"
                  alt=""
                />{" "}
                Collection
              </li>
            </Link> */}
          </ul>
</div>

<div className="">
           <ul className="flex items-center lg:gap-6 gap-4">
             <Link to={"/product"}>
              <li className="flex gap-2 font-semibold text-[#9FA0A0] items-center">
                            <img src="https://www.goodsmile.com/img/icon/search.svg" alt="" />
  <span className="hidden sm:block">
  Search
  </span>
   </li>                      </Link>
             <Link to="/cart" onClick={handleCartClick}>
               <li className="flex gap-2 font-semibold text-[#9FA0A0] items-center">
                 <img src="https://www.goodsmile.com/img/icon/cart.svg" alt="" />
                 <span className="hidden sm:block">
                 Cart
                 </span>
                 
               </li>
             </Link>

           {user ? (
              <Link to={`/profile/${user.id}`}>
                <li className="flex gap-2 font-semibold text-[#9FA0A0] items-center">
                  <img
                    src="https://www.goodsmile.com/img/icon/user.svg"
                    alt=""
                  />
                  <span className="hidden sm:block">
                  Account
                  </span>
                  
                </li>
              </Link>
            ) : (
              <Link to="/login">
                <li className="flex gap-2 font-semibold text-[#9FA0A0] items-center">
                  <img
                    src="https://www.goodsmile.com/img/icon/user.svg"
                    alt=""
                  />
                  <span className="hidden sm:block">Login</span>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>

 {open && (
  <div
    className="fixed top-16 left-0 w-full h-[calc(100%-4rem)] bg-black/40 z-40"
    onClick={() => setOpen(false)}
  >
    {/* Dropdown */}
    <ul
      className="absolute top-0 px-4 py-4 space-y-1 justify-center   space-x-6 w-full flex flex-col md:flex-row text-sm bg-white border border-gray-300   z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <li className=" cursor-pointer flex items-center lg:gap-2 gap-1"><p className="w-2 h-2 rounded-full bg-[#FF6900]"></p> 
        <Link to="/guide/user-guide">About Us</Link>
      </li>
      <li className=" cursor-pointer flex items-center lg:gap-2 gap-1"><p className="w-2 h-2 rounded-full bg-[#FF6900]"></p> 
        <Link to="/guide/previous-shop">Previous Online Shop</Link>
      </li>
      <li className=" cursor-pointer flex items-center lg:gap-2 gap-1"><p className="w-2 h-2 rounded-full bg-[#FF6900]"></p> 
        <Link to="/guide/about-payments"> Payment</Link>
      </li>
      <li className=" cursor-pointer flex items-center lg:gap-2 gap-1"><p className="w-2 h-2 rounded-full bg-[#FF6900]"></p> 
        <Link to="/guide/delivery-and-shipping">Delivery and Shipping</Link>
      </li>
      <li className=" cursor-pointer flex items-center lg:gap-2 gap-1"><p className="w-2 h-2 rounded-full bg-[#FF6900]"></p> 
        <Link to="/guide/importan"> Notice</Link>
      </li>
      <li className=" cursor-pointer flex items-center lg:gap-2 gap-1"><p className="w-2 h-2 rounded-full bg-[#FF6900]"></p> 
        <Link to="/guide/coupons">Coupons</Link>
      </li>
    </ul>
  </div>
)}

   <MenuBar upcomingAlert={upcomingAlert}/>


  </div>
  );
};

export default Header;

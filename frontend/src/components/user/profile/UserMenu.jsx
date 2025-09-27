import { Link } from "react-router-dom";
import useToast from "../../../hook/useToast";
const UserMenu = () => {
  const toast =useToast()
  const buttons = [
    { label: "Wishlist", icon: "https://www.goodsmile.com/img/icon/like-transparent.svg", link: "/wishlist" },
    { label: "Order ", icon: "https://www.goodsmile.com/img/icon/history.svg", link: "/order" },
    { label: " Address", icon: "https://www.goodsmile.com/img/icon/address.svg",   onClick: () => toast.info("Upcomming featured!")   },
  ];

  return (
    <div className="flex justify-center gap-2 w-full">
    {buttons.map((btn, idx) => {
      const content = (
        <div className="flex  items-center justify-center gap-1 border border-gray-200 p-4 rounded-md cursor-pointer text-center w-full">
          <img src={btn.icon} alt={btn.label} className="w-5 h-5" />
          <span className="text-sm font-medium truncate">{btn.label}</span>
        </div>
      );
  
      return btn.onClick ? (
        <div key={idx} onClick={btn.onClick} className="flex-1">
          {content}
        </div>
      ) : (
        <Link key={idx} to={btn.link} className="flex-1">
          {content}
        </Link>
      );
    })}
  </div>
  
  
  );
};

export default UserMenu;

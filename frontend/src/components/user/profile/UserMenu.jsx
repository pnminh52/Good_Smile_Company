import { Link } from "react-router-dom";
import useToast from "../../../hook/useToast";
const UserMenu = () => {
  const toast =useToast()
  const buttons = [
    { label: "Wishlist", icon: "https://www.goodsmile.com/img/icon/like-transparent.svg", link: "/wishlist" },
    { label: "Order History", icon: "https://www.goodsmile.com/img/icon/history.svg", link: "/order" },
    { label: "Shipping Address", icon: "https://www.goodsmile.com/img/icon/address.svg",   onClick: () => toast.error("Tính năng đang cập nhật")   },
  ];

  return (
    <div className="flex justify-center gap-2 w-full">
    {buttons.map((btn, idx) => {
      const content = (
        <div className="flex  items-center justify-center gap-2 border border-gray-200 p-4 rounded-md cursor-pointer text-center w-full">
          <img src={btn.icon} alt={btn.label} className="w-6 h-6" />
          <span className="text-sm font-medium">{btn.label}</span>
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

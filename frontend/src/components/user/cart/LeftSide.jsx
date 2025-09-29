import React from "react";
import { Link } from "react-router-dom";
const LeftSide = ({ cartItems, handleUpdateQuantity, handleDelete }) => {
    // console.log(cartItems);

    
    return (
   
         <div className="">
            <div className="grid  grid-cols-1 gap-4">
                {cartItems.map((item) => (
                <div
                key={item.cart_id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center "
              >
                        <div className=" w-full flex justify-between lg:gap-4 gap-2">
                              {item.base_image && (
                                                            <Link to={`/product/${item.product_id}`}>
                                                               <img
                              src={item.base_image}
                              alt={item.name}
                              className="lg:w-50 w-50 aspect-square  object-cover rounded-lg"
                            />
                            
                                                            </Link>
                                                        )}
                       
                            <div className=" w-full  flex flex-col gap-1 truncate">
                                <p className="text-sm">{item.title}</p>
                            <p >
    <span className="font-semibold ">{item.name} </span>
  </p>
                                <p className="text-black sm:text-lg text-md  ">
                                    {Number(item.price).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                                <div className="flex items-center gap-2 py-1">
                                  <div className="flex items-center">
                                  <button
                                        className={`border cursor-pointer flex items-center px-2 h-8 rounded-l-full border-gray-300 `}
                                        onClick={() =>
                                            handleUpdateQuantity(item.cart_id, item.quantity - 1)
                                        }
                                    >
                                        <svg
                                            className={`w-3 h-3 ${item.quantity === 1
                                                    ? "opacity-30 cursor-not-allowed"
                                                    : ""
                                                }`}
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5Z"
                                                    fill="#000000"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                    <p className="px-6 flex items-center justify-center border-gray-300 border-t border-b h-8">
                                        {item.quantity}
                                    </p>
                                    <button
                                        className={`border cursor-pointer flex items-center px-2 h-8 rounded-r-full border-gray-300 `}
                                        onClick={() =>
                                            handleUpdateQuantity(item.cart_id, item.quantity + 1)
                                        }
                                    >
                                        <svg
                                            className={`w-3 h-3 ${item.quantity === 3
                                                    ? "opacity-30 cursor-not-allowed"
                                                    : ""
                                                }`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"
                                                    fill="#0F0F0F"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                  </div>
                                    <button
                                        className="cursor-pointer text-red-500 flex items-center justify-center font-semibold w-8 h-8 border border-[#FF0000] rounded-full"
                                        onClick={() => handleDelete(item.cart_id)}
                                    >
                                        <svg
                                            className="w-3 h-3 rotate-45"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                {" "}
                                                <path
                                                    d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z"
                                                    fill="#FF0000"
                                                ></path>{" "}
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    
      
       </div>
    );
};

export default LeftSide;

import React from 'react'
import { Link } from 'react-router-dom'
const CheckOutItem = ({cartItems}) => {
  return (
   <div className="grid grid-cols-1 gap-2.5">
                 {cartItems.map((item) => (
                 <div
                 key={item.cart_id}
                 className="flex flex-col sm:flex-row sm:justify-between sm:items-center "
               >
                         <div className=" w-full flex justify-between lg:gap-2.5 gap-2">
                               {item.base_image && (
                                                             <Link to={`/product/${item.product_id}`}>
                                                                <img
                               src={item.base_image}
                               alt={item.name}
                               className="w-45  aspect-square  object-cover rounded-lg"
                             />
                             
                                                             </Link>
                                                         )}
                        
                             <div className=" w-full  flex flex-col gap-1 truncate">
                             <p className="text-sm">{item.title}</p>
                             <p className="font-semibold ">
     {item.name} 
   </p>
                                 <p >
                                     
                                     <span className='text-black sm:text-lg text-md'>{Number(item.price).toLocaleString("vi-VN", {
                                         style: "currency",
                                         currency: "VND",
                                     })}</span> / 
                                     <span> {item.quantity}</span>
                                 </p>
                               
                             </div>
                         </div>
                     </div>
                 ))}

    </div>
  )
}

export default CheckOutItem
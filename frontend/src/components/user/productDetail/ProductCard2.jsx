import React from 'react'

const ProductCard2 = ({ product }) => {
  if (!product) return null; 

  return (
    <div className=''>
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <img
          src={product.base_image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg "
        />
      </div>
      <div className="w-full py-1 flex justify-center items-center">
        {product.imagecopyright && (
          <img
            className="w-16 h-auto object-cover"
            src={product.imagecopyright}
            alt=""
          />
        )}
      </div>
      <h2 className="font-semibold text-sm py-1 truncate">{product.name}</h2>
      <p className="text-gray-600 text-sm">
        {Number(product.price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
    </div>
  )
}

export default ProductCard2

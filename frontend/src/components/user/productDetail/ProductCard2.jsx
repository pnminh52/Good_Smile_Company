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
            className="w-14 h-full object-cover"
            src={product.imagecopyright}
            alt=""
          />
        )}
      </div>
      {/* <div className="flex items-center gap-2">
        {product.stock > 0 && product.stock < 50 && (
          <p className="bg-red-200 px-2 inline-block text-xs text-red-700 rounded-full">
            Few left
          </p>
        )}

        {product.stock === 0 && (
          <p className="bg-gray-200 px-2 inline-block text-xs text-gray-700 rounded-full">
            Sold out
          </p>
        )}

        {product.status === "preorder" && (
          <p className="bg-green-200 px-2 inline-block text-xs text-green-700 rounded-full">
            Preorders
          </p>
        )}
        {product.gift_items && product.gift_items.length > 0 && (
          <p className="bg-yellow-200 px-2 inline-block text-xs text-yellow-700 rounded-full">
            W/Bonus
          </p>
        )}
      </div>
      <h2 className="font-semibold text-sm py-1">{product.name}</h2>
      <p className="text-gray-600 text-sm">
        {(Number(product.price)).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })} / {product.sold} sold
      </p> */}
    </div>
  )
}

export default ProductCard2

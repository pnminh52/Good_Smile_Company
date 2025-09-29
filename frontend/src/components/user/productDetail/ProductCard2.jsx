import React from 'react'

const ProductCard2 = ({ product }) => {
  if (!product) return null;

  return (
    <div className=' py-4'>
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <img
          src={product.base_image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg "
        />
      </div>
      
    </div>
  )
}

export default ProductCard2

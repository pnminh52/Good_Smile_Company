import React from 'react'
import ProductCard from '../../components/user/listProduct/ProductCard'
import { getProducts } from './../../api/products';
const SearchByKeyword = () => {
  return (
    <div>
      <div className='px-4 block sm:hidden'>
<input type="text" className='w-full border' />
      </div>
    </div>
  )
}

export default SearchByKeyword
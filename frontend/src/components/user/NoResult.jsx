import React from 'react'

const NoResult = () => {
  return (
    <div className=' h-[60vh] sm:h-screen flex flex-col mt-16   justify-center items-center'>

        <p className='font-semibold'>No matching result were found.</p>
        <p className='text-[#FF6900]'>Please try again later!</p>
    </div>
  )
}

export default NoResult
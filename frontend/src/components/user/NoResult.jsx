import React from 'react'

const NoResult = () => {
  return (
    <div className=' h-[50vh] sm:h-screen flex flex-col justify-center items-center'>

        <p className='font-semibold'>No matching result were found.</p>
        <p className='text-gray-400'>Please try again later!</p>
    </div>
  )
}

export default NoResult
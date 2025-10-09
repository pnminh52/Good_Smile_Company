import React from 'react'
import { useState, useEffect } from 'react'

const Timebar = () => {
  const [currentTime, setCurrentTime]=useState( new Date())

  useEffect(()=>{
    const timer = setInterval(()=>{
setCurrentTime(new Date())
    }, 1000)
    return ()=> clearInterval(timer)
  },[])
  const formatTime = (date)=>{
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

  }
  return (
    <div className='flex items-center flex-col sm:flex-row sm:gap-2 gap-0 justify-center bg-[#FF6900] text-white font-semibold lg:h-10 h-12'>
    <span className='font-medium lg:text-md text-sm'> We wish you an enjoyable and successful shopping experience!</span>  {formatTime(currentTime)}
    </div>
  )
}

export default Timebar

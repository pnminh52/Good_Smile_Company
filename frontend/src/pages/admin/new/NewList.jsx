import React, { useState } from 'react'
import useToast from '../../../hook/useToast';
import { toast } from 'react-toastify';

const NewList = () => {
  const [news, setNews]=useState([])
  const [loading, setLoading]=useState(false)
  const toast=useToast();
  
  return (
    <div>NewList</div>
  )
}

export default NewList
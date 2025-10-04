import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentReturn = () => {
  const [countdown, setCountdown]=useState(10)
  const navigate=useNavigate()
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const responseCode = params.get('vnp_ResponseCode');
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCountdown((prev)=>{
        if (prev <=1){
          clearInterval(timer)
          navigate("/")
        }
        return prev -1
      })
    })
  }, 1000)
  return (
   <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Return</h1>
      <p className="text-lg mb-2">Response Code: {responseCode}</p>
      <p className={`text-xl font-semibold ${responseCode === '00' ? 'text-green-600' : 'text-red-600'}`}>
        {responseCode === '00' ? 'Payment Success!' : 'Payment Failed'}
      </p>
      <p className="mt-4">You'll be redirected to the home page after ({countdown})</p>
    </div>
  );
};

export default PaymentReturn;

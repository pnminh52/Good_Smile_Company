import { useLocation } from 'react-router-dom';

const PaymentReturn = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const responseCode = params.get('vnp_ResponseCode');
  return (
    <div>
      <h1>Payment Return</h1>
      <p>Response Code: {responseCode}</p>
      {responseCode === '00' ? 'Payment Success!' : 'Payment Failed'}
    </div>
  );
};

export default PaymentReturn;

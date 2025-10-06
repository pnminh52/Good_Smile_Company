import React from 'react'

const AboutPayments = () => {
  return (
   <div className="max-w-screen-xl mx-auto lg:px-40 px-4 text-[15px]">
        <h1 className="font-semibold sm:py-4 text-xl py-6">Payments</h1>
      <div className='space-y-2 text-[15px]'>
      <p className='font-semibold'>*The information on this page applies to orders shipped to regions other than Japan and Taiwan.</p>

     <h1 className="text-xl  py-4 font-semibold">
  Important Notice
</h1>
<p className="">
  Customers outside of Japan and Taiwan are required to make their purchase in <span className="text-red-500">US dollars (USD)</span>. 
  Please note that purchases cannot be made in <span className="text-red-500">Japanese yen (JPY)</span>. 
  We apologize for the inconvenience and hope for your understanding on the matter.
</p>

      </div>
      <div className="space-y-2 text-[15px]">
  <h1 className="text-xl  py-4 font-semibold">
    Accepted Payment Methods
  </h1>
  <p className="text-gray-700">
    The following payment methods can be used on the Good Smile Company Online Store.
  </p>
  <p className="text-sm text-red-500 italic ">
    *Payments are processed at the time of shipment.
  </p>
  <ul className="list-disc list-inside space-y-1 text-gray-800">
    <li>
      <span className="font-medium">Credit Card</span> (VISA / MASTERCARD / JCB / AMERICAN EXPRESS / Diners Club)
    </li>
    <li>
      <span className="font-medium">PayPal</span>
    </li>
  </ul>
</div>


<div className="space-y-2 text-[15px]">
 <h1 className="text-xl  py-4 font-semibold">Important Notes</h1>

  <ul className="list-disc list-inside space-y-2 text-gray-800">
    <li>Only credit cards that support the authentication service (3D Secure 2.0) can be used (installments not permitted).</li>
    <li>For preorders that exceed a certain amount, payment will be processed at the time of checkout instead of upon shipment. This applies to payment using both PayPal and credit cards.</li>
    <li>Your credit card may be charged to verify its validity if credit card payment is selected. This charge will be cancelled after the settlement is confirmed.</li>
    <li>We do not accept debit cards and prepaid cards.</li>
    <li>We do not accept changes in payment method for orders. (1*) Please ensure that details of your order are correct before checking out.</li>
  </ul>

  <p className="text-sm text-red-500 ">
    (1*) Depending on the status of your order, we may or may not be able to accommodate your request. Please contact customer support as soon as possible to inquire.
  </p>

  <p className="font-semibold text-gray-700">Related FAQ:</p>
  <ul className="list-disc list-inside text-gray-800">
    <li>Implementation of Personal Authentication Service (3D Secure 2.0)</li>
  </ul>
</div>


<div className="space-y-2 text-[15px]">
 <h1 className="text-xl  py-4 font-semibold">About Payment Errors</h1>
  <p className="text-gray-800 ">
    If a payment error occurs, you will be notified via email at the registered email address provided. Please check the details and follow the instructions to correctly process your payment.
  </p>
  <p className="text-gray-800 ">
    If the payment is not complete within the specified time frame, the order will be canceled automatically.
  </p>
  <p className="text-red-500  italic">
    *The deadline for handling payment errors is within one week from the date of receipt of the first payment error notification email.
  </p>

 <h1 className="text-xl  py-4 font-semibold">Common Causes of Payment Error</h1>
  <ul className="list-disc list-inside space-y-2 text-gray-800 ">
    <li>The credit card registered is not a card included in the list of accepted credit cards.</li>
    <li>The transaction was rejected by the credit card company for various reasons.</li>
    <li>Your remaining account balance was insufficient.</li>
  </ul>

  <p className="text-gray-800">
    We are unable to provide you with the exact reason as to why your credit card was rejected. Please contact the credit card company directly for further information.
  </p>
</div>



    </div>
  )
}

export default AboutPayments

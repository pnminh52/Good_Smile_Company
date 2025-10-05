import React from 'react'

const Coupons = () => {
  return (
    <div className="max-w-screen-xl mx-auto lg:px-60 px-4 text-[15px]">
      <h1 className="font-semibold sm:py-4 text-xl py-6">Coupons</h1>
      <div className='space-y-2 text-[15px]'>
        <p>A coupon may be used if it meets the usage requirements at the time of purchase.

</p>
        <p>To use a coupon, a Good Smile Company Online Store account is required. No fee is required for registering an account. </p>
      </div>
      <div className='space-y-2 text-[15px]'>

  <h1 className="text-xl  py-4 font-semibold">Using Coupons</h1>
  <p>
    Log in to your Good Smile Company Online Store account and access the "My Account" page. 
    Obtain the relevant coupon from the "Coupons" page. Once the coupon has been obtained, it can be used during checkout.
  </p>
  <p>
    For more detailed information on how to use coupons, please click here.
  </p>

  <h1 className="text-xl  py-4 font-semibold">Coupon Validity</h1>
  <ul className="list-disc list-inside space-y-1">
    <li>A coupon has both a download deadline and an expiration date. The download deadline is the date before which you have to download the coupon in order to obtain it, and the expiration date is the date a coupon has to be used by.</li>
    <li>Coupons that are not downloaded within the valid download period cannot be obtained.</li>
    <li>Please check the expiration date for each coupon upon download.</li>
    <li>An expired coupon cannot be used.</li>
    <li>Coupons cannot be re-downloaded in order to extend their validity.</li>
    <li>A coupon's validity period is calculated based on its download date/time.</li>
    <li>The time of expiry of a coupon is calculated based on the download time of the coupon, and not 23:59 (JST) of the date of expiry.</li>
  </ul>
  <p className="italic text-red-500">
    Example: A coupon that is valid for 3 days (72 hours) which was downloaded on Nov 13th at 15:00 (JST) will expire at 14:59 (JST) on Nov 16th.
  </p>

  <h1 className="text-xl  py-4 font-semibold">Important Notes</h1>
  <ul className="list-disc list-inside space-y-1">
    <li>Conditions and requirements must be met in order to use coupons. These conditions vary depending on the coupon and can be confirmed on the coupon download page. Please be sure to check them before use.</li>
    <li>Re-downloading the coupon will not extend its validity or expiration date.</li>
    <li>Coupons must be used at the time of checkout. Once an order has been placed, it will not be possible to use a coupon for an existing order.</li>
    <li>We do not accept cancellation requests with the intent of reordering with a coupon.</li>
    <li>Some products require individual shipping; hence you may not be able to purchase said products in a single transaction with other items.</li>
    <li>Coupons that have expired or passed their download deadline without being downloaded will not be reissued.</li>
    <li>If coupons have been deemed to be misused, the relevant account(s) may face restriction in usage.</li>
  </ul>

  <h1 className="text-xl  py-4 font-semibold">FAQ</h1>
  <ul className="list-disc list-inside space-y-2">
    <li>
      <strong>Q: I placed an order before downloading the coupon. Can I cancel it and re-order?</strong>
      <p>A: We do not accept cancellation requests with the intent of reordering with a coupon.</p>
    </li>
    <li>
      <strong>Q: I would like to place an order with a coupon however I checked out without using it. I would like to cancel my order and re-order.</strong>
      <p>A: We do not accept cancellation requests with the intent of reordering with a coupon. Please ensure to check your order details before checking out.</p>
    </li>
    <li>
      <strong>Q: I encountered an issue while using the coupon and was unsure. The coupon expired while I was waiting for a response from customer support. Can I get any form of compensation?</strong>
      <p>A: Response times vary depending on the situation.</p>
    </li>
    <li>
      <strong>Q: I logged in to use the coupon, however, I got my account locked. What should I do?</strong>
      <p>A: Due to security reasons, you will not be able to log in to your account on the Good Smile Company Online Store if you fail to make a payment or attempt to log in more than a certain number of times. To unlock your account, please contact our customer support via the Contact Us Form (we will respond in sequence).</p>
    </li>
  </ul>

  <h1 className="text-xl  py-4 font-semibold">Related Articles</h1>
  <ul className="list-disc list-inside space-y-1">
    <li>What to do if you are unable to log in to your account</li>
    <li>Logging in with Google or Facebook authentication</li>
  </ul>

  <h1 className="text-xl  py-4 font-semibold">Good Smile Company Customer Support</h1>
  <p>For inquiries regarding coupons, please contact the Good Smile Company Customer Support team.</p>

  <h1 className="text-xl  py-4 font-semibold">Business Hours</h1>
  <p>
    Monday to Friday 11:00~18:00 (JST) (excluding public holidays in Japan)
  </p>
  <ul className="list-disc list-inside space-y-1">
    <li>The inquiry form is available 24 hours a day.</li>
    <li>It may take up to 4 business days for us to respond to your inquiry.</li>
    <li>An inquiry sent after business hours will be handled as an inquiry received the next working day.</li>
    <li>Please check our Business Calendar for more information on business days.</li>
  </ul>

</div>

    </div>
  )
}

export default Coupons
